export const tsConfig = {
    compilerOptions: {
      target: "ES2020",
      module: "ES2020",
      moduleResolution: "node",
      esModuleInterop: true,
      outDir: "./dist",
      rootDir: "./src",
      strict: true,
      noImplicitAny: true,
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
      baseUrl: ".",
      paths: {
        "*": ["node_modules/*"]
      },
      typeRoots: ["./node_modules/@types", "./src/types"],
      lib: ["ES2020", "DOM"],
      sourceMap: true,
      declaration: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true
    },
    include: ["src/**/*"],
    exclude: ["node_modules", "dist"]
  };
