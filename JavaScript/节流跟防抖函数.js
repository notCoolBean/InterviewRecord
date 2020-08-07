/*
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-28 16:05:22
 * @LastEditTime: 2020-08-07 10:36:53
 * @Description: file content
 * @FilePath: /github/InterviewRecord/JavaScript/节流跟防抖函数.js
 */ 

// 乞丐版节流、防抖函数
// 节流函数（触发以一次后，要过一段时间才能触发第二次）
function throttle(fn, wait) {
  let timer = null;
  
  let res = function () {
    if (!timer) { // 如果在规定时间内已经有函数存在则不进行操作
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        clearTimeout(timer);
        timer = null;
      }, wait)
    }
  }

  return res;
}

// 防抖函数（一段时间内，多次触发，只执行最后一次）
function debounce(fn, wait) {
  let timer = null;
  
  let res = function () {
    if (timer) { // 如果在规定时间内已经有函数存在则进行清空处理
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      clearTimeout(timer);
      timer = null;
    }, wait)
  }

  return res;
}
