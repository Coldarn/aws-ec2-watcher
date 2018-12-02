import Vue from 'vue'
import Vuex from 'vuex'

import ProfileService from './services/ProfileService'

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
            removeProfile(state, profiles) {
                [].concat(profiles).forEach(p => {
                    const idx = state.profiles.indexOf(p)
                    if (idx >= 0) {
                        state.profiles.splice(idx, 1)
                        ProfileService.removeProfile(p.name)
                    }
                })
            },
            updateProfile(state, profile) {
                state.profiles.forEach(p => {
                    if (p.id === profile.id) {
                        ProfileService.saveProfile(p.name, profile)
                        Object.assign(p, profile)
                    }
                })
            },


            addInstance(state, instanceId) {
                if (state.activeProfile.instances.indexOf(instanceId) < 0) {
                    state.activeProfile.instances.push(instanceId)
                    ProfileService.saveProfile(state.activeProfile.name, state.activeProfile)
                }
            },
            removeInstance(state, instanceId) {
                const idx = state.activeProfile.instances.indexOf(instanceId)
                if (idx >= 0) {
                    state.activeProfile.instances.splice(idx, 1)
                    ProfileService.saveProfile(state.activeProfile.name, state.activeProfile)
                }
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