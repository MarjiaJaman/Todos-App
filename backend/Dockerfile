FROM node:18-alpine

WORKDIR /app

# copy package files first for caching
COPY package*.json ./

# install all deps (including sequelize-cli so migrations can run)
RUN npm install --production=false --silent

# copy app source
COPY . .

# make entrypoint executable
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["./docker-entrypoint.sh"]