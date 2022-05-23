console.log(typeof demoList)

const _demoList = demoList

import $ from 'jquery'

const fileListHtml = _demoList.map((el) => `<li><a href="/${el}.html">${el}</a></li>`)

$('body').append(fileListHtml)
