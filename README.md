# Remy

## Development Environment

The backend of Remy is written in `Node.js`

Tools to install
* Node.js
* An IDE like Visual Studio Code, Visual Studio Community 2015 or Web Storm

### Running the server
* cd to the directory of the repo and run the following from a terminal:
1. `npm install` To install all the dependencies from `package.json`.
2. `npm start` to run the server.

#### To edit the API specs in Swagger Editor
* `npm run edit-api` to open Swagger Editor in a browsr menu. Make sure the server
is running as well in a separate terminal window.

* To edit the API specs using Swagger Editor, run `swagger project edit`.

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

* Any configuration options like API keys, environment variables...etc., should be added in `config/config.js`