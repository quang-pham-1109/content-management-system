# CMS

This is a Content Management System (CMS), setting up as a monorepo.

## Architecture

The project is split into two main parts:

1. **Frontend**: The frontend of this CMS is built using [Nuxt.js](https://nuxtjs.org/), a powerful Vue.js framework that is used for building server-side rendered applications.

2. **Backend**: The backend is written in [Go](https://golang.org/), a statically typed, compiled language that is efficient and reliable for building web servers.

## Getting Started

You can get started by cloning the repo, for the full instruction on how to setup the individual modules, please find them in the respective `/web` and `/server` directories

## Development

We use [DevPod](https://devpod.sh/) to standardise the dev enviroment for devs. DevPod would use [Docker](https://www.docker.com/) to spin up an instance based on `.devcontainer.json` , and you'd be able to dev inside this enviroment.

This config would be the same one as the one used in deployment.
