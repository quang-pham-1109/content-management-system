# CMS

This is a Content Management System (CMS), set up as a monorepo managed by [Turborepo](https://turbo.build/repo).

## Architecture

The project is split into two main parts:

1. **Frontend**:  
   The frontend of this CMS is built using [Next.js](https://nextjs.`org/), a powerful React.js framework for building modern, server-side rendered, and statically generated applications.

2. **Backend**:  
   The backend is written in [TypeScript](https://www.typescriptlang.org/) and built with [Express.js](https://expressjs.com/). It uses [Prisma](https://www.prisma.io/) as the ORM to interact with the database, providing a type-safe and developer-friendly interface.

## Getting Started

To get started, clone the repository. For detailed setup instructions for individual modules, check the respective `/web` (frontend) and `/server` (backend) directories.

## Starting the Project

The monorepo is managed with Turborepo. To start the project, simply run the following command from the root directory:

```bash
npm run dev
```

This command will start both the frontend and backend concurrently.  

## Development

We use [DevPod](https://devpod.sh/) to standardize the development environment. DevPod uses [Docker](https://www.docker.com/) to spin up a development instance based on the `.devcontainer.json` file, ensuring consistency across local development and deployment environments.

The same configuration used for development is also utilized in deployment, streamlining the process.