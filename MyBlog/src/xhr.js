import axios from 'axios'

const customAxios = axios.create({
  withCredentials: true,
  timeout:3000
})

export const getData = async (url) => {
  try {
    const response = await customAxios.get(url)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const postData = async (url, data) => {
  try {
    // 该配置允许跨域携带cookie
    const response = await customAxios.post(url, data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const putData = async (url, data) => {
  try {
    const response = await customAxios.put(url, data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export const deleteData = async (url) => {
  try {
    const response = await customAxios.delete(url)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

