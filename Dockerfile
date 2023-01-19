FROM node:14.17.0
WORKDIR /app
COPY package.json  /app
COPY package-lock.json  /app
RUN npm install
RUN apt-get update
RUN apt install lsb-release -y
RUN apt install curl -y
RUN curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/redis.list
RUN apt-get update -y
RUN apt-get install redis -y
RUN apt-get install redis-server -y
EXPOSE 3000
COPY . /app
CMD ["bash","run.sh"]