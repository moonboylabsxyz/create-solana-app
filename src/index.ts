#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gitignoreContent } from './templates/gitignore.js';
import { tsConfig } from './templates/tsconfig.js';
import { mainContent } from './templates/main.js';
import {
  packageChoices,
  defaultDevDependencies,
  defaultDependencies,
  packageVersions
} from './constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Answers {
  projectName: string;
  selectedPackages: string[];
}

function sanitizePackageName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^[.-]/, '')
    .replace(/^(node|js)$/, '$1-package');
}

function createEnvFile(projectDir: string, selectedPackages: string[]) {
  const envContent = [
    'SOLANA_HTTP_URL=',
    'SOLANA_WS_URL=',
    ...(selectedPackages.includes('helius-sdk') ? ['HELIUS_API_KEY='] : []),
    ...(selectedPackages.includes('dune-client') ? ['DUNE_API_KEY='] : []),
    ...(selectedPackages.includes('shyft-sdk') ? ['SHYFT_API_KEY='] : []),
  ].join('\n');

  fs.writeFileSync(path.join(projectDir, '.env'), envContent);
  console.log('Created .env file with selected API keys');
}

function createTsConfig(projectDir: string) {
  fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
  console.log('Created tsconfig.json file');
}

function createMainFile(projectDir: string) {
  const srcDir = path.join(projectDir, 'src');
  fs.mkdirSync(srcDir, { recursive: true });
  fs.writeFileSync(path.join(srcDir, 'main.ts'), mainContent.trim());
  console.log('Created src/main.ts file');
}

async function main() {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-solana-project',
      validate: (input: string) => {
        if (input.trim() === '') {
          return 'Project name cannot be empty';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      name: 'selectedPackages',
      message: 'Select packages to install:',
      choices: packageChoices,
    },
  ];

  const answers = await inquirer.prompt<Answers>(questions);

  const projectDir = path.join(process.cwd(), answers.projectName);
  fs.mkdirSync(projectDir, { recursive: true });
  process.chdir(projectDir);

  // Initialize package.json with Yarn
  execSync('yarn init -y', { stdio: 'inherit' });

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  // Sanitize and set the package name
  packageJson.name = sanitizePackageName(answers.projectName);

  // Add dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...Object.fromEntries(Object.entries(defaultDependencies).map(([pkg, version]) => [pkg, version]))
  };

  // Add devDependencies
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...Object.fromEntries(Object.entries(defaultDevDependencies).map(([pkg, version]) => [pkg, version]))
  };

  // Add selected packages
  const selectedPackages = answers.selectedPackages.flatMap(
    (selection) => packageChoices.find(choice => choice.value === selection)?.packages || []
  );
  selectedPackages.forEach((pkg) => {
    packageJson.dependencies[pkg as keyof typeof packageVersions] = packageVersions[pkg as keyof typeof packageVersions] || '*';
  });

  // Write updated package.json
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // Create .env file
  createEnvFile(projectDir, answers.selectedPackages);

  // Create .gitignore file
  fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignoreContent.trim());
  console.log('Created .gitignore file');

  createTsConfig(projectDir);

  // Create src directory and main.ts file
  createMainFile(projectDir);

  // Update package.json
  packageJson.main = 'dist/main.js';
  packageJson.scripts = {
    ...packageJson.scripts,
    "start": "node dist/main.js",
    "build": "tsc",
    "dev": "ts-node src/main.ts",
    "lint": "eslint . --ext .ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  };

  // Write updated package.json
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // Install packages
  console.log('Installing packages...');
  execSync('yarn install', { stdio: 'inherit' });

  console.log('Project setup complete!');
}

main().catch(console.error);
