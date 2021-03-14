<!-- 头部公用 -->
<template>
  <div class="">
    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <div class="headBox">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                     :router="true">
              <el-menu-item index="/Home"><i class="fa fa-wa fa-home"></i> Index</el-menu-item>
              <div class="userInfo">
                <div v-show="!haslogin" class="nologin">
                  <a href="javascript:void(0);" @click="logoinFun(1)">login&nbsp;</a>|<a href="javascript:void(0);"
                                                                                      @click="logoinFun(0)">&nbsp;reg</a>
                </div>
                <div v-show="haslogin" class="haslogin">
                  <i class="fa fa-fw fa-user-circle userImg"></i>
                  <ul class="haslogin-info">
                    <li>
                      <a href="#/UserInfo">User page</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" @click="userlogout">logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>



export default {
  data() {
    return {
      userInfo: '', //user info
      haslogin: false, //login state
      activeIndex: '/', //route selected
      state: '', //icon state
      input: '', //content input
    }
  },
  methods: {
    handleSelect(key, keyPath) { //path select
      //    console.log(key, keyPath);
    },
    logoinFun: function (msg) { //login and reg
      // console.log(msg);
      localStorage.setItem('logUrl', this.$route.fullPath);
      // console.log(666,this.$router.currentRoute.fullPath);
      if (msg == 0) {
        this.$router.push({
          path: '/Login?login=0'
        });
      } else {
        this.$router.push({
          path: '/Login?login=1'
        });
      }
    },
    // logout
    userlogout: function () {
      var that = this;
      this.$confirm('logout?', 'need attention', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        // console.log(that.$route.path);
        LoginOut(localStorage.getItem('accessToken'), function (result) {
          //    console.log(result);
          if (localStorage.getItem('userInfo')) {
            localStorage.removeItem('userInfo');
            that.haslogin = false;
            //    that.$router.replace({path:that.$route.fullPath});
            window.location.reload();
            that.$message({
              type: 'success',
              message: 'logout yes !'
            });
          }
          if (that.$route.path == '/UserInfo') {
            that.$router.push({
              path: '/'
            });
          }
        })
      }).catch(() => {
        //
      });

    },
    routeChange: function () {
      var that = this;
      that.pMenu = true
      this.activeIndex = this.$route.path == '/' ? '/Home' : this.$route.path;
      if (localStorage.getItem('userInfo')) { //store userinfo
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // console.log(that.userInfo);
      } else {
        that.haslogin = false;
      }
      if ((this.$route.name == "Share" || this.$route.name == "Home") && this.$store.state.keywords) {
        this.input = this.$store.state.keywords;
      } else {
        this.input = '';
        this.$store.state.keywords = '';
      }
    }
  },
  components: {

  },
  watch: {
    // if route change run this method
    '$route': 'routeChange'
  },
  created() {
    var that = this;

    that.routeChange();
  },
  mounted() {
    var that = this;
    var timer = setTimeout(function () {
      clearTimeout(timer);
    }, 500);
  }
}
</script>

<style>


.headBack {
  width: 100%;
  background: rgba(40, 42, 44, 0.6);
  /*margin-bottom:30px;*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
}



.headBox .userInfo {
  height: 100%;
  line-height: 38px;
  position: absolute;
  right: 30px;
  top: 0;
  color: #fff;
}

.headBox .userInfo a {
  color: #fff;
  font-size: 13px;
  transition: all 0.2s ease-out;
}

.headBox .userInfo a:hover {
  color: #48456C;
}

.headBox .nologin {
  text-align: right;
}

.headBox .haslogin {
  text-align: right;
  position: relative;
  min-width: 80px;
  cursor: pointer;
}

.headBox .haslogin:hover ul {
  visibility: visible;
  opacity: 1;
}

.headBox .haslogin ul {
  background: rgba(40, 42, 44, 0.6);
  padding: 5px 10px;
  position: absolute;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-out;
}

.headBox .haslogin ul li {
  border-bottom: 1px solid #48456C;
}

.headBox .haslogin ul li:last-child {
  border-bottom: 1px solid transparent;
}


.hideMenu ul.mlistmenu {
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
  background: #48456C;
  color: #fff;
  border-right: none;
}

.hideMenu .el-submenu .el-menu {
  background: #64609E;
}

.hideMenu .el-menu-item,
.hideMenu .el-submenu__title {
  color: #fff;
}

.hideMenu > i {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.hideMenu .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.mobileBox .searchBox {
  padding-left: 40px;
  width: 100%;
  box-sizing: border-box;
}

.mobileBox .searchBox .el-input__inner {
  display: block;
  border-radius: 2px;
  border: none;
  height: 25px;
}

.hideMenu ul.mlistmenu.pshow {
  display: block;
}

.hideMenu ul.mlistmenu .el-submenu__icon-arrow,
.mobileBox li.el-menu-item a {
  color: #fff;
}

.hideMenu > ul li.el-menu-item:hover,
.hideMenu > ul li.el-menu-item.is-active {
  background: #48576a;
}


.h-information img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  object-fit: cover;
}

.h-information img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.h-information h2 {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  /*font-family: 'Sigmar One';*/
}

.h-information h2 a {
  background: linear-gradient(to right, #DF2050, #48456D);
  -webkit-background-clip: text;
  color: transparent;
}

.headImgBox .scene {
  width: 100%;
  /*height:300px;*/
  text-align: center;
  font-size: 100px;
  font-weight: 200;
  color: #fff;
  position: absolute;
  left: 0;
  top: 160px;
  font-family: 'Sigmar One', Arial;
  text-shadow: 0 2px 2px #47456d;

}

.headImgBox .scene span {
  transform: matrix(1, 0, 0, 1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}

</style>
