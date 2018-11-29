import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let profileId = 0

export default function Store() {
    return new Vuex.Store({
        state: {
            profiles: [],
            activeProfile: null,

            pageHistory: [],
            page: 'profile-list'
        },
        mutations: {
            setActiveProfile(state, profile) {
                state.activeProfile = profile
            },
            addProfile(state, profiles) {
                [].concat(profiles).forEach(p => {
                    p.id = ++profileId
                    state.profiles.push(p)
                    state.activeProfile = p
                })
            },
            updateProfile(state, profile) {
                state.profiles.forEach(p => {
                    if (p.id === profile.id) {
                        Object.assign(p, profile)
                    }
                })
            },

            setPage(state, page) {
                state.page = page
                state.pageHistory = []
            },
            pushPage(state, page) {
                state.pageHistory.push(state.page)
                state.page = page
            },
            popPage(state) {
                state.page = state.pageHistory.pop() || 'profile-list'
            }
        }
    })
}