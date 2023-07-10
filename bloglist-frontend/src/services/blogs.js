import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/blogs'

const headers = {
  'Authorization': storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, { headers })
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, { headers })
  return response.data
}

const destroy = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers })
  return response.data
}

export default { getAll, create, update, destroy }
