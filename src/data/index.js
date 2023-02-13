var Mock = require('mockjs')

const data = {
    authorities: {
        "all_payment_record":{"read":"1","export":"1"},
        "student_management":{"read":"1"},
        "archive_transferring":{"read":"1","import":"1","update":"1","delete":"1"},
        "ras_funding_plan_management":{"read":"1"}
    },
    testList: Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|20-60': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            "id": '@increment()',
            "title": "@ctitle",
            "content": "@cparagraph",
            "add_time": "@date(yyyy-MM-dd hh:mm:ss)"
        }]
    })
} 
export default data