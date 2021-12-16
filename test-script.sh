PATH=$(npm bin):$PATH

alias npm-exec='PATH=$(npm bin):$PATH'

npm-exec/cypress run
echo "will start the execution now"

# cd node_modules/.bin/cypress
# 
# node_modules/.bin/cypress run