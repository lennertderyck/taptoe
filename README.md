# taptoe

## Get started
### Local setup

> Use the following commands only in development environments

We made it easy to install and run everything you need in one go thanks to the [`run-p` package](https://github.com/mysticatea/npm-run-all#readme).

**Installation**

First you should install the needed packages for both front- and back-end.
Run this command from the project-root.
```bash
npm i
npm run setup
```

**Running the app (development)**

When all packages are installed run the following command to start the GraphQl-api and the React front-end application.
```bash
npm run dev
```

### Production setup
The back- and front-end are separated in production to save on costs.

**Front-end**

The front-end will run on Vercel, but is not deployed for the moment.
Auto deploys will be enabled.

**Back-end**

The rest- and GraphQl-api run on Heroku and are two separate applications.

- The rest-api is available on [http://taptoe-socket.herokuapp.com](http://taptoe-socket.herokuapp.com)
- The GraphQl-api on [https://taptoe-gapi.herokuapp.com](https://taptoe-gapi.herokuapp.com)

Auto deploys are only enabled for the GraphQl-api and also the GraphQl-playground is installed on this endpoint.

To deploy the rest-api you should push your changes to the main branch, log-in on Heroku and deploy manually. Make sure that nothing else is deploying because only one deployment at a time is possible for the moment.

## Back-end credentials

Authentication for the back-end is possible by adding a `.env` file to the `backend-gapi`-directory or filling in the env-variables on the used hosting-platform (these are already added in Heroku).

- `MONGO_USER` (The MongoDB database username)
- `MONGO_PWD` (The MongoDB database password)
- `MONGO_CLUSTER` (The MongoDB database cluster-url)
- `MONGO_DBNAME` (The MongoDB database name)
- `TOKEN_SALT` (The back-end JWT-generator secret key)

**MongoDB connection string**

Replace the values between the brackets by the credentials. Never hardcode them in the application, always add them from a .env-file.

`mongodb+srv://<MONGO_USER>:<MONGO_PWD>@<MONGO_CLUSTER>/<MONGO_DBNAME>?retryWrites=true&w=majority`
