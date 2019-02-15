import axios from 'axios'

export const getData = async (url) => {
  try {
    const response = await axios.get(url, { withCredentials:true })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const postData = async (url, data) => {
  try {
    // 该配置允许跨域携带cookie
    const response = await axios.post(url, data, { withCredentials:true })
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const putData = async (url, data) => {
  try {
    const response = await axios.put(url, data, { withCredentials:true })
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const deleteData = async (url) => {
  try {
    const response = await axios.delete(url, { withCredentials:true })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

