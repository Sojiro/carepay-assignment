# CarepayAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.10.

This was done as per the [requirement and guidelines](https://github.com/team-carepay/carepay-front-end-assignment-Sojiro#readme).

You can verify the live version [here][production] and the db [here](https://carepay-assignment-db.herokuapp.com/)

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

For convenience, the above command will also start a db server (json-server) and redirects all requests prefixed with `/api` to `http://localhost:3000`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). It also generates the coverage as you write more.

## Publish

This command first runs `prepublishOnly` task which makes sure the quality of the application is good and starts a build with `--prod` flag. Feel free to include linting as part of it.

Once the `prepublishOnly` is successfully done, we deploy our app to [production][production]. \O/

[production]: https://carepay-treatments.netlify.app/
