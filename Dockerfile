# Use latest node version 8.x
FROM node:9.11.2-alpine

RUN npm install -g pm2
# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
#RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/

#RUN yarn lint
# expose port 9000
EXPOSE 9001

# cmd to start service
CMD [ "node", "index.js" ]
