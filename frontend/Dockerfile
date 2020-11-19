FROM node:10

# Create app directory for Real World React example app
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory.
WORKDIR /usr/src/app

# Copy the package.json file into our app directory
COPY . /usr/src/app/

# Install any needed packages specified in package.json
RUN yarn install

RUN ls /usr/src/app
RUN ls /usr/src/app/public

EXPOSE 3000
RUN yarn global add serve
RUN yarn build 
CMD serve -s build -l 3000