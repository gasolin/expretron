# Expretron
[![Dependency Status](https://david-dm.org/gasolin/expretron.svg)](https://david-dm.org/gasolin/expretron)

A boilerplate of modern Javascript dev environment.

## Setup

```
$ npm install
# copy vendor libraries from node_modules to public/vendor
$ npm run setup
```

`npm run setup` will copy app folder to build folder and put related frontend libraries into `build/public/vendor` folder.

## Run

```
$ npm start
```

## Lint

Do eslint (JS) & stylelint (CSS)

```
$ npm run lint
```

## test

TBD

## build / distribution

```
npm run dist
```

or

```
npm run dist:osx
```

to generate OS specific build

## What is included in this boilerplate?

* [Materialize](http://materializecss.com/) CSS framework
* [Express](http://expressjs.com) web server
* [Electron](http://electron.atom.io/) web desktop runtime
* [electron-builder](https://github.com/electron-userland/electron-builder) package and deploy Electron apps
* [eslint](http://eslint.org/) for Javascript style check and [stylelint](https://github.com/stylelint/stylelint) for CSS style check
