# Blog-API

A RESTful API that provides a convenient and secure way to access and manage your blog's data.

## Features

- A simple and flexible API that makes it easy to interact with your blog's data.
- Support for CRUD (Create, Read, Update, Delete) operations for posts, comments, and other data.
- Authentication and authorization to ensure that only authorized users have access to your data.
- Robust error handling and validation to ensure that your data is accurate and secure.

## Endpoints

| Endpoint                    | Method | Description                                    |
| --------------------------- | ------ | ---------------------------------------------- |
| /login                      | POST   | Login as author                                |
| /signup                     | POST   | Create a new author account                    |
| /check-token                | GET    | Checks validity of session token               |
| /articles/all               | GET    | Retrieve a list of all articles for client     |
| /articles/latest            | GET    | Retrieve a list of latest articles for client  |
| /admin/articles/all         | GET    | Retrieve a list of all posts for admin         |
| /admin/articles/unpublished | GET    | Retrieve a list of unpublished posts for admin |
| /articles/:id               | GET    | Retrieve a specific article by ID              |
| /articles/random            | GET    | Retrieve a random article                      |
| /admin/articles             | POST   | Create a new article                           |
| /admin/articles/:id         | DELETE | Delete an existing article by ID               |
| /admin/articles/:id         | PUT    | Update an existing article by ID               |
| /articles/:id/comment       | POST   | Create a new comment                           |
| /admin/articles/:id/comment | DELETE | Delete a specific comment                      |
| /tags                       | GET    | Retrieve a list of all tags                    |
| /admin/tags                 | POST   | Create a new tag                               |
| /admin/tags/:id             | DELETE | Delete a specific tag by ID                    |
| /admin/tags/:id             | PUT    | Update a specific tag by ID                    |

## Installation

1.  Clone the repository to your local machine: `git clone https://github.com/erynder-z/code-blog-api.git`
2.  Navigate to the project directory: `cd code-blog-api`
3.  Install the required dependencies: `npm install`
4.  Start the development server: `npm run serve`

## Usage

1.  Setup .env (`PORT=<yourPort>`, `MONGODB_URI=<DB_connection_string>`, `TOKEN_EXPIRE_TIME=<time>`, `TOKEN_SECRET_KEY=<secret_key_for_JWT_authentication>`, `SIGNUP_SECRET=<secret_key_for_signup_authentication>` )
2.  Make HTTP requests to the API endpoints using your preferred tool or library (e.g., `curl`, `httpie`, `Postman`, etc.).
3.  Authenticate your requests as necessary using JSON Web Tokens.
4.  Retrieve, create, update, and delete data as desired.

## Acknowledgments

- [Async](https://caolan.github.io/async/) - A library that helps with asynchronous flow control.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - A library for password hashing.
- [Compression](https://github.com/expressjs/compression) - A middleware for compressing HTTP responses.
- [Cookie-Parser](https://github.com/expressjs/cookie-parser) - A middleware for parsing HTTP cookies.
- [Cors](https://github.com/expressjs/cors) - A middleware for providing Cross-Origin Resource Sharing.
- [Dotenv](https://github.com/motdotla/dotenv) - A zero-dependency module that loads environment variables from a .env file.
- [Express](https://expressjs.com/) - A Node.js framework that was used to build the API.
- [Express-Validator](https://github.com/express-validator/express-validator) - A set of express.js middlewares that wraps validator.js validator and sanitizer functions.
- [Helmet](https://helmetjs.github.io/) - A collection of middlewares that help secure Express applications by setting various HTTP headers.
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - A library for JSON Web Tokens (JWT).
- [MongoDB](https://www.mongodb.com/) - A database that was used to store the blog data.
- [Mongoose](https://mongoosejs.com/) - An Object Data Modeling (ODM) library for MongoDB.
- [Morgan](https://github.com/expressjs/morgan) - A middleware for logging HTTP requests.
- [Passport](http://www.passportjs.org/) - An authentication middleware for Node.js.
- [Passport-Jwt](https://github.com/mikenicholson/passport-jwt) - A Passport strategy for authenticating with a JSON Web Token (JWT).
- [Passport-Local](https://github.com/jaredhanson/passport-local) - A Passport strategy for authenticating with a username and password.
- [Rimraf](https://github.com/isaacs/rimraf) - A `rm -rf` util for node that works cross-platform.

Additionally, the following tools were used for development:

- [Concurrently](https://github.com/kimmobrunfeldt/concurrently) - A tool that runs multiple commands concurrently.
- [Nodemon](https://nodemon.io/) - A utility that automatically restarts the node application when file changes in the directory are detected.
- [TypeScript](https://www.typescriptlang.org/) - A statically-typed superset of JavaScript that was used for this project.
