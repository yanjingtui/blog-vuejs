<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
// 原博客主提色
@tcolors: #c2fd97;//button color
@tcolorm: #ee3f4d;// selected color
@tcolord:#48456D; //hover button


/*reset*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
 caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
}
body{
  font-family:Arial,"STHeiti", Helvetica, sans-serif;
  background:#efefef;
  font-size:14px;
  color:#444!important;
  min-height:100vh;
  width:100%;
  overflow-x: hidden;
  -webkit-overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}

table{
  border-collapse:collapse;
  border-spacing:0
}
fieldset, img{
  border:0
}
legend{
  display:none
}
// address, caption, cite, code, dfn, em, strong, th, var{
//   font-style:normal;
//   font-weight:normal
// }
ol, ul{
  list-style:none
}
caption, th{
  text-align:left
}
h1, h2, h3, h4, h5, h6{
  font-size:100%;
  font-weight:normal
}
q:before, q:after{
  content:''
}
abbr, acronym{
  border:0
}
a{
     text-decoration:none;
}
html{-webkit-text-size-adjust:none;width:100%;height:100% } /*????iphone??safari????????????*/
input[type="text"], input[type="button"], input[type="submit"], input[type="search"]{
  -webkit-appearance:none;
  border-radius:0;
}
/*************其他内容*************/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  overflow-x: hidden;
  -webkit-overflow-x: hidden;
  color: #444;
}

h1, h2 {
  font-weight: normal;
}
a {
  color: #444;
}
.container{
    max-width: 80%;
    margin:0 auto;
    padding:0 10px;
    // overflow-x: hidden;
    // -webkit-overflow-x: hidden;
}
//title
.s-round-date{
    position: absolute;
    top:-20px;
    left:-35px;
    height:60px;
    width:70px;
    padding-top:10px;
    border-radius: 100px;
    color:#fff;
    background: @tcolors;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}
.s-round-date span{
    text-align: center;
    display: block;
}
.s-round-date .day{
    font-size: 30px;
    font-weight: 700;
}
// second title
.tcommonBox{
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    position: relative;
    background: #fff;
    padding:15px;
    border-radius: 5px;
    margin-bottom: 40px;
    font-size: 15px;
}
.tcommonBox header{
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}
.tcommonBox  header h1{
    margin: 10px 0;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
}
.tcommonBox header h2{
    margin:10px 0;
    line-height: 24px;
    text-align: center;
    color:#555;
    font-size: 14px;
}
.tcommonBox section p{
    line-height: 24px;
    margin:10px 0;
}
.tcommonBox  header h2 .el-rate,.rateBox{
    display:inline-block;
}
.tcommonBox  header h2 .el-rate i{
    font-size: 16px;
}
.s-item .article-coontent{
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}
//title and button
.s-item .article-content p{
    margin:10px 0;
    line-height:24px;
}
.s-item .viewdetail{
    margin:10px 0 ;
    line-height: 24px;
    text-align: center;
}
.s-item .viewdetail a{
    color:#fff;
    font-size: 12px;
    padding:5px 10px;
    border-radius: 5px;
}

 .viewmore{
    text-align: center;
    width:100%;
}
 .viewmore a{
    /*background:  #97dffd;*/
    /*padding:6px 0;*/
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    color:#fff;
    height:30px;
    line-height: 30px;
    display: block;
}



.tcolors{
    color:@tcolors;
}
.tcolorm{
    color:@tcolorm;
}
.tcolord{
    color:@tcolord;
}
.tcolors-bg{
    background: @tcolors;
    transition: all .3s ease-in-out;
}
.tcolord-bg{
    background: @tcolord;
}
.tcolors-bg:hover{
    background: @tcolord;
}

.paginationBox li.active{
    background: @tcolorm;
}
.paginationBox li:hover{
    color:@tcolord;
}
.el-pagination button:hover{
    color:@tcolord;
}


.fitImg{
    width:100%;
    height:100%;
    object-fit: cover;
}
.maxW{
    max-width: 100%;
}
.fwb{
    font-weight:bold;
}
.right{
    float:right;
}
.left{
    float:left;
}
.btnone {
    border-top: none!important;
}
.brone {
    border-right: medium none !important;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.smalltitle{
    /*height:36px;*/
    /*line-height: 36px;*/
}

.logoImg{
    width:160px;;
    height:50px;
    display: inline-block;
    padding:5px 5px;
    vertical-align: top;
}

.logoImg img{
    width:100%;
    height:100%;
}

//public label
.ui.label{
    border-color:@tcolors;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    background-color: #97dffd;
    margin:5px 0 15px 2px;
    font-size: 14px;
    position: relative;
    left:-32px;
    border-radius: 0 4px 4px 0;
    padding:7px 11.2px 7px 32px;
    display: inline-block;
    color:#fff;
}
.ui.label::after{
    position: absolute;
    content: '';
    top:100%;
    left:0;
    border-top: 0 solid transparent;
    border-right-width:1em;
    border-right-color:@tcolord;
    border-right-style:solid;
    border-bottom: 1em solid transparent;
    border-left: 0 solid transparent;
    width:0;
    height:0;
}
.ui.label a{
    color:#fff;
    line-height: 100%;
}

</style>
