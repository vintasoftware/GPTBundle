# AI Form Toolkit

Build and enhance your React forms with Artificial Intelligence. Integrated with Next.js server actions for maximum productivity.

AI Form Toolkit facilitates adding AI capabilities to forms in React applications:

- For your Product – autogenerate forms from existing content: checklists, surveys, exams, data collection, you name it!
- For your Users – help users fill your product forms with AI-powered autofill capabilities.

## Documentation

Check documentation for installation instructions, tutorial and examples: TODO: PUT LINK HERE.

Note that hosted examples are not interactive.

## Interactive Documentation

Run the docs locally to access the interactive examples.

Create a `.env.local` file inside `docs/` and set the Open AI API Key there:

```dotenv
# docs/.env.local
OPENAI_API_KEY=sk-...
```

Run the docs project:

```bash
cd docs/
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Project Structure

This is a multipackage monorepo that holds the two NPM projects necessary for AI Form Toolkit:

- `@ai-form-toolkit/client`
- `@ai-form-toolkit/server`

Both are stored at `packages/` directory.

## Contributing

### Pre-commit

Set up Husky in your local git repository:

```bash
npm run prepare
```

### Building

For building locally, run `npm run build` or `npm run build:watch` for each project in `packages/` directory. For example:

```bash
cd packages/server/
npm run build:watch

# in another terminal
cd packages/client/
npm run build:watch
```
