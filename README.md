<div align="center">
  <h1>ConsenSource UI </h1>

  <!-- Future logo -->
  <!-- <a href="https://www.emojione.com/emoji/1f410">
    <img
      height="80"
      width="80"
      alt="goat"
      src="https://raw.githubusercontent.com/testing-library/react-testing-library/master/other/goat.png"
    />
  </a> -->

  <p>Certification transparency and authenticity to empower responsible sourcing</p>
</div>

<hr />

[![Build Status](https://travis-ci.org/target/consensource-ui.svg?branch=master)](https://travis-ci.org/target/consensource-ui)

## Table Of Contents

- [Getting Started](#Getting-Started)
  - [Overview](#Overview)
  - [Development Environment Setup](#Development-Environment-Setup)
    - [Docker setup](#Docker-setup)
    - [Running the UI](#Running-the-UI)
- [Available Commands](#Available-Commands)
  - [`yarn start`](#yarn-start)
  - [`yarn test`](#yarn-test)
  - [`yarn build`](#yarn-build)
  - [`yarn format`](#yarn-format)
  - [`yarn lint`](#yarn-lint)
  - [`yarn generate-protobufs`](#yarn-generate-protobufs)
  - [`yarn clean`](#yarn-clean)

## Getting Started

### Overview

The ConsenSource UI allows retailers, standards bodies, certifying bodies, and factories to build transactions and interact with the underlying ConsenSource blockchain. Account info such as username, private and public keys, etc, are stored in an off-chain database.

In addition to transaction building, the UI allows end users to explore factory profiles and discover new factories based on various certification criteria.

### Development Environment Setup

#### Docker setup

In order to run the UI you will need to clone the [`consensource-compose repo`](https://github.com/target/consensource-compose) and follow the [setup instructions](https://github.com/target/consensource-compose#setup) to download the docker images for all of the services.

Once you have all of the images, you can run the following command to start the network:

```
./docker-helper -r
```

#### Running the UI

```
# Use correct Node version
nvm use

# Install dependencies
yarn

# Start the dev server
yarn start
```

## Available Commands

From a command line in the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Read the [Development Environment Setup](#development-environment-setup) instructions for info on starting the backend services for ConsenSource.

### `yarn test`

Launches the test runner in the interactive watch mode.<br/>

### `yarn build`

Builds the app and outputs to the `build` folder.<br/>

### `yarn format`

Formats all globbed files using [prettier](https://prettier.io/) for consistency throughout the codebase.<br/>

### `yarn lint`

Lints all globbed files according to the rules specified in the `.eslintrc.js` file, emitting errors and warnings to the console.<br/>

### `yarn generate-protobufs`

Takes the content of our `/protos` folder and generates a JavaScript interface and TypeScript declaration file for the JS interface. Outputs these files to `src/services/protobuf/compiled/`.<br/>

### `yarn clean`

Removes the the contents of `node_modules` and `src/services/protobuf/compiled/`.
