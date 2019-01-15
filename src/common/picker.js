import deepCopy from './deepCopy'
export const pickerCity = [
    {
        label: '北京',
        value: '北京'
    },
    {
        label: '上海',
        value: '上海'
    },
    {
        label: '广州',
        value: '广州'
    },
    {
        label: '深圳',
        value: '深圳'
    },
    {
        label: '杭州',
        value: '杭州'
    }
]
export const pickerJob = [
    {
        label: '后端开发',
        value: '后端开发',
        children: [
            {
                label: 'Java',
                value: 'Java'
            },
            {
                label: 'PHP',
                value: 'PHP'
            },
            {
                label: 'Python',
                value: 'Python'
            }
        ]
    },
    {
        label: '测试',
        value: '测试',
        children: [
            {
                label: '测试工程师',
                value: '测试工程师'
            },
            {
                label: '软件测试',
                value: '软件测试'
            },
            {
                label: '游戏测试',
                value: '游戏测试'
            },
            {
                label: '硬件测试',
                value: '硬件测试'
            }
        ]
    },
    {
        label: '前端开发',
        value: '前端开发',
        children: [
            {
                label: 'web前端',
                value: 'web前端'
            },
            {
                label: 'H5游戏',
                value: 'H5游戏'
            }
        ]
    }
]
export const pickerEduBg = [
    {
        label: '中专',
        value: '中专'
    },
    {
        label: '高中',
        value: '高中'
    },
    {
        label: '大专',
        value: '大专'
    },
    {
        label: '本科',
        value: '本科'
    },
    {
        label: '硕士',
        value: '硕士'
    },
    {
        label: '博士',
        value: '博士'
    }
]
export const pickerFinancing = [
    {
        label: '不需要融资',
        value: '不需要融资'
    },
    {
        label: '未融资',
        value: '未融资'
    },
    {
        label: 'A轮',
        value: 'A轮'
    },
    {
        label: 'B轮',
        value: 'B轮'
    },
    {
        label: 'C轮',
        value: 'C轮'
    },
    {
        label: 'D轮及以上',
        value: 'D轮及以上'
    },
    {
        label: '已上市',
        value: '已上市'
    }
]
export const pickerPPLNum = [
    {
        label: '0-20人',
        value: '0-20人'
    },
    {
        label: '20-99人',
        value: '20-99人'
    },
    {
        label: '100-499人',
        value: '100-499人'
    },
    {
        label: '500-999人',
        value: '500-999人'
    },
    {
        label: '1000-9999人',
        value: '1000-9999人'
    },
    {
        label: '10000人以上',
        value: '10000人以上'
    }
]

let pickerSalary = [
    {
        label: '面议',
        value: 0
    },
]
for (var i = 1; i <= 30; i++) {
    var children = []
    for (var j = i + 1; j <= i + 5; j++) {
        children.push({
            label: j + 'k',
            value: j
        })
    }
    pickerSalary.push(
        {
            label: i + 'k',
            value: i,
            children: children
        }
    )
}
export { pickerSalary }

let currentYear = new Date().getFullYear()
let month = []
for (var i = 1; i <= 12; i++) {
    if (i < 10) {
        month.push({
            label: '0' + i,
            value: '0' + i
        })
    } else {
        month.push({
            label: i + '',
            value: i + ''
        })
    }
}
let pickerWorkTime = []
for (var i = currentYear; i >= 1990; i--) {
    pickerWorkTime.push({
        label: i + '',
        value: i + '',
        children: month
    })
}
pickerWorkTime.push({
    label: '1990以前',
    value: '1'
})
let pickerWorkEnd = deepCopy(pickerWorkTime)
pickerWorkEnd.unshift({
    label: '至今',
    value: '0'
})

export { pickerWorkTime,pickerWorkEnd }

let pickerEduTime = []
for (var i = currentYear; i >= 1990; i--) {
    var endTime = []
    for (var j = i + 5; j > i; j--) {
        endTime.push({
            label: j + '',
            value: j + ''
        })
    }
    pickerEduTime.push({
        label: i + '',
        value: i + '',
        children: endTime
    })
}
pickerEduTime.push({
    label: '1990以前',
    value: '1'
})
export { pickerEduTime }