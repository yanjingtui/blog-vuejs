const express = require('express');
const app = express();


var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/blog',{
    auth: { "authSource": "admin" },//对应要连接数据库
    user: "admin",//对应数据库账号
    pass: "123456",//对应数据库密码
},async (err,res) => {
    if (err) {
        await console.log('连接mongoDb数据库失败')
    } else {
        await console.log('连接mongoDb数据库成功')
    }
})

var article = new mongoose.Schema({age: Number, name: String});
var ArticleList = mongoose.model('article', article);
var user

app.get('/', (res, req) => {
    req.send('Hello world');
});
app.listen(8083, () => {
    console.log('Server is running at http://localhost:8083')
})

// 对/news 页面进行get请求
app.get('article/ShowArticleAll', (res, req) => {
    ArticleList.find({title:/ti/},function (err, articles) {
        req.json(articles);
    })
});
// 对/about 页面进行post请求
app.post('about', (res, req) => {
    res.send('Hello about');
});
// 对/list* 可匹配 /list+任意字符
app.get('/list*', (res, req) => {
    res.send('Hello list pages');
})


