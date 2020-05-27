# 个人blog前端（personal blog font-end）
博客地址: [http://blog.masongzhi.cn](http://blog.masongzhi.cn)

使用create_react_app构建，配合ant-design使用

this appliation install by create-react-app with react-app-rewired (ant-design)

to run this appliation, you can install and run [back-end appliation](https://github.com/masongzhi/self_koa_blog)

# installation
```bash
# install
npm install

# development
npm start

# build
npm run build

# push docker image
make prod

##### docker deploy
docker run --name blog -d masongzhi/blog:prod
```
