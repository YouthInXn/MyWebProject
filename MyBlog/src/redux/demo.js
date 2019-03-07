
const axios = require('axios').default

const test = async function (url, param) {
  const result = await axios.post(url, param)
  if (result.data.isSuccess) {
    return { type:'111', error:true }
  }
  return { type:'222', payload:result }
}
const url = 'http://localhost:8081/users/login'
const param = {
  name:'ghn',
  password:'ghn123'
}
console.log(test(url, param).then(res => console.log(res)))
