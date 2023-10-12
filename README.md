# ImageKeeper

> A web application designed to allow users to store their images effortlessly
                                             
## Installation

```sh
$ git clone https://github.com/Cstrp/ImageKeeper.git
$ cd ImageKeeper
```

## Usage

```sh
$ npm install && npm run client-install && npm run server-install
# Prior to running the server, ensure a connection to a PostgreSQL database is established (you can use Docker).
$ cd server
$ npm prisma generate # or npm run prisma migrate dev --name <name of migration>
$ cd .. # return to the root directory
$ npm start # or use concurrently to run the app.
```

> Don't forget to check the .env.example file for configuration settings, and make sure the original .env file is placed in the server folder.
