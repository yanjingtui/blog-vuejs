<!-- article list -->
<template>
    <el-row class="sharelistBox">
        <div v-if="this.$route.name=='Share'&&!this.$route.query.keywords" class="shareTitle">
            <div class="ui label" >
                <a  :href="'#/Share?classId='+classId">{{className}}</a>
            </div>
            <ul v-if="sonclassList" class="shareclassTwo" >
                <li v-for="(citem,index) in sonclassList">
                    <a :href="'#/Share?classId='+classId+'&classtwoId='+citem.class_id" :class="citem.class_id==classtwoId?'active':''">{{citem.cate_name}}</a>
                </li>
            </ul>
        </div>
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <header>
                <h1>
                    <a :href="'#/DetailShare?aid='+item.id" target="_blank">
                        {{item.title}}
                    </a>
                </h1>
            </header>
            <div class="article-content">
                <p style="text-indent:2em;">
                    {{item.description}}
                </p>
                <p  style="max-height:300px;overflow:hidden;text-align:center;">
                    <img :src="item.image" alt="" class="maxW">
                </p>
            </div>
            <div class="viewdetail">
                <a class="tcolors-bg" :href="'#/DetailShare?aid='+item.id" target="_blank">
                    Read more...>>
                </a>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {ShowArticleAll} from '../utils/server.js'
    export default {
        name:'Share',
        data() {
            return {
                artId:0,
                hasMore:true,
                articleList:'',
            }
        },

        methods: {
            showSearchShowList:function(initpage){
                var that = this;
                that.classId = (that.$route.query.classId==undefined?0:parseInt(that.$route.query.classId));//获取传参的classId
                //init article start 0
                that.artId = initpage ? 0 : that.artId;
                ShowArticleAll(that.artId,that.sendId,that.keywords,that.level,(result)=>{
                    // console.log(result);
                    if(result.code==1001){
                        var msg = result.data;
                        if(msg.length>0&&msg.length<10){
                            that.hasMore = false
                        }else{
                            that.hasMore = true;
                        }
                        that.articleList = initpage ? msg : that.articleList.concat(msg);
                        that.artId = msg[msg.length-1].id;
                        // console.log(that.artId);
                    }else{
                        that.hasMore = false;
                        that.articleList = initpage ? [] : that.articleList;
                    }
                })
            },

            routeChange:function(){
                var that = this;
                this.showSearchShowList(true);
            }
        },
        components: {

        },
        watch: {
           '$route':'routeChange',
           '$store.state.keywords':'routeChange'
         },
        created() {
            var that = this;
            that.routeChange();
        }
    }
</script>

<style>
/*title*/
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/*list of share*/
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }


</style>
