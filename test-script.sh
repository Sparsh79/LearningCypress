#! /bin/bash

alias npm-exec='PATH=$(npm bin):$PATH'

echo npm-exec
npm-exec which cypress run
echo "will start the execution now"

# cd node_modules/.bin/cypress
# 
# node_modules/.bin/cypress run

pwd 