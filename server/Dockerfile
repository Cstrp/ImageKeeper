FROM node:lts-hydrogen as develomepnt

WORKDIR /src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

RUN pnpm prisma generate

EXPOSE 3000

