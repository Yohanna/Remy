# Remy

## Development Environment

The backend of Remy is written in `Node.js` (TypeScript & JavaScript) and `MySQL`.

Tools to install
* Node.js
* An IDE like Visual Studio Code, Visual Studio Community 2015 or Web Storm

### Get a Google Places Web Services API key
* Get an API Key by following the instructions [here](https://developers.google.com/places/web-service/get-api-key).
* Once you get your Key, add it to the `API_KEY` variable in `./config/confi.js`. DO NOT commit that key with any code changes!

### Running the server

#### Set environment configuration
* Create a new file named `.env` and add the following values in it:

```
GOOGLE_MAPS_API_KEY='YOUR_API_KEY'
DB_USER='DB_USERNAME'
DB_PW='DB_PASS'
DB_HOST='DB_HOST' # localhost if running a local MySQL server
DB_PORT='3306' # default port number
```

* cd to the directory of the repo and run the following from a terminal:
1. `npm install` To install all the dependencies from `package.json`.
2. In a terminal, run `npm build:w` to run the TypeScript compiler in watch mode. This will transpiler all the files and put them in `dist` directory every time you save a file.
3. In another terminal, run `npm start` to run the server.

#### To edit the API specs in Swagger Editor TODO, doesn't work
* Run `swagger project edit` to open Swagger Editor in the browser. Make sure the server is running as well in a separate terminal window.

#### To print extra debuging info
* Run `npm run debug`

### Description of modules used
* The API specs are defined using Swagger Specs. [Swagger Node](https://github.com/swagger-api/swagger-node/)
and [Swagger Tools](https://github.com/apigee-127/swagger-tools) are used to validate the API requests and display the API docs.

### Resources

* The following tutorials are a good start on how APIs are implemented in Swagger:
  - [BUILD YOUR MICROSERVICES API WITH SWAGGER AND EXPRESS](http://robferguson.org/2015/06/06/build-your-microservices-api-with-swagger/)
  - [Speed up your RESTful API development in Node.js with Swagger](https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger)
  - [Swagger Docs](https://github.com/swagger-api/swagger-node/blob/master/docs/README.md)

### Implementation Guide

* Implement the server logic such as Google Maps API calss in the `server` directory.
