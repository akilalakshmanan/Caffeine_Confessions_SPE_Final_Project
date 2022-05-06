FROM node:18-alpine3.14
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install --force
RUN npm install -g serve
COPY . /usr/src/app
EXPOSE 3000
RUN npm run build
CMD ["serve","build"]