FROM node:lts-hydrogen as development

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

EXPOSE 5173


