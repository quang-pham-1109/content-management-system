#!/bin/bash

# This script is used to run e2e test for the server
# Run e2e tests
echo "Running e2e server tests..."

cd server/e2e

# Run tests
bru run --env local