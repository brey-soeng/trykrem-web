import axios from 'axios'
import { getToken, removeToken, setToken } from '@/utils/auth'
import Config from '@/settings'
import store from '../store'
import { MessageBox, Message, Notification } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: Config.timeout
})

// request token
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer' + getToken() // get token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let isRefreshing = false

let requests = []

// response token
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response !== undefined) {
      const { data } = error.response
      if (data.code === 430) {
        MessageBox.confirm(data.message, '', {
          type: 'warning'
        }).then(() => {
          removeToken()
          location.reload()
        })
      } else if (data.code === 401) {
        const config = error.response.config
        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken().then(res => {
            const { access_token } = res
            setToken(access_token)
            config.headers['Authorization'] = 'Bearer ' + access_token
            config.baseURL = ''
            requests.forEach(cb => cb(access_token))
            requests = []
            return service(config)
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          return new Promise((resolve) => {
            requests.push((token) => {
              config.headers['Authorization'] = 'Bearer ' + token
              config.baseURL = ''
              resolve(service(config))
            })
          })
        }
      } else if (data.code === 500) {
        Notification.error({
          title: data.message,
          dangerouslyUseHTMLString: true,
          message: `<p>ErrorNumber:${data.data.errorId}</p> We'll deal with it as soon as possible`,
          duration: 0
        })
      } else {
        Message({
          message: data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(error)
    } else {
      MessageBox.alert(error.message, error.name, {
        type: 'error',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        roundButton: true
      })
    }
  })

function refreshToken() {
  return service.post('api/auth/refresh').then(response => response.data)
}

export default service
