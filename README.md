# ![FFDC Sample app](./media/ffdc-sample-app-header.png)

> ### Sample _Corporate Banking application_ using [Finastra's Design System](https://github.com/fusionfabric/finastra-design-system) for the front-end and [FusionFabric.cloud](https://developer.fusionfabric.cloud) for backend.

<p align="center">
  <a href="./LICENSE.md"><img src="https://img.shields.io/github/license/fusionfabric/ffdc-sample-corporate-webapp" alt="Repo License" /></a>
  <img src="https://img.shields.io/badge/PRs-welcome-green" alt="PRs welcome"/>
  <a href="https://twitter.com/FinastraFS"><img src="https://img.shields.io/twitter/follow/FinastraFS.svg?style=social&label=Follow"></a>
</p>

<br/>

## Demo

<p align="center">
  <img src="./media/ffdc-corporate-banking-sample-app.gif" alt="Sample app gif"/>
</p>

<br/>

## Installation

1. [Register FFDC application](https://medium.com/finastra-fintechs-devs/create-an-application-on-finastras-developer-portal-d90ef266cafb)

You need to register an application on [FusionFabric.cloud Developer Portal](https://developer.fusionfabric.cloud) and select [Account and Balances - B2C](https://developer.fusionfabric.cloud/solution/real-time-account-balances-and-statement) API.

2. Setup environment variables

Rename `.env.template` to `.env` and setup `OIDC_CLIENT_ID` and `OIDC_CLIENT_SECRET` from the application created at step 1.

3. Run `npm i`

<br/>

## Build

This application contains two applications :

- Angular Application
- NestJs application

So you need to run two commands :

```
npm run dev           # client build in watch mode
npm run start:server  # server build in watch mode
```

Go to http://localhost:3000 and enjoy your demo application 😊

> To build for production, use `npm run build:prod`, which will build both the client and server !

<br/>

## Credentials

For testing purpose, you can login with one of the following credentials:

| User        | Password |
| :---------- | :------- |
| `ffdcuser1` | `123456` |
| `ffdcuser2` | `123456` |

<br/>

## Environement variables

| Variable         | Default value                                     |
| :--------------- | :------------------------------------------------ |
| `OIDC_CLIENT_ID` |                                                   |
| `CLIENT_SECRET`  |                                                   |
| `SESSION_SECRET` | Generated uiid                                    |
| `FFDC`           | `https://api.fusionfabric.cloud`                  |
| `PORT`           | `3000`                                            |
| `OIDC_ISSUER`    | `https://api.fusionfabric.cloud/login/v1/sandbox` |
| `OIDC_SCOPES`    | `openid profile`                                  |
| `OIDC_ORIGIN`    | `http://localhost:3000`                           |

<br/>

## License

These sample applications are released under the MIT License. See [LICENSE](./LICENSE) for details.

<br />

[![Brought to you by Finastra](./media/spread-knowledge-readme-banner.png)](https://www.finastra.com/)
