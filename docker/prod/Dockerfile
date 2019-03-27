FROM masongzhi/blog-base as clientBuild
WORKDIR /app
COPY . .
RUN yarn build

# 需要的资源加入镜像
FROM nginx:latest
WORKDIR /app
COPY --from=clientBuild /app/build/ /usr/share/nginx/html/
COPY --from=clientBuild /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=clientBuild /app/nginx/mime.types /etc/nginx/mime.types

EXPOSE 9010
