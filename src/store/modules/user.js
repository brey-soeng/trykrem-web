import { login, getUserInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const user = {
  state: {
    token: getToken(),
    userInfo: {},
    accessedRoutes: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ACCESSEDROUTES: (state, accessedRoutes) => {
      state.accessedRoutes = accessedRoutes
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.access_token)
          setToken(data.access_token, rememberMe)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // get user info
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { accessedRoutes } = data
          console.log(data.item.username)
          // add more role
          commit('SET_USERINFO', data.item.username)
          commit('SET_ACCESSEDROUTES', accessedRoutes)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
