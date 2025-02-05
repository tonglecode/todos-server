FROM node:20

# 디렉터리 생성
WORKDIR /user/src/app

# 앱 의존성

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# 앱 자원
COPY . .
COPY .env.prod .env

RUN yarn build

ENV NODE_ENV=production
EXPOSE 8080

USER node

CMD ["node", "dist/index.js"]