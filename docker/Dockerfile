FROM node:lts
WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get install -y ruby-full && \
    gem install bundler && \
    bundle install && \
    npm install && \
    npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD npm start