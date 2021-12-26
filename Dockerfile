FROM nginx:1.21.4

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build      /usr/share/nginx/html
