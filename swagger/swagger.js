
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require ("swagger-ui-express")

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version: "1.0.0",
            title: "Document API",
            description: "API Documentation for use",
            contact: {
                name: "Victor LLancari Carrasco"
            },
            servers: ["http://localhost:3030"]
        }
    },
    basePath: "/",
    //APIs que se van a documentar
    apis: ["swagger/apis/index.js"]
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)

const swaggerDocs = (app, port )=>{
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    console.log(`Swagger document On! --> http://localhost:${port}/api/v1/docs`)
}

module.exports = {swaggerDocs}