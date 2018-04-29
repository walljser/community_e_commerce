## 云生活超市
使用React Native开发的原生app：react native + react-navigation + redux + native-base + axios
##### (项目迭代滚动中，如果有喜欢这个的小哥哥小姐姐，送我一个start，谢谢！如果您有什么建议修改之类的，请疯狂的pull request or create issue.)

### 技术栈
1. react @16.0.0
2. react-navigation @1.5.2
3. redux
4. native-base
5. axios
7. es6 + babel

使用了create-react-native-app搭建项目。 服务器端是用springboot+mybatis搭建的，仓库地址：[服务器端代码](https://github.com/dekvos123/backend_cloud_commodity)

俗话说有App就得有管理系统，云生活超市配了一个后台，也是用react写的，有兴趣的朋友可以去看一下，或者cloen下来玩一下，app端和后台系统共用一套api接口，运行起来很方便：[云生活后台管理系统](https://github.com/dekvos123/cms_community_e_commerce)

### 环境
* 由于项目大量使用 ***es6/7*** 等新特性，建议您使用 ***node*** 最新LTS版本
* 我自己使用ubuntu16.04，建议在linux或者mac os系统下运行

### 项目启动
1. ***首先你可以安装一下yarn，并使用taobao registry***
```bash
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
2. ***克隆项目并安装环境***
```bash
git clone https://github.com/dekvos123/community_e_commerce.git
cd community_e_commerce
yarn
```
3. ***直接运行***
```bash
npm start
```
4. bash会出现一个二维码，使用 ***expo*** 快速体验。 ***注意*** : 手机和电脑必须在同一网段才能正常运行。

### 目录结构介绍
```  
***├── src                                 // 源码目录 ***  
***│   ├── components                      // 一些可复用的组件 ***  
***│   ├── screens                         // 页面（容器） ***
***│   ├── constants                       // 项目全局配置 ***  
***│   ├── services                        // 服务器端接口数据映射 ***  
***│   ├── reducers                        // reducers ***  
***│   ├── actions                         // actions ***  
***│   ├── utils                           // 封装的一些常用工具 ***  
***│   ├── Routes.js                       // react-navigation路由配置 ***
***├── App.js                              // 程序入口文件，加载各种公共组件 ***  
***├── .babelrc                            // babel配置文件 ***  
```
