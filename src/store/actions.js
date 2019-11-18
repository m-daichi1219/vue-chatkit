import chatkit from '../chatkit'

// エラーメッセージ表示のヘルパー関数
function handleError(commit, error) {
  const message = error.message || error.info.error_description
  commit('setError', message)
}

export default {
  async login({ commit, state }, userId) {
    try {
      commit('setError', '')
      commit('setLoading', true)
      
      // ChatKitサービスにユーザー接続
      const currentUser = await chatkit.connectUser(userId)
      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name
      })
      commit('setReconnect', false)

      // Test state.user
      console.log(state.user)
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false)
    }
  }
}
