FROM node:12 as builder

WORKDIR /ui

COPY . .

RUN npm install yarn && \
    yarn && \
    yarn build

FROM httpd:2.4-alpine

COPY --from=builder /ui /ui

# Copy UI over
RUN cp -rf /ui/build/* /usr/local/apache2/htdocs
RUN cp -f /ui/httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80/tcp
