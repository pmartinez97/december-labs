# december-labs
Code challenge for December Labs (RESTful APi using Node.js, Express, Sequelize)

## Features
- **Develop**: [Nodemon](https://nodemon.io/)
- **Dependency management**: with [Npm](https://docs.npmjs.com/about-npm/)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Database**: [PostgresQL](https://www.postgresql.org/) object data modeling using [Sequelize](https://sequelize.org)
- **Cache management**: [Redis](https://redis.io/)
- **Vendor API**: [Fixer API](https://apilayer.com/marketplace/fixer-api)
- **Routes Validation**: [Joi](https://joi.dev/)

## Getting Started
### Installation

```bash
git clone https://github.com/pmartinez97/december-labs.git
cd december-labs
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:
```bash
cp .env.example .env
# open .env and modify the environment variables
```

### Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Linting:

```bash
# run ESLint
npm run pretest
```

### Database provisioning

Create database:
```bash
npx sequelize db:create
```

Running migrations:
```bash
npm run migrate
```
or
```bash
npx sequelize db:migrate
```

Running seeds:
```bash
npm run seed
```
or
```bash
npx sequelize db:seed:all
```

After running the seeds files, the database will have 3 users with their respective accounts (one for each currency) and the 3 supported currencies will also be created.

### API Endpoints

List of available routes:

**User routes**:\
`POST /transfer` - create a transfer between two accounts\
`GET /transactions` - Get all the transactions from a user\

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/?v=17.9.1) for more details.

## Authorization

In order to execute the endpoints, authentication is not required, you simply have to add the user-id header in the request with the corresponding user id

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

To modify the ESLint configuration, update the `.eslintrc.json` file.

## Postman Collection

Import "Bank API - December Labs.postman_collection.json" file into Postman App to see examples of request

## Comments
**Using the fixer API:**
Because each API request is going to have a cost. I decided to save the currency rates in Redis to reduce the number of calls to the external API, the cache lifetime is configurable through an environment variable and by default the rates of the coins will live 1 hour in memory

**Authentication:**
The main limitation currently is that there is no login system through an access-token. I decided not to add it due to time constraints since I consider that the most important part of the challenge was database modeling and rate management obtained through the external API
Either way it is easily addable in the future using JWT

**Database:**
It is important to clarify that the database can be optimized with the use of indexes that are also easily added with a new migration.

