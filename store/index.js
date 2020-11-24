import instance from '@/utils/api'

export const state = () => ({
  photos: [],
  loading: false,
  alert: {
    type: '',
    message: '',
  },
})

export const mutations = {
  setPhotos(state, payload) {
    const { photos, isNewQuery } = payload
    isNewQuery ? (state.photos = [...photos]) : state.photos.push(...photos)
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setAlert(state, payload) {
    state.alert = payload
  },
}

export const actions = {
  getPhotosFromAPI({ commit }, payload) {
    commit('setLoading', true)
    const { query, page, isNewQuery } = payload
    const perPage = 8

    setTimeout(() => {
      instance
        .get(`/search/photos?query=${query}&page=${page}&per_page=${perPage}`)
        .then((response) => {
          const results = response.data.results

          commit('setPhotos', {
            photos: results,
            isNewQuery,
          })

          commit('setAlert', {
            type: results.length > 0 ? '' : 'info',
            message: results.length > 0 ? '' : 'No Image Found For This Query.',
          })

          if (results.length > 0) commit('setLoading', false)
          return results
        })
        .catch((error) => {
          if (error.response) {
            commit('setAlert', {
              type: 'error',
              message: `${error.response.status} - ${
                error.response.data.errors[0] || error.response.data
              }`,
            })
            // console.log('Error:', error.response)
          }
          return error
        })
    }, 2000)
  },
}

export const getters = {
  getPhotos(state) {
    return state.photos
  },
  getLoadingState(state) {
    return state.loading
  },
  getAlert(state) {
    return state.alert
  },
}
