import axios from "axios";
import router from "../router";
// import api from '../services/api'
const BaseUrl = require('../../config/config')
import { MessageBox, Message } from "element-ui";
import Vue from 'vue';
let v = new Vue();
let service = axios.create({
  // timeout: 5000,
  baseURL: BaseUrl.PROFILE !== 'DEV' ? BaseUrl.URL : BaseUrl.ROOT,
});
// service.interceptors.request.use(function (config) {
//   if (Object.prototype.hasOwnProperty.call(sessionStorage, "token")) {
//     config.headers['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem('token')).access_token
//   }
//   return config
// })
service.interceptors.response.use(
  (response) => {
    if (response.request.responseType === "blob") {
      let flag = true
      let fileReader = new FileReader();
      fileReader.onload = function () {
        try {
          let jsonData = JSON.parse(this.result);  // 说明是普通对象数据，后台转换失败
          if (jsonData.code) {
            MessageBox({
              title: '提示',
              message: jsonData.message,
              duration: 3000,
              type: 'error'
            });
            flag = true
          }
        } catch (err) {   // 解析成对象失败，说明是正常的文件流
          flag = true
        }
      };
      fileReader.readAsText(response.data)
      if (flag) {
        return response;
      }
      // if(response.data.code === 0) {
      //   return response;
      // } else {
      //   v.$Message.warning({
      //     content: response.data.code,
      //     duration: 3
      //   });
      // }

    } else {
      const res = response.data;
      if (res.code !== 0 && res.code !== 7405 && 
        response.config.url != "/bill/rent/verification" 
        && !response.config.url.includes("/bill/rent/batchVerification")) {
        setTimeout(() => {
          MessageBox({
            title: '提示',
            message: res.message,
            center: true,
            dangerouslyUseHTMLString: true,
            type: "warning",
            customClass: 'message-zindex',
          });
        }, 0)
      }
      return Promise.resolve(res);
    }

  },
  (error) => {
    if (
      error.response.status === 401 ||
      error.response.data.error == "Access Denied" ||
      error.response.data.error == "Forbidden"
    ) {
      if (BaseUrl.PROFILE === 'PRD') {
        window.location.href = BaseUrl.REDIRECT_URL;
        console.log('cas');
      } else {
        Message({
          title: '提示',
          message: error.message,
          center: true,
          type: "warning",
        });
        router.push("/login");
      }
      // api.getUser().then((res) => {
      //   if (res.code === 0) {
      //     sessionStorage.setItem(
      //       "username",
      //       JSON.stringify(res.result.username)
      //     );
      //   } else if (res.code === 401) {
      //     window.location.href = res.result;
      //   }
      // })

    } else if (error.response.status === 403) {
      if (BaseUrl.PROFILE === 'PRD') {
        window.location.href = BaseUrl.REDIRECT_URL;
        console.log('cas');
      } else {
        Message({
          title: '提示',
          message: error.message,
          center: true,
          type: "warning",
        });
        router.push("/login");
      }
      // router.push('/error')
    } else if (error.response.status === 500) {
      Message({
        title: '提示',
        message: '请求失败！请稍后再试或联系管理员',
        center: true,
        type: "error",
      });
    } else {
      Message({
        title: '提示',
        message: error.message,
        center: true,
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

class Service {
  Get (url, data = {}) {
    return service({
      url: url,
      method: "get",
      params: data,
    });
  }

  Post (url, data = {}, params = {}) {
    return service({
      url: url,
      method: "post",
      data: data,
      params: params
    });
  }

  Put (url, data = {}) {
    return service({
      url: url,
      method: "put",
      data: data,
    });
  }

  Delete (url, data = {}) {
    return service({
      url: url,
      method: "delete",
      data: data,
    });
  }
  GetFileImg (url, params) {
    return new Promise((resolve, reject) => {
      return service({
        url: url,
        method: 'get',
        responseType: 'blob',
        params: params,
      }).then(response => {
        const content = response.data;
        resolve(window.URL.createObjectURL(content))
        // resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
  fetFile (url, method = "get", params = {}, data = {}) {

    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: method,
        params: params,
        data: data,
        responseType: "blob",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => {
          resolve();
          if (res) {
            console.log(res);
            console.log(params.fileName, 'filename');
            let fileName = params.fileName
            var blob = res.data;
            if (window.navigator.msSaveBlob) {
              try {
                window.navigator.msSaveBlob(blob, fileName)
              } catch (e) {
                console.log(e);
              }
            } else {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = function (e) {
                if ("download" in document.createElement("a")) {
                  var a = document.createElement("a");
                  a.download = fileName;
                  a.href = e.target.result;
                  a.click();
                } else {
                  navigator.msSaveBlob(blob, fileName)
                }
                resolve();
              };
            }
          } else {
            reject();
          }
        })
        .catch(err => {
          reject(err);
        })
    })
  }
  exportFile (url, method = "get", params = {}, data) {
    let loading = v.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.7)",
    });
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: method,
        params: params,
        data: data,
        responseType: "blob",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => {
          loading.close();
          resolve();
          if (res) {
            console.log(res);
            let fileName = res.headers['content-disposition'];
            let name = decodeURI(
              fileName
                .split("=")[1]
                .replace('"', "")
                .split(".")[0]
            );
            let format = decodeURI(
              fileName
                .split("=")[1]
                .replace('"', "")
                .split(".")[1]
                .replace('"', "")
            );
            var blob = res.data;
            // 兼容ie
            if (window.navigator.msSaveBlob) {
              try {
                window.navigator.msSaveBlob(blob, name + '.' + format)
              } catch (e) {
                console.log(e);
              }
            } else {
              // 其他浏览器，创建一个a链接点击下载
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = function (e) {
                var a = document.createElement("a");
                a.download = name + '.' + format;
                a.href = e.target.result;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              };
            }
          } else {
            reject();
          }
        })
        .catch(err => {
          loading.close();
          reject(err);
        })
    })
  }

}

export default new Service();
