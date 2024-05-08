1. ERROR HANDLING. Used 2 different approaches of error handling: 
A. main middleware next().
for the CONTROLLERS which are handling incoming HTTP requests, execute the nesessary logic or operations  by calling services, and then send responses.
for the MODELS which are used for defining data schemas and interacting directly with the database.
for the MIDDLEWARES (some of them:  logging, authentication)
B. custom errors (ErrorWithStatus).
for the SERVICES containing the main business logic, interacting with models performing data operations.


