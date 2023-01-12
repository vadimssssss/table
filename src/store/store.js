export default {
  state: {
    tableRows: []
  },
  mutations: {
    setData(state, array) {
      state.tableRows.push(array)
    }
  }, 
  actions: {
    async setData({commit}, amount) {
      for (let i = 0; i < amount; i++) {
        let array = []
        for (let k = 0; k < amount; k++) {
          await array.push({value: 0, row: (i + 1), id: k})
        }
        commit('setData', array)
      }
    }
  }
}