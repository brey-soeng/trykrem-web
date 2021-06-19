const getters = {
  token: state => state.user.token,
  user: state => state.user.userInfo,
  accessedRoutes: state => state.user.accessedRoutes
}
export default getters
