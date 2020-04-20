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

[**Read The Docs**](https://target.github.io/consensource-docs/docs/developer/application-developers-guide/client/)
<br />

</div>

<hr />

[![Build Status](https://travis-ci.org/target/consensource-ui.svg?branch=master)](https://travis-ci.org/target/consensource-ui)

## Overview

#### Details on the technical architecture can be found on our [docs site](https://target.github.io/consensource-docs/docs/developer/application-developers-guide/client/).

The ConsenSource UI is comprised of a number of Mithril applications under the same router. The following views are defined:

-   [Retailer](https://localhost:8080/index_retailer.html)
-   [Auditor](https://localhost:8080/index_auditor.html)
-   [Factory](https://localhost:8080/index_factory.html)
-   [Standards Body](https://localhost:8080/index_standards_body.html)

## Development

### Environment Setup

```
brew install node@8
yarn
```

### Running the app

**Currently, the UI cannot be run without the rest of the ConsenSource project.**

In order to run the UI you will need to clone the [`consensource-compose repo`](https://github.com/target/consensource-compose) and follow the [setup instructions](https://github.com/target/consensource-compose#setup) to download the docker images for all of the services.

Once you have all of the images, you can run the following command to start the network:

```
./docker-helper -r
```

#### Starting the dev server

To enable hot module reloading while developing, run the following command:

```
yarn start
```

#### TypeScript compilation

When running the dev server, we also compile our TypeScript code to JavaScript. This is performed automatically via our [webpack config file](https://github.com/target/consensource-ui/blob/master/webpack.config.js).

Note that this will also generate source map files to enable TypeScript debugging in the browser.

### Testing

Tests can be run with the following command:

```
yarn test
```

To generate a code coverage report:

```
yarn test:coverage
```

### Linting

Linting errors will fail in our CI, so it is important to verify that your code is linty before opening a PR.

```
yarn lint
```

#### Recommended VSCode plugins for linting

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Generating Protobufs

Services within the ConsenSource network communicate via [Protocol Buffers](https://developers.google.com/protocol-buffers).

In order to build the protobuf messages that get sent to the API, we have a [script](https://github.com/target/consensource-ui/blob/master/scripts/compile_protobufs.sh) that takes the content of our `/protos` folder and generates a JavaScript interface and TypeScript declaration file for that interface.

This script can be ran with the following command:

```
yarn generate-protobufs
```

**Note: This script is automatically ran before any other dependent scripts (`test`, `build`, etc.)**

## Building / Release

```
yarn
yarn build
```
