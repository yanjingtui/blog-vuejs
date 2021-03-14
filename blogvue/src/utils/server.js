import Vue from 'vue'
import axios from 'axios'
//public path

let portUrl = "http://"+window.location.host+"/port/";

//user reg
const getRegister = (username,password,email,callback) =>{
    let url = portUrl+'login/getRegister?username='+username+'&email='+email+'&password='+password;
    axios.get(url).then(num => {
            callback && callback(num.data)
    })
}

//user login
const UserLogin =  (email,password,callback) =>{
    let url = portUrl + 'login/UserLogin?email='+email+'&password='+password;
    axios.get(url).then(num => {
            callback && callback(num.data);
    })
}
//user quit
const LoginOut = (token,callback) =>{
    let url = portUrl + 'login/LoginOut?token='+token;
    axios.get(url).then(num => {
            callback && callback(num.data);
    })
}

/*//login Azure
const config = {
  auth: {
    clientId: "f71b09e2-b4e6-4489-b059-51cbf8148ed3",
    authority: "https://login.microsoftonline.com/common",
    clientSecret: "_n1M833eZtL46~uecrx1df~ou1.X8f8-~a"
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    }
  }
};
const REDIRECT_URI = "http://localhost:3000/redirect";
const msal = require('@azure/msal-node');


app.get('/microsoft', (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  // get url to sign user in and consent to scopes needed for application
  pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    res.redirect(response);
  }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  pca.acquireTokenByCode(tokenRequest).then((response) => {
    console.log("\nResponse: \n:", response);
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});*/


//find article list
const ShowArticleAll = (artId,cateId,articleName,level,callback) =>{
    if(level == 1){
        var url = portUrl + 'nav/ActiveClassAllData?art_id='+artId+'&article_name='+articleName;
    }else{
        var url = portUrl + 'article/ShowArticleAll?art_id='+artId+'&article_name='+articleName;
    }
    axios.get(url).then(num => {
            callback && callback(num.data);
    })
}

//find article content
const getArticleInfo = (artId,userId,callback) =>{
    let url = portUrl + 'article/getArticleInfo?art_id='+artId+'&user_id='+userId;
    axios.get(url).then(num => {
        if(num.data.code==1001){
            callback && callback(num.data.data);
        }else{
            alert("fail");
        }
    })
}


//find user info
const getUserInfo = (userId,callback)=>{
    let url = portUrl + 'Userinfo/getUserInfo?user_id='+userId;
    axios.get(url).then(num => {
        if(num.data.code==1001){
            callback && callback(num.data);
        }else{
            alert("fail to find");
        }
    })
}
//change user info
const UserInfoSave = (obj,callback) =>{
    let url = portUrl + 'Userinfo/UserInfoSave';
    var data = {
        'username':obj.username,
        'type':obj.type
    };
    // console.log(data);
    axios.get(url,{params:data}).then(num => {
        if(num.data.code==1001){
            callback && callback(num.data.msg);
        }else{
            alert("fail to modify");
        }
    })
}




export {
        getRegister,
        UserLogin,
        LoginOut,
        ShowArticleAll,
        getArticleInfo,
        getUserInfo,
        UserInfoSave,
    }
