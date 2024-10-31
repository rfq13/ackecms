## Running the Server

To start the development server, you can use npm scripts. Run the following command in your terminal:

```bash
cd server
npm install
npm run start
```
## Env

```bash
APP_PORT=8761 # The port on which the application will run. In this case, the application will run on port 8761.

FE_URL="http://localhost:5174" # The frontend URL used to access the application from a browser. In this case, the frontend runs at http://localhost:5174.

MONGO_URI=mongodb://localhost:27017/ackecms # The connection URI for MongoDB. This indicates that MongoDB is running on localhost at port 27017 and using a database named ackecms.

GROQ_API_KEY=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 # The API key for accessing the GROQ service. This key is used for authentication when making requests to the GROQ API.
```
## Dependencies
A list of dependencies used in the project, along with brief explanations for each.

![Express.js](https://img.shields.io/badge/Express.js-_-green?logo=express)  
  Express.js is a fast, unopinionated, and minimalist web framework for Node.js.

- ![CORS](https://img.shields.io/badge/CORS-_-blue?logo=cors)  
  CORS (Cross-Origin Resource Sharing) is a mechanism that allows web pages to make requests to a different origin (domain, protocol, or port) than the one the web page was loaded from.

- ![Nodemon](https://img.shields.io/badge/Nodemon-_-blue?logo=nodemon)  
  Nodemon is a utility that automatically restarts your Node.js application when changes are made to the code.

- ![Groq SDK](https://img.shields.io/badge/Groq%20SDK-_-blue?logo=groq)  
  Groq SDK is a software development kit for interacting with the Groq database.

- ![Dotenv](https://img.shields.io/badge/Dotenv-_-blue?logo=dotenv)  
  Dotenv is a zero-dependency library that loads environment variables from a `.env` file.

- ![Body-Parser](https://img.shields.io/badge/Body-Parser-_-blue?logo=body-parser)  
  Body-Parser is a middleware for Express.js that parses the request body.

- ![Mongoose](https://img.shields.io/badge/Mongoose-_-blue?logo=mongoose)  
  Mongoose is a MongoDB object modeling library for Node.js.