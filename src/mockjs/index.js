var Mock = require('mockjs')
import data from "../data"
// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|20-60': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         "id": '@increment()',
//         "title": "@ctitle",
//         "content": "@cparagraph",
//         "add_time": "@date(yyyy-MM-dd hh:mm:ss)"
//     }]
// })

Mock.mock('/api/get/list','get',(options)=>{
    return {
        status: 200,
        code:0,
        message: '获取新闻列表数据成功',
        result:data.testList.list
    }
})
Mock.mock('/api/get/user','get',(options)=>{
    return {
        status: 200,
        code:0,
        message: '获取新闻列表数据成功',
        result:data.authorities
    }
})