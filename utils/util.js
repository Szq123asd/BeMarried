const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


// function getTimeLeft(datetimeTo) {
//   // 计算目标与现在时间差（毫秒）
//   let time1 = new Date(datetimeTo).getTime();
//   let time2 = new Date().getTime();
//   let mss = time1 - time2;

//   // 将时间差（毫秒）格式为：天时分秒
//   let days = parseInt(mss / (1000 * 60 * 60 * 24));
//   let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
//   let seconds = parseInt((mss % (1000 * 60)) / 1000);

//   return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
// }

// module.exports = {
//   getTimeLeft: getTimeLeft
// }