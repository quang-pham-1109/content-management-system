# Server

This is the backend of the CMS, written in Go.

## Getting started

```
cd server
```

Download all the Go depedencies

```
go mod tidy
```

Run the server

```
go run main.go
```

## Development

If you are looking to develop with this server, please download [air](https://github.com/air-verse/air) it will refresh the server everytime there is any changes.

But this shouldn't be required for deployment

## Testing

We use [Bruno](https://www.usebruno.com/) to e2e test our API, it's a very neat CLI API testing tool that doesn't require any credentials and can work normally with a traditional version control, you can visit `server/e2e` to understand more about the API

To run this up locally, please check the `.env.example` file and create one accordingly.

To run all the e2e scripts

```
cd server/e2e

bru run --env local
```
