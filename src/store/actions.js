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

      // ユーザールームリストをストアに保存
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      commit('setRooms', rooms)

      // ユーザーを部屋に登録
      const activeRoom = state.activeRoom || rooms[0] // 最後または最初に使用した部屋を選択
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      })
      await chatkit.subscribeToRoom(activeRoom.id)

      return true
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false)
    }
  }
}
