# Set up NextJS Project

## Tech Stack
- NextJS [React Framework](https://nextjs.org/docs)
- Typescript [Programming Language](https://www.typescriptlang.org/)
- Tailwind CSS [CSS Framework](https://tailwindcss.com/docs/installation)
- ShadCN [Reusable Components](https://ui.shadcn.com/docs)
- Eslint [Linter](https://eslint.org/)
- Prettier [Formatter](https://prettier.io/)
- Husky [Git Hooks](https://typicode.github.io/husky/)
- PNPM [Package Manager](https://pnpm.io/installation)
- NVM [Node Version Manager](https://github.com/nvm-sh/nvm/blob/master/README.md)
- [Docker](https://www.docker.com/) is a platform designed to help developers build, share, and run container applications.

## Standards
- [Eslint recommended rules](https://eslint.org/docs/latest/rules/) for Typescript
- NextJs rules [Core Web Vitals](https://nextjs.org/docs/app/building-your-application/configuring/eslint#core-web-vitals)
- File naming [Angular Coding Style](https://angular.io/guide/styleguide)

## What is Next.js?

Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.

[Official Documentation](https://nextjs.org/docs/getting-started)

## Introduction

This tutorial is not meant to replace the official documentation, which is absolutely fantastic. I highly recommend you take a read through at least the [basic features](https://nextjs.org/docs/basic-features/pages) section before you begin this tutorial, so you'll be familiar with the terminology and tools and some of the components they provide that are similar, but usually "more powerful" versions of their vanilla HTML counterparts.

Now, with all that said, if you are ready, let's dive right in!

## Project Setup

We'll begin by creating a Next.js application with a Typescript and PNPM as a package manager

```bash
pnpm create next-app frontend
```

```bash
cd frontend
```

Install dependencies using PNPM:

```bash
pnpm install

pnpm dev
```
The app will be available on [http://localhost:3000](http://localhost:3000)


## Engine Locking

For using the same Node engine and package manager, its necessary to create the following files:

- `.nvmrc` - Will tell other users of the project which version of Node is used
- `.npmrc` - Will tell other users of the project which package manager is used

We are using `Node v18 Hydrogen` and `pnpm` for this project so we set those values like so:

`.nvmrc`

```.nvmrc
lts/iron
```

`.npmrc`

```
engine-strict=true
```

We are using the LTS version 18.

You can check your version of Node with `node --version` and make sure you are setting the correct one. A list of Node version codenames can be found [here](https://github.com/nodejs/Release/blob/main/CODENAMES.md) or [NodeJS Website](https://nodejs.org/en/about/previous-releases)

Note that the use of `engine-strict` didn't specifically say anything about `pnpm`, we do that in `package.json`:

`package.json`

```json
  ...
  "engines": {
    "node": ">=18.0.0",
    "npm": "please-use-pnpm",
    "yarn": "please-use-pnpm",
    "pnpm": ">=8.12.0"
  },
  ...
```

The `engines` field is where you specify the specific versions of the tools you are using. You can also fill in your personal details if you choose.


## Git Setup

This would be a good time to make our first commit to our remote repo, to make sure our changes are backed up, and to follow best practices for keeping related changes grouped within a single commit before moving to something new.

By default your Next.js project will already have a repo initialized. You can check what branch you are on with `git status`. It should say something like:

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .npmrc
        .nvmrc
```

This tells us we are on the `main` branch and we have not staged or made any commits yet.

Let's commit our changes so far.

```bash
git add .

git commit -m 'project initialization'
```


### ESLint

We'll begin with ESLint, which is easy because it automatically comes installed and pre-configured with Next.js projects.

We are just going to add a little bit of extra configuration and make it a bit stricter than it is by default. If you disagree with any of the rules it sets, no need to worry, it's very easy to disable any of them manually. We configure everything in `.eslintrc.json` which should already exist in your root directory:

`.eslintrc.json`

```json
{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "globals": {
    "React": "readonly"
  },
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
  }
}
```

In the above small code example we have added a few additional defaults, we have said that `React` will always be defined even if we don't specifically import it, and I have added a personal custom rule that I like which allows you to prefix variables with an underscore \_ if you have declared them but not used them in the code.

I find that scenario comes up often when you are working on a feature and want to prepare variables for use later, but have not yet reached the point of implementing them.

You can test out your config by running:

```
pnpm lint
```

You should get a message like:

```
✔ No ESLint warnings or errors
Done in 1.47s.
```

If you get any errors then ESLint is quite good at explaining clearly what they are. If you encounter a rule you don't like you can disable it in "rules" by simply setting it to 1 (warning) or 0 (ignore) like so:

```json
  "rules": {
    "no-unused-vars": 0, // As example: Will never bug you about unused variables again
  }
```

Let's make a commit at this point with the message `build: configure eslint`

### Prettier

Prettier will take care of automatically formatting our files for us. Let's add it to the project now.

It's only needed during development, so I'll add it as a `devDependency` with `-D`

```
pnpm add -D prettier
```

[Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is a good extension for Prettier and auto-formatting code.

Create the following two files in the root:

`.prettierrc`

```.prettierrc
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Those values are entirely at your discretion as to what is best for your team and project.

`.prettierignore`

```
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# next.js
/.next/
/out/

# production
/build
```

In that file We've placed a list of directories that we don't want Prettier to waste any resources working on. You can also use patterns like \*.html to ignore groups of types of files if you choose.

Now we add a new script to `package.json` so we can run Prettier:

`package.json`

```
  ...
  "scripts: {
    ...
    "prettier": "prettier --write ."
  }
```

You can now run

```
pnpm prettier
```

To automatically format, fix and save all files in your project you haven't ignored. 

Let's make another commit with `build: implement prettier`.

## Testing - Jest
[Jest](https://jestjs.io/) is a delightful JavaScript Testing Framework with a focus on simplicity.

[NextJS Testing](https://nextjs.org/docs/app/building-your-application/testing/jest)

```bash
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

## Git Hooks

One more section on configuration before we start getting into component development. Remember you're going to want this project to be as rock solid as possible if you're going to be building on it in the long term, particularly with a team of other developers. It's worth the time to get it right at the start.

We are going to implement a tool called [Husky](https://typicode.github.io/husky/#/)

Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc. We would like to be able to set certain conditions, and only allow things like commit and push to succeed if our code meets those conditions, presuming that it indicates our project is of acceptable quality.

To install Husky run

```
pnpm add -D husky

pnpm dlx husky install
```

The second command will create a `.husky` directory in your project. This is where your hooks will live. Make sure this directory is included in your code repo as it's intended for other developers as well, not just yourself.

Add the following script to your `package.json` file:

`package.json`

```
  ...
  "scripts: {
    ...
    "prepare": "husky install"
  }
```


This will ensure Husky gets installed automatically when other developers run the project.


```bash
# Create .husky/pre-commit file
pnpm lint
```

The above says that in order for our commit to succeed, the `pnpm test and pnpm lint` script must first run and succeed. "Succeed" in this context means no errors.


Add another one git hook:

```bash 
## Create .husky/pre-push file
pnpm build
```

The above ensures that we are not allowed to push to the remote repository unless our code can successfully build.

## 3. Update husky configuration for production environment
Husky can not be installed in the production environment. Modify the following files accordingly:

```javascript
// Add .husky/install.mjs file

// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
    process.exit(0)
  }
  const husky = (await import('husky')).default
  console.log(husky())
```

```json
// Update package.json
"scripts": {
   ...
   "prepare": "node .husky/install.mjs || true",
   ...
}
```
This modification ensures that Husky is excluded in production and CI environments, preventing any unintended interference.

