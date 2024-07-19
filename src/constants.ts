export const packageChoices = [
    {
      name: 'Solana Bundle (@solana/web3.js @project-serum/anchor @solana/spl-token',
      value: 'solana-bundle',
      packages: ['@solana/web3.js', '@project-serum/anchor', '@solana/spl-token']
    },
    {
      name: 'Dune Client (@duneanalytics/client-sdk)',
      value: 'dune-client',
      packages: ['@duneanalytics/client-sdk']
    },
    {
      name: 'Helius SDK (helius-sdk)',
      value: 'helius-sdk',
      packages: ['helius-sdk']
    },
    {
      name: 'Shyft SDK (@shyft-to/js)',
      value: 'shyft-sdk',
      packages: ['@shyft-to/js']
    }
  ];
  
  export const defaultDevDependencies = {
    '@types/node': '^20.14.11',
    '@typescript-eslint/eslint-plugin': '^7.16.1',
    '@typescript-eslint/parser': '^7.16.1',
    'eslint': '8.56.0',
    'ts-node': '^10.9.2',
    'typescript': '^5.5.3'
  };
  
  export const defaultDependencies = {
    'dotenv': '^16.4.5'
  };
  
  export const packageVersions = {
    '@duneanalytics/client-sdk': '^0.2.1',
    '@project-serum/anchor': '^0.26.0',
    '@solana/spl-token': '^0.4.8',
    '@solana/web3.js': '^1.95.0',
    '@shyft-to/js': '^0.2.40',
    'helius-sdk': '^1.3.4'
  };
