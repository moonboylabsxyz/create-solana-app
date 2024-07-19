# create-solana-app
A CLI tool to bootstrap Solana projects with customizable package selection.

## Prerequisites

- Node.js >= 20
- Yarn >= 1.22 (If not installed, run `npm install -g yarn`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moonboylabsxyz/create-solana-app
   cd create-solana-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Build the project:
   ```bash
   yarn build
   ```

4. Link the package globally:
   ```bash
   yarn link
   ```
   And
   ```bash
   sudo npm install -g .
   ```

## Usage

Once installed or linked, you can use the CLI tool:

```bash
create-solana-app
```

Follow the prompts to:
1. Enter your project name
2. Select the packages you want to install

The CLI will create a new directory with your project name, initialize a new Solana project, and install the selected packages.

## Development

After making changes to the source code:

1. Rebuild the project:
   ```bash
   yarn build
   ```

2. If you've made changes that affect the global command, relink the package:
   ```bash
   yarn unlink
   yarn link
   ```

## Contributing

This is still in active development, contributions are welcome! Please feel free to submit a PR.

## License

[MIT](LICENSE)
