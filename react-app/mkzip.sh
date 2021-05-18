# pushd ~/git/web-app-examples # set to absolute path
# NOTE must navigate to this directory to use this command

# package everything into a zip file
zip react-app.zip api/* data/* pages/* src/* test/* test-setup/* .babelrc.es5.json next.config.js package.json README.md styleguide.config.js webpack.config.js
# pushd -0 # only call if first line is called
