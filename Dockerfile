# Use an Official Node runtime as parent image
FROM node:8.11.3

# Set the work directory
WORKDIR /ExpressSS

# add `/SpecificallySports/node_modules/.bin` to $PATH
ENV PATH /ExpressSS/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /ExpressSS/package.json
RUN npm install -s

# Copy app over to working directory
COPY . /ExpressSS

# start app
CMD ["npm", "run", "start"]
