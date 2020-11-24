import axios from 'axios'

// Configs
const ACCESS_KEY = `${process.env.UNSPLASH_ACCESS_KEY}`
const API_URL = `https://api.unsplash.com`

// Axios Instance
const instance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  params: {
    client_id: ACCESS_KEY,
  },
})

// Authorization for header
instance.defaults.headers.common['Accept-Version'] = 'v1'

export default instance
