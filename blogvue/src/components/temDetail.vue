<!-- 文章详情模块 -->
<template>
        <div class="detailBox tcommonBox" >
            <header>
                <h1>
                    <a :href="'#/DetailShare?aid='+detailObj.id" target="_blank">
                        {{detailObj.title}}
                    </a>
                </h1>
            </header>
            <div class="article-content" v-html="detailObj.content"></div>
            <div class="dshareBox bdsharebuttonbox"  data-tag="share_1">
                分享到:
                <a href="javascript:void(0);" class="ds-weibo fa fa-fw fa-weibo" data-cmd="tsina" ></a>
                <a href="javascript:void(0);" class="ds-qq fa fa-fw fa-qq" data-cmd="tqq"></a>
                <a href="javascript:void(0);" class="ds-wechat fa fa-fw fa-wechat" data-cmd="weixin"></a>
            </div>

        </div>
</template>

<script>
import {getArticleInfo,getArtLikeCollect,initDate} from '../utils/server.js'
    export default {
        data() {
            return {
                aid:'',//id article
                detailObj:'',//detail article
                haslogin:false,//login state
                userId:'',//user id
            }
        },
        methods: {
            routeChange:function(){
                var that = this;
                that.aid = that.$route.query.aid==undefined?1:parseInt(that.$route.query.aid);//get id
                //if user existe
                if(localStorage.getItem('userInfo')){
                    that.haslogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.userId = that.userInfo.userId;
                    // console.log(that.userInfo);
                }else{
                    that.haslogin = false;
                }
                //get detail
                getArticleInfo(that.aid,that.userId,function(msg){
                    that.detailObj = msg;

                })
            }
        },
        watch: {
           // if route change
           '$route':'routeChange'
         },
        created() { //生命周期函数
            var that = this;

            that.routeChange();
        },

    }
</script>

<style lang="less">

.detailBox .article-content{
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: hidden;
}
.detailBox .article-content p{
    margin:10px 0;
    line-height:24px;
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: hidden;
}
.detailBox .article-content pre{
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: hidden;
}
.detailBox .article-content img{
    max-width: 100%!important;
    height: auto!important;
    overflow-x: hidden;
}
.detailBox .article-content a{
    color:#df2050!important;
}
.detailBox .article-content a:hover{
    text-decoration: underline;
    color: #f00!important;
}
.detailBox .article-content i{
    font-style: italic;
}
.detailBox .article-content strong{
    font-weight: bold;
}
.detailBox .article-content ul{
    list-style-type: disc!important;
    list-style: disc!important;
    padding-left: 40px!important;
    li{
        list-style-type: disc!important;
        list-style: disc!important;
    }
}
.detailBox .article-content h1, .detailBox .article-content h2, .detailBox .article-content h3{
    font-size: 200%;
    font-weight: bold;
}
 .detailBox .article-content h4, .detailBox .article-content h5, .detailBox .article-content h6{
    font-size: 150%;
    font-weight: bold;
}
.detailBox .viewdetail{
    margin:10px 0 ;
    line-height: 24px;
    text-align: center;
}
/*分享图标*/
.dshareBox {
    margin-top:40px;
    position: relative;
}
.dshareBox a{
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 18px;
    border-radius: 50%;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    margin: 4px;
    background: #fff;
    transition: background 0.6s ease-out;
}
.dshareBox .ds-weibo{
    border: 1px solid #ff763b;
    color: #ff763b;
}
.dshareBox .ds-weibo:hover{
    color: #fff;
    background: #ff763b;
}
.dshareBox .ds-qq{
    color: #56b6e7;
    border: 1px solid #56b6e7;
}
.dshareBox .ds-qq:hover{
    color: #fff;
    background: #56b6e7;
}
.dshareBox .ds-wechat{
    color: #7bc549;
    border: 1px solid #7bc549;
}
.dshareBox .ds-wechat:hover{
    color: #fff;
    background: #7bc549;
}
.dshareBox .ds-wechat:hover .wechatShare{
    opacity: 1;
    visibility: visible;
}
.detailBox .bdshare-button-style0-32 a{
    float:none;
    background-image: none;
    text-indent: inherit;
}

</style>
