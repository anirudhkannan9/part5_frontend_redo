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

const update = async (id, newObject) => {
  let request = await axios.put(`${baseUrl}/${id}`, newObject)
  request = request.data
  return request
}

const remove = async (id, token) => {
  const headers = {
    'Authorization': `bearer ${token}`
  }

  let config = {
    headers: headers
  }
  let request = await axios
    .delete(`${baseUrl}/${id}`, config)
  request = request.data
  return request
}


export default { 
  getAll, 
  setToken, 
  create,
  update,
  remove
}