# ConsenSource UI [![Build Status](https://travis-ci.org/target/consensource-ui.svg?branch=master)](https://travis-ci.org/target/consensource-ui)

The ConsenSource UI is comprised of a number of Mithril applications under the same router. The following views are defined:

  - [Retailer](https://localhost:8080/index_retailer.html)
  - [Auditor](https://localhost:8080/index_auditor.html)
  - [Factory](https://localhost:8080/index_factory.html)
  - [Standards Body](https://localhost:8080/index_standards_body.html)

## Env Setup

  - Node8: `brew install node@8`
  - To ignore changes to env config, run: `git update-index --assume-unchanged .env.feature-flags`
    - To resume tracking env config, run: `git update-index --no-assume-unchanged .env.feature-flags`

## Building

  - `npm install`
  - `npm run build`

## Development

### Linting

Code linting is provided through [ESLint](eslint.org) and is configured with the
`.eslint.js` file at the root of the `ui` directory. It can be run via:

```
$ npm run lint
```

Formatting code can be done by running

```
$ npm run format
```

This will format the code using [es-beautifier](https://github.com/dai-shi/es-beautifier),
which is the same tool in the standard VSCode plugin, among others.

A non-zero return status means your code is linty.
