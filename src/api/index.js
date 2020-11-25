const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api/'

export const getToken = () => {
  if (localStorage.getItem('authfitness-token')) {
    return localStorage.getItem('authfitness-token')
  } else {
    localStorage.removeItem('authfitness-token')
  }
}

export const clearToken = () => {
  localStorage.removeItem('authfitness-token')
}

const setToken = (token) => {
  localStorage.setItem('authfitness-token', token)
}

function buildHeaders() {
  let base = {
    'Content-Type': 'application/json'
  }

  if (getToken()) {
    base['Authorization'] = `Bearer ${getToken()}`
  }

  return base
}

export const auth = async (username, password, isNew = false) => {
  const url = `${BASE_URL}/users` + (isNew ? '/register' : '/login')

  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })

  const { error, data } = await response.json()

  if (error) {
    throw Error(error.message)
  }

  if (data && data.token) {
    setToken(data.token)
  }
  console.log(data)
  return data
}

export const hitAPI = async (method, endpoint, bodyObj) => {
  const payload = {
    method: method,
    headers: {
          'Content-Type': 'application/json'},
  }
  
  if (bodyObj) {
    payload.body = bodyObj
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, payload)
  
  const data = await response.json()

  // if (error) {
  //   throw Error(error.message)
  // }

  if (data && data.token) {
    setToken(data.token)
  }
  return data
}