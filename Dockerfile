
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM busybox:1.35.0-uclibc
COPY --from=build /app/dist /www
EXPOSE 80
CMD httpd -f -p 80 -h /www

