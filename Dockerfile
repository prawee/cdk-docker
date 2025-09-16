FROM node:lts-alpine

WORKDIR /home/node

COPY package*.json ./
RUN npm ci --omit=dev --loglevel=verbose

COPY --chown=node:node . ./

USER node
RUN npm run build
RUN mv dist/* .

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]