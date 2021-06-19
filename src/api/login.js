import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'api/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfo() {
  return request({
    url: 'api/auth/user',
    method: 'post'
  })
}

export function refresh() {
  return request({
    url: 'api/auth/refresh',
    method: 'post'
  })
}

export const getVerificationCode = (config) => {
  return request.get(`captcha/api/${config}`)
}

export function logout() {
  return request({
    url: 'api/auth/logout',
    method: 'post'
  })
}
