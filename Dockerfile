# Dockerfile
FROM node:22-alpine

WORKDIR /usr/src/app

# Instalacja nodemon globalnie
RUN npm install -g nodemon

# Kopiowanie plików package.json i instalacja zależności
COPY package*.json ./
RUN npm install

# Kopiowanie pozostałych plików projektu
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
