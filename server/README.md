## Server

This is the backend of the CMS, written in Go.

## Getting started

This project uses go version 1.26 so please get the exact version. Run these commands to setup

```
cd server
```

```
go mod download
```

Run the server

```
go run main.go
```

## Development

If you are looking to develop with this server, please download [air](https://github.com/air-verse/air) it will refresh the server everytime there is any changes.

## Testing

We use [Bruno](https://www.usebruno.com/) to e2e test our API, it's a very neat CLI API testing tool that doesn't require any credentials and can work normally with a traditional version control
