FROM node:8 as builder

WORKDIR /project/ui

COPY . /ui

WORKDIR /ui
RUN npm install \
    && npm run build

FROM httpd:2.4-alpine

COPY --from=builder /ui /ui

# Remove default index.html
RUN rm /usr/local/apache2/htdocs/index.html

# Copy UI over
RUN cp -rf /ui/public/* /usr/local/apache2/htdocs
RUN cp -f /ui/httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80/tcp
