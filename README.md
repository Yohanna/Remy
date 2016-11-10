# Remy

## Development Environment

The backend of Remy is written in `Node.js`

Tools to install
* Node.js
* An IDE like Visual Studio Code, Visual Studio Community 2015 or Web Storm

### Running the server
* cd to the directory of the repo and run the following from a terminal:
1. `npm install swagger -g` This installs `swagger` globally.
2. `npm install` to install all the required modules listed in `package.json`
3. `swagger project start` to run the server

* To edit the API specs using Swagger Editor, run `swagger project edit`.

### Description of modules

### API Implementation
* The following tutorials are a good start on how APIs are implemented in Swagger:
  - [BUILD YOUR MICROSERVICES API WITH SWAGGER AND EXPRESS](http://robferguson.org/2015/06/06/build-your-microservices-api-with-swagger/)
  - [Swagger Docs](https://github.com/swagger-api/swagger-node/blob/master/docs/README.md)

* Implement the server logic in the `server` directory, then run `node file_name` to run the file you want to test. This is just a temporary way
of testing your app logic, it will change later.