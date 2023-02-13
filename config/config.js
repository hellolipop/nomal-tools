// 环境配置
let PROFILE = 'DEV'// 'DEV' / 'PRD'/'UAT'
// 版本号
let Version = 'HQIT23.02.10.1';
let URL = ''
let LOGOUT_URL = '' //退出地址
let REDIRECT_URL = '' //退出地址
let JUMP_LINK = {  // 操作手册地址
    ADMIN_OM: ''
}
//项目域名地址
if (PROFILE === 'DEV') {
    // URL = "http://192.168.1.159:8106"; // 肖
    URL = "http://192.168.1.146:8106"; // 吴
    // URL = "https://uat.021hqit.com/phms-api";
    // LOGOUT_URL = "http://172.20.4.243/api/logout"
    JUMP_LINK = {  // 操作手册地址
        ADMIN_OM: 'https://uat.021hqit.com/phms-admin-manual/#/'
    }
} else if (PROFILE === 'UAT') {
    URL = "https://uat.021hqit.com/phms-api"; // 测试地址
    JUMP_LINK = {  // 操作手册地址
        ADMIN_OM: 'https://uat.021hqit.com/phms-admin-manual/#/'
    }
} else if (PROFILE === 'PRD') {
    // 线上地址
    URL = "http://172.20.4.243/api"
    LOGOUT_URL = "http://172.20.4.243/api/logout"
    REDIRECT_URL = "https://portal1.ecnu.edu.cn/cas/login?service=http://172.20.4.243/api/auth/result/cas"
    JUMP_LINK = {  // 操作手册地址
        ADMIN_OM: 'http://172.20.4.243/phms-admin-manual/#/'
    }
}
let ROOT;
// 测试跳转

//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === "development") {
    //开发环境下的代理地址，解决本地跨域跨域，配置在vue.config.js里
    ROOT = "/api";

} else {
    //生产环境下的地址
    // ROOT = URL;
    ROOT = "/"

}


exports.Version = Version
exports.URL = URL
exports.ROOT = ROOT
exports.PROFILE = PROFILE
exports.LOGOUT_URL = LOGOUT_URL
exports.JUMP_LINK = JUMP_LINK
exports.REDIRECT_URL = REDIRECT_URL
