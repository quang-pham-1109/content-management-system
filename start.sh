#!/bin/bash

# Trap SIGINT and SIGTERM to ensure both processes are killed when the script exits
trap 'kill 0' SIGINT SIGTERM

# Function to start the Backend
start_go_server() {
  echo "Starting Go server..."
  cd server || exit
  nohup go run cmd/main.go > ../logs/server.log 2>&1 &  # Run in background and log output
  cd ..
}

# Function to start the Client
start_nuxt_client() {
  echo "Starting Nuxt.js client..."
  cd web || exit
  nohup yarn run dev > ../logs/client.log 2>&1 &  # Run in background and log output
  cd ..
}

# Create logs directory if it doesn't exist
mkdir -p logs
# Start both the Go server and Nuxt client
start_go_server
start_nuxt_client

echo "Both server and client are running in the background. Logs: logs/server.log and logs/client.log"

# Wait for both processes to complete
wait
