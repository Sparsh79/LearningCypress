#! /bin/sh
echo "will start the execution now"

# cd node_modules/.bin/cypress
# 
# node_modules/.bin/cypress run

pwd 

npm start & wait-on http://localhost:8080

cypress run

npm run-script testheadless
# cd cypressgit/node_modules/cypress run

# ${npm bin}/cypress run