#!/bin/bash

# Run e2e tests
echo "Running e2e server tests..."

cd server/e2e

# Run tests
bru run --env local