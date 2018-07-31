# environmental-health-smart-fhir
SMART on FHIR app to integrat environmental health data with clinical data with the aim to improve population health.

Built with [Vue.js](https://vuejs.org/), continous integration with [Travis](https://travis-ci.org/stfnh/bb-clear-smart-fhir), automated unit tests by [Jest](https://jestjs.io/).

# Getting started

## Local setup for development and testing

- Prerequisites: Install current versions of [Node](https://nodejs.org/en) and [Yarn](https://yarnpkg.com/lang/en/) (alternatively npm).

Get a local copy / clone repository:

```
$ git clone git@github.com:stfnh/enviornmental-health-smart-fhir.git
```

Install the dependencies:

```
$ cd enviornmental-health-smart-fhir
$ yarn
```

Serve on localhost:

```
$ yarn serve
```

This will use an open access FHIR server for testing, no OAuth2 necessary. For details see the [smartClient implementation](./src/smartClient.js).

Create a production build and [serve](https://github.com/zeit/serve#readme):

```
$ yarn build
$ serve -s dist/
```

You can now test the app using the [SMART App Launcher](http://launch.smarthealthit.org/). Use the URL to launch.html as the APP Launch URL (normally http://localhost:5000/launch.html). This app was also tested with [Cerner's Code Console](https://code.cerner.com/developer/smart-on-fhir/apps).
