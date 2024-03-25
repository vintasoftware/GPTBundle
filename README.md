<a href="https://gptbundle.ai/">
  <img alt="Boost your Next.js projects with AI." src="https://uploads-ssl.webflow.com/65f07558bcb66f1b91b0ee63/6601d7b32eae5f9e01c66452_gptbundle%20-%20github%20cover.png">
  <h1 align="center">GPTBundle</h1>
</a>

This product is currently in **open alpha phase**, feedback is welcomed but usage for commercial applications is not yet advised.

**GPTBundle** is an open-source library designed to empower Next.JS web developers by integrating cutting-edge GPT-4 capabilities into their next launches.

Leveraging the power of [LLM](https://en.wikipedia.org/wiki/Large_language_model) models (used by [ChatGPT](https://chat.openai.com/)) through [OpenAI's public API](https://platform.openai.com/docs/api-reference), GPTBundle offers developers a range of templates built using [Vercel](https://vercel.com/)'s [Next.js](https://github.com/vercel/next.js) and [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). Our ultimate goal is to help the development community to create AI-powered web features easily.

---

<p align="center">
  <a href="#key-features"><strong>Key Features</strong></a> ·
  <a href="#documentation"><strong>Documentation</strong></a> ·
  <a href="#project-structure"><strong>Project Structure
</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·

## Key Features

### AI Assistant Button
GPTBundle offers AI buttons that auto-fill and improve the user-provided data in multiple text fields. They are flexible to fit in any form and in can use them to help users create data such as bios based on avaiable profile info, task descriptions based on the context provided, and much more.

### AI Form Creator Templates
Choose from a variety of templates tailored for common formats of web features, such as creating a filling form for legal contracts, creating exams based on technical articles, creating a shopping checklist based on a cooking recipe, text enhancement for marketing content, and more.

### Compatible with Major UI Libraries
By implementing react-jsonschema-form's versatility, GPTBundle is compatible with major UI libraries used in many renowned web products:
[Ant Design](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/antd)
— [Bootstrap 3](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/core)
— [Bootstrap 4](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/bootstrap-4)
— [Chakra UI](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/chakra-ui)
— [Fluent UI](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/fluent-ui)
— [Fluent UI 9](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/fluentui-rc)
— [Material UI 4](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/material-ui)
— [Material UI 5](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/mui)
— [Semantic UI](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/semantic-ui)

### Open Source
GPTBundle is developed by Vinta and maintained by the community, ensuring transparency, reliability, and continuous improvement. It will always be open to feedback and suggestions.

## Documentation

**Alpha Stage Documentation:** [https://gptbundle-alpha.vinta.dev/](https://gptbundle-alpha.vinta.dev/)

In our public documentation, you'll find installation instructions, tutorials, and examples. Note that hosted examples are not interactive since they need an OpenAI API Key to work. 

Note that hosted examples are not interactive. See [Building](#building) below to learn how to build the interactive docs.

## Project Structure

This is a multipackage monorepo that holds the two NPM projects necessary for GPTBundle:

- `@gptbundle/client`
- `@gptbundle/server`

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
pnpm -F @gptbundle/docs run dev
```

Then open `http://localhost:3000` in your browser.

### Running Tests

There are three available commands for running tests:

1. `pnpm run test` or `pnpm test` – runs all test cases.
2. `pnpm run test:cov` – runs all tests and generates a coverage report.
3. `pnpm run test:watch` – runs all tests in watch mode.

NOTE: Running these commands in the root directory will trigger all tests from all packages.
However, if you run them within a specific package directory, only the tests associated with that package will be executed.

---

This library is created and maintaned by [Vinta Software](https://vinta.software) — by developers, and for developers. 

For questions, feedback, and partnerships don't hesitate to reach us at <a href="mailto:gptbundle@vinta.software">gptbundle@vinta.software</a>