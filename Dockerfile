FROM node:lts-alpine

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci --omit=dev --loglevel=verbose

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]