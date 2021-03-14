<!-- user center -->
<template>
    <div>
        <wbc-nav></wbc-nav>
        <div class="container">
            <div v-show="isEdit" class="tcommonBox">
                <header>
                    <h1>
                            edit user info
                    </h1>
                </header>
                <section>
                    <ul class="userInfoBox">
                        <li class="username">
                            <span class="leftTitle">user name</span>
                            <el-input v-model="userInfoObj.username" placeholder="name"></el-input> <i  class="fa fa-wa fa-asterisk"></i>
                        </li>
                        <li>
                            <span class="leftTitle">email</span>
                            <span>{{userInfoObj.email}}</span>
                        </li>
                    </ul>
                    <div class=" saveInfobtn">
                        <a class="tcolors-bg"  href="javascript:void(0);" @click="isEdit=!isEdit">back</a>
                        <a class="tcolors-bg" href="javascript:void(0);" @click="saveInfoFun">enter</a>
                    </div>
                </section>
            </div>
            <div v-show="!isEdit" class="tcommonBox">
                <header>
                    <h1>
                            user center
                        <span class="gotoEdit" @click="isEdit=!isEdit"><i class="fa fa-wa fa-edit"></i>edit</span>
                    </h1>

                </header>
                <section>
                    <ul class="userInfoBox">
                        <li class="username">
                            <span class="leftTitle">name</span>
                            <span>{{userInfoObj.username?userInfoObj.username:"null"}}</span>

                        </li>
                        <li>
                            <span class="leftTitle">email</span>
                            <span>{{userInfoObj.email?userInfoObj.email:"null"}}</span>
                        </li>
                    </ul>

                </section>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../components/header.vue'
import {getUserInfo,UserInfoSave} from '../utils/server.js'//get and save user info
    export default {
        name: 'UserInfo',
        data() {
            return {
                isEdit: false,
                userInfo:'',
                userInfoObj:'',
            }
        },
        methods: {

            saveInfoFun: function(){//save
                var that = this;

                if(!that.userInfoObj.username){
                     that.$message.error('you should enter name');
                     return;
                }

                UserInfoSave(that.userInfoObj,function(result){//save and go back
                    that.$message.success( 'success save！');
                    that.isEdit = false;
                    that.routeChange() ;
                })

            },
            routeChange: function(){//to userinfo
                var that = this;
                // console.log(this.$router,this.$route);
                if(localStorage.getItem('userInfo')){
                    that.haslogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.userId = that.userInfo.userId;
                    getUserInfo(that.userId,function(msg){
                        that.userInfoObj = msg.data;
                        that.userInfoObj.head_start = 0;
                        that.userInfoObj.logo_start = 0;
                    })
                }else{
                    that.haslogin = false;
                }

            }
        },
        components: {
            'wbc-nav':header,
        },
        watch: {

           '$route':'routeChange'
         },
        created() {
            this.routeChange();
        }
    }
</script>

<style>

.gotoEdit{
    font-size: 15px;
    float:right;
    cursor: pointer;
    color:#999;
}
.gotoEdit:hover {
    color:#333;
}

.userInfoBox .leftTitle{
    display: inline-block;
    width:100px;
    padding: 10px 0;
}
.userInfoBox .rightInner{
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
}
.userInfoBox li{
    padding:20px;
    border-bottom: 1px solid #ddd;
}
.userInfoBox li:last-child{
    border-bottom: 1px solid transparent;
}
.userInfoBox  .el-input,.userInfoBox  .el-textarea{
    max-width:300px;
    min-width: 100px;
}

.userInfoBox .el-input__inner{
    border-radius: 4px;
}
.userInfoBox  .el-textarea{
    vertical-align: top;
}
.saveInfobtn{
    margin: 20px 0;
    text-align: center;
}
.saveInfobtn a{
    color:#fff;
    padding:6px 20px;
    margin:5px 10px;
    border-radius: 5px;
    font-size: 14px;
}
.userInfoBox .fa-asterisk{
    color: #DF2050;
}
</style>
