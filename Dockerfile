FROM node:alpine3.19

WORKDIR /app

COPY . . 

COPY package*.json /

RUN npm install
#port

EXPOSE 3000

ENV HF_ACCESS_TOKEN=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

#build 
RUN npm run build

# Run the Next.js app in production mode
CMD npm run start

