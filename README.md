# AI Form Toolkit

Build and enhance your React forms with Artificial Intelligence. Integrated with Next.js server actions for maximum productivity.

AI Form Toolkit facilitates adding AI capabilities to forms in React applications:

- For your Product – autogenerate forms from existing content: checklists, surveys, exams, data collection, you name it!
- For your Users – help users fill your product forms with AI-powered autofill capabilities.

## Documentation

Check documentation for installation instructions, tutorial and examples: TODO: PUT LINK HERE.

Note that hosted examples are not interactive. See [Building](#building) below to learn how to build the interactive docs.

## Project Structure

This is a multipackage monorepo that holds the two NPM projects necessary for AI Form Toolkit:

- `@ai-form-toolkit/client`
- `@ai-form-toolkit/server`

Both are stored at `packages/` directory.

## Contributing

### Pre-commit

Set up Husky in your local git repository:

```bash
pnpm run prepare
```

### Building

For building locally, run `pnpm run build` or `pnpm run build:watch`.

### Interactive Documentation

Run the docs locally to access the interactive examples.

Create a `.env.local` file inside `docs/` and set the Open AI API Key there:

```dotenv
# docs/.env.local
OPENAI_API_KEY=sk-...
```

Run the docs project:

```bash
pnpm -F ai-form-toolkit-docs run dev
```

Then open `http://localhost:3000` in your browser.

### Running Tests

There are three available commands for running tests:

1. `pnpm run test` or `pnpm test` – runs all test cases.
2. `pnpm run test:cov` – runs all tests and generates a coverage report.
3. `pnpm run test:watch` – runs all tests in watch mode.

NOTE: Running these commands in the root directory will trigger all tests from all packages.
However, if you run them within a specific package directory, only the tests associated with that package will be executed.
