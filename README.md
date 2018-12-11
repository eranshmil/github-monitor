# Github Monitor

![Screenshot](assets/screenshot.png)

A basic app that monitors an entire GitHub Organization for commits, forks and issues, using Github Webhooks.

## Table of contents

- [Environment variables](#environment-variables)
- [Development](#development)
- [Production build](#production-build)
- [Endpoints](#endpoints)

## Environment variables

The server can fetch the variables also from an `.env` file located in the root path of the project.<br>
If you don't want to use the operation system's environment variable, such as in your local machine, just create a copy of the file `.env.example`, and name it `.env`.

## Development

1. Clone/fork this project.
2. Configure environment variables.
3. Install dependencies:

   ```bash
   yarn install
   ```

4. Start server:

   ```bash
   yarn dev

   # server only
   yarn dev:server

   # client only
   yarn dev:client
   ```

5. Navigate to `http://localhost:4200/`.

## Production build

- If you're using Heroku, you can clone this repository, make your changes and enable automatic deployments for your repository.<br>
  The `postinstall` script will create a build for both server and client and then the `start` script will run the server that serves the client in the base url of your deployment, just like in the demo above.

1. Configure environment variables, it's important to set `NODE_ENV` to `production`.
1. Run build script:

   ```bash
   yarn build

   # server only
   yarn build:server

   # client only
   yarn build:client
   ```

1. The server code will be bundled in `dist/server.js` and the client in `dist/client`.

## Endpoints

| Path     | Method | Description                          |
| -------- | ------ | ------------------------------------ |
| /        | GET    | Serving the client (production only) |
| /webhook | POST   | Receive events from Github           |
| /commit  | GET    | List all commits from PushEvent      |
| /fork    | GET    | List all forks from ForkEvent        |
| /issue   | GET    | List all issues from IssuesEvent     |
