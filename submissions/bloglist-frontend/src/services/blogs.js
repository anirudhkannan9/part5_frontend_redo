import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }

  const request = await axios.post(baseUrl, newObject, config)
  const responseData = request.data
  console.log(responseData)
  return responseData
}

export default { getAll, setToken, create }