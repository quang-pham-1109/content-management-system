# Task Management API

This is an API for a Task Management Application, similar to a Trello clone. It provides endpoints for managing tasks, lists, boards, and users. All of the service (database) layer uses raw SQL to query the data, prisma is only used to provide the typing for typescript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn

### Installing

1. Clone the repository

```sh
git clone https://github.com/quang-pham-1109/task-manager-server
```

2. Create a database and `.env` file

- Run the `Database.sql` script in the `/database` directory to create the database.
- Create an `.env` file with syntax similar to the `.env.example`
- The `schema.prisma` file is purely to establish the connection to the database and typing for Typescript. Therefore, you can adjust it to your liking, I was using Supabase for development so your config might vary slightly.

3. Build the project

```sh
yarn install
yarn run build
```

4. Run the project

```sh
yarn run dev
```

### API Documentation

The API Documentation can be found in the `localhost:3001/docs` directory after running the project

## Contribution

Feel free to contribute this project to your liking, just follow the existing convention
