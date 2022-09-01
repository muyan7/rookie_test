// 132创建mock模拟数据，安装mockjs，创建mock文件夹，准备需要的json数据，文件不能留用空格。
// 132.1把mock里面需要的数据放入public文件夹中（dist打包文件所需路径）
// 132.2开始mock模拟数据，创建mockServe.js来实现。
//132.3先引入mockjs模块
import Mock from 'mockjs';
//132.4把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、JSON数据格式。js文件就需要对外暴露。
import banner from './banner.json';
import floor from './floor.json';

//132.5mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大的轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor});//模拟底部的小轮播图。
//132.6把mockServe.js放入入口文件中引入才能执行