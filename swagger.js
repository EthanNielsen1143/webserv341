const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: "Contacts API",
        description: "A simple API to manage contacts",
    },
    host: "localhost:8080",
    schemes: ['https', 'http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);