<!-- login -->
<template>
  <div>
    <div class="container">

      <!-- login and reg -->
      <div class="">
        <div v-if="login==1" class="loginBox">
          <div class="lr-title">
            <h1>login</h1>
            <p>
              new user<a href="#/Login?login=0" class="tcolors">login</a>
            </p>
          </div>
          <el-alert
            v-show="loginErr"
            :title="loginTitle"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="email"
            placeholder="email"
            v-model="email">
          </el-input>
          <el-alert
            v-show="emailErr"
            title="please enter email"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="password"
            @keyup.enter.native="loginEnterFun"
            v-model="password">
          </el-input>
          <el-alert
            v-show="passwordErr"
            title="please enter password"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <div class="lr-btn tcolors-bg" @click="gotoHome">enter</div>

        </div>
        <div v-else class="registerBox">
          <div class="lr-title">
            <h1>register</h1>
            <p>
              already have account<a href="#/Login?login=1" class="tcolors">login</a>
            </p>
          </div>
          <div class="otherLogin">
            <a href="http://localhost:3000"><i>microsoft account</i></a>
          </div>
          <el-alert
            v-show="registerErr"
            :title="registerTitle"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="text"
            placeholder="user name"
            v-model="nusername">
          </el-input>
          <el-alert
            v-show="nusernameErr"
            title="err user name"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="email"
            placeholder="email"
            v-model="nemail">
          </el-input>
          <el-alert
            v-show="nemailErr"
            title="err email"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="6-12 character, number and _"
            v-model="npassword">
          </el-input>
          <el-alert
            v-show="npasswordErr"
            title="wrong pass"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="verify password"
            @keyup.enter.native="registerEnterFun"
            v-model="npassword2">
          </el-input>
          <el-alert
            v-show="npassword2Err"
            title="wrong pass"
            type="error"
            show-icon :closable="false">
          </el-alert>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRegister, UserLogin} from '../utils/server.js'

export default {
  name: 'Login',
  data() { //选项 / 数据
    return {
      username: '',
      email: '',
      password: '',
      nusername: '',
      nemail: '',
      npassword: '',
      npassword2: '',
      login: 0,
      emailErr: false,
      passwordErr: false,
      loginErr: false,
      loginTitle: 'username or password err',
      nusernameErr: false,
      nemailErr: false,
      npasswordErr: false,
      npassword2Err: false,
      registerErr: false,
      registerTitle: 'have existed',
    }
  },
  methods: {
    routeChange: function () {
      var that = this;
      that.login = that.$route.query.login == undefined ? 1 : parseInt(that.$route.query.login);//get login

    },
    gotoHome: function () {//user login
      var that = this;
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var preg = /^(\w){6,12}$/;
      if (reg.test(that.email)) {
        that.emailErr = false;
      } else {
        that.emailErr = true;
      }
      if (that.password && preg.test(that.password)) {
        that.passwordErr = false;
      } else {
        that.passwordErr = true;
      }
      if (!that.emailErr && !that.passwordErr) {
        UserLogin(that.email, that.password, function (msg) {
          // console.log(msg);
          if (msg.code == 1010) {//succcess login
            localStorage.setItem('userInfo', JSON.stringify(msg.data));
            localStorage.setItem('accessToken', msg.token);
            if (localStorage.getItem('logUrl')) {
              that.$router.push({path: localStorage.getItem('logUrl')});
            } else {
              that.$router.push({path: '/'});
            }
          } else if (msg.code == 2008 || msg.code == 2007) {//wrong username or email
            that.loginErr = true;
            that.loginTitle = 'wrong username or email';
          } else {
            that.loginErr = true;
            that.loginTitle = 'fail to login';
          }
        })
      }
    },
    newRegister: function () {
      var that = this;
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var preg = /^(\w){6,12}$/;
      if (that.nusername) {
        that.nusernameErr = false;
      } else {
        that.nusernameErr = true;
      }
      if (reg.test(that.nemail)) {
        that.nemailErr = false;
      } else {
        that.nemailErr = true;
      }
      if (that.npassword && preg.test(that.npassword)) {
        that.npasswordErr = false;
        if (that.npassword == that.npassword2) {
          that.npassword2Err = false;
        } else {
          that.npassword2Err = true;
        }
      } else {
        that.npasswordErr = true;
      }
      if (!that.nusernameErr && !that.nemailErr && !that.npasswordErr) {

        getRegister(that.nusername, that.npassword, that.nemail, function (msg) {
          if (msg.code == 1010) {//reg success
            var timer = setTimeout(function () {
              clearTimeout(timer);
            }, 3000)
          } else {
            that.fullscreenLoading = false;
            that.registerErr = true;
            that.registerTitle = 'fail to reg';
          }
        })
      }
    },

  },
  components: {},
  watch: {

    '$route': 'routeChange'
  },
  created() {
    var that = this;
    that.routeChange();
  }
}
</script>

<style>

.loginBox, .registerBox {
  background: #fff;
  padding: 40px;
  max-width: 320px;
  margin: 0 auto;
}

.loginBox {
  padding-bottom: 0;
}

.lr-title {
  position: relative;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
}

.lr-title h1 {
  font-size: 24px;
  color: #666;
  font-weight: bold;
  /*width:50%;*/
}

.lr-title p {
  font-size: 12px;
  color: #999;
  position: absolute;
  right: 0;
  top: 0;
}

.lr-btn {
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
}

.loginBox .el-input, .registerBox .el-input {
  margin-bottom: 20px;
}

.loginBox .el-alert, .registerBox .el-alert {
  top: -18px;
  background-color: #888;
}

.loginBox .el-input input, .registerBox .el-input input {
  border-radius: 4px;
}

.loginBox h3, .registerBox h3 {
  text-align: right;
  margin-bottom: 20px;
}

.loginBox h3 a, .registerBox h3 a {
  font-size: 13px;
  color: #999;
}

.loginBox .otherLogin {
  max-width: 320px;
  padding: 30px 40px;
  background: #ddd;
  text-align: center;
  margin-left: -40px;
  margin-right: -40px;
  visibility: hidden;
}

.loginBox .otherLogin p {
  margin-bottom: 20px;
  font-size: 16px;
}

.loginBox .otherLogin a i {
  display: inline-block;
  width: 42px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  border-radius: 50%;
  color: #fff;
  margin: 0 10px;
}

.loginBox .otherLogin a i.fa-wechat {
  background: #7bc549;
}

.loginBox .otherLogin a i.fa-qq {
  background: #56b6e7;
}

.loginBox .otherLogin a i.fa-weibo {
  background: #ff763b;
}


.registerSuc .sucIcon {
  text-align: center;
  margin-bottom: 30px;
  padding-left: 60px;
}

.registerSuc .sucContent {
  line-height: 1.5;
  font-size: 15px;
  text-align: center;
}

.registerSuc .sucContent p {
  margin-top: 10px;
  font-size: 13px;
  color: #999;
}

.registerSuc .sucContent .lastbtn {
  display: inline-block;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.registerSuc .sucContent .el-icon-close {
  fong-size: 13px;
}
</style>
