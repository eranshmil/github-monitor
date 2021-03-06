# Github Monitor

Basic app that monitors an entire GitHub Organization for commits, forks, and issues, using Github Webhooks.<br>
Developed with [Express](https://expressjs.com) and [Angular](https://angular.io).

Demo: https://sml-github-monitor.herokuapp.com

![Screenshot](assets/screenshot.png)

## Table of contents

- [Github Monitor](#github-monitor)
- [Environment variables](#environment-variables)
- [Development](#development)
  - [Debugging with VSCode](#debugging-with-vscode)
  - [Webhook testing](#webhook-testing)
- [Production build](#production-build)
- [Endpoints](#endpoints)

## Environment variables

The server can read the variables from the `.env` file located in the root path.<br>
If you don't want to use OS's environment variables, such as in your local machine, just create a copy of the file `.env.example` into `.env`.

## Development

1. Clone/fork this project.
2. Configure environment variables.
3. Install dependencies:

   ```bash
   yarn install
   ```

4. Start the server/client:

   ```bash
   yarn dev

   # server only
   yarn dev:server

   # client only
   yarn dev:client
   ```

5. Navigate to `http://localhost:4200/`.

- To debug breakpoints outside the scope of the routes, you need to run the script `yarn dev:server:brk`, that changes the `--inspect` flag into `--inspect-brk`.

### Debugging with VSCode

In order to debug with VSCode instead of Chrome DevTools, there are two options:

1. Go to the Debugger section, choose `Attach to process` and click the play button.
1. Read about `Node: Auto Attach` feature in the article [Debug Your Node.js App in 60 Seconds by John Papa](https://link.medium.com/5K0J0S3FAS) or in [VSCode documentation](https://code.visualstudio.com/docs/nodejs/nodejs-debugging).
   ![Using Auto Attach](https://code.visualstudio.com/assets/docs/nodejs/nodejs-debugging/auto-attach.gif)

### Webhook testing

First, we need to install a program that exposes our localhost to the internet. If you already use another program, expose port `3000` and skip to the second step.

1. Signup to [ngrok](https://ngrok.com), [download and install](https://ngrok.com/download).
1. Expose port 3000:

   ```bash
   ./ngrok http 3000
   ```

1. Copy the url from the second `Forwarding` line, should look like `https://xxxxxxxx.ngrok.io`.
1. Goto Settings/Webhooks in your repository, and fill in the form:

   - Payload URL: `https://xxxxxxxx.ngrok.io`
   - Content type: `application/json`
   - Secret: The `GITHUB_SECRET` defined in your environment, you could generate a random string using:

     ```bash
     node -p "crypto.randomBytes(20).toString('hex')"
     ```

   - Let me select individual events: Pushes, Forks, Issues

## Production build

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

- If you use Heroku, you can enable [automatic deploy](https://devcenter.heroku.com/articles/github-integration) and the project will work without any further configuration.<br>
  The `postinstall` script will create a build for both server and client.<br>
  And the `start` script will run the server that serves the client in the base url of your deployment.

## Endpoints

| Path     | Method | Description                          |
| -------- | ------ | ------------------------------------ |
| /        | GET    | Serving the client (production only) |
| /webhook | POST   | Receive events from Github           |
| /commit  | GET    | List all commits from PushEvent      |
| /fork    | GET    | List all forks from ForkEvent        |
| /issue   | GET    | List all issues from IssuesEvent     |
