# AI Chatbot App

A GitHub repository for the AI Chatbot application.

## \* Pre-requisites

Please have [NodeJS](https://nodejs.org/en/download), [Git](https://git-scm.com/downloads), [pnpm](https://nodejs.org/en/download), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) installed on your machine/IDE.

## \* GitHub development process</h2>

1. Ask the engineering team to add you to our Github Org & Repos

2. Follow the <b><u>Environment Setup</u></b> section below

3. Follßow the [Git workflow documentation](https://career-bliss-academy.notion.site/Git-Workflow-AI-Chatbot-a041689cb9414781a358c7ef7182bc00)

## \* Environment Setup

### Clone the project

1. Travel to your desired directory where you want to locate your repository

   ```bash
   cd <your dir>
   ```

2. Use one of the methods below to clone the repo.

   ```bash
   # using HTTPS
   git clone https://github.com/AI-ChatBot-Yoga/ai-chatbot.git

   # using a password-protected SSH key
   git clone git@github.com:AI-ChatBot-Yoga/ai-chatbot.git

   # using Github CLI
   gh repo clone AI-ChatBot-Yoga/ai-chatbot
   ```

### Install the dependencies

1. Travel to the repository

   ```bash
   cd ai-chatbot
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

### Run local server

```
cd ai-chatbot
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run test files

```
pnpm test
```

### Build the app

```
pnpm build
```

### Run open API

In VSCode, install extension named "REST Client Huachao Mao"
Then you can run the open API in the file `api.http`

## \* Branch Name Convention

### For working branches

```
<your-name>-<issue-summary>
```

Example: `kanzeon-add-logo`

### For functional branches

```
<type>/<subject>
```

Example: `release/v1.2.3`

#### Functional Type References:

`<type>` can be one of the following:

- `feature`: a specific feature branch to develop on
- `chore`: for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)
- `refactor`: for refactoring code without changing the behavior
- `release`: for releasing a new version
- `hotfix`: for fixing a bug in production, for changing code with a temporary solution and/or without following the usual process (usually because of an emergency)
- `merge`: for merging branches
- `experimental`: for testing new things

## \* Commit Message & PR Title Convention:

### For commit message:

```
<type>: <subject>
```

Example:

```
feat: add health check
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: See 'Type Reference' below
```

### For Pull Request (PR) titles

```
<type>: <Short purpose of this PR>
```

Example: `feat: Install and setup new library`

#### Commit & PR Type References:

- `feat`: new feature for the user, not a new feature for build script
- `fix`: bug fix for the user, not a fix to a build script
- `docs`: changes to the documentation
- `style`: formatting, missing semi-colons, etc; no production code change
- `refactor`: refactoring production code, eg. renaming a variable
- `test`: adding missing tests, refactoring tests; no production code change
- `config`: changing configuration files
- `structure`: changing the structure of the repository; no production code change
- `build`: changing something in the build process (or dependencies of the build process); no production code change
- `ci`: changing CI configuration files and scripts (eg. Github, Travis, Circle, BrowserStack, SauceLabs); no production code change
- `perf`: a code change that improves performance
- `format`: formatting code, adding missing semi-colons, etc; no production code change
- `chore`: for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.) no production code change

