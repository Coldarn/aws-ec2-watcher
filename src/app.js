
// Bundled dependencies
import Vue from 'vue'
import App from './App.vue'
import Store from './store'
import ProfileService from './services/ProfileService'


import IconPlay from 'vue-material-design-icons/Play.vue'
import IconStop from 'vue-material-design-icons/Stop.vue'
import IconPlus from 'vue-material-design-icons/Plus.vue'
import IconForward from 'vue-material-design-icons/ChevronRight.vue'
import IconBack from 'vue-material-design-icons/ChevronLeft.vue'
import IconEdit from 'vue-material-design-icons/Pencil.vue'
import IconTrash from 'vue-material-design-icons/TrashCanOutline.vue'
import IconCheckboxEmpty from 'vue-material-design-icons/CheckboxBlankOutline.vue'
import IconCheckboxChecked from 'vue-material-design-icons/CheckboxMarkedOutline.vue'
import IconCheck from 'vue-material-design-icons/Check.vue'
import IconCancel from 'vue-material-design-icons/Close.vue'
import IconProfile from 'vue-material-design-icons/AccountOutline.vue'
import IconClose from 'vue-material-design-icons/WindowClose.vue'

Vue.component('icon-play', IconPlay)
Vue.component('icon-stop', IconStop)
Vue.component('icon-plus', IconPlus)
Vue.component('icon-forward', IconForward)
Vue.component('icon-back', IconBack)
Vue.component('icon-edit', IconEdit)
Vue.component('icon-trash', IconTrash)
Vue.component('icon-checkbox-empty', IconCheckboxEmpty)
Vue.component('icon-checkbox-checked', IconCheckboxChecked)
Vue.component('icon-check', IconCheck)
Vue.component('icon-cancel', IconCancel)
Vue.component('icon-profile', IconProfile)
Vue.component('icon-close', IconClose)


const store = Store()

const profiles = ProfileService.getProfiles()
store.commit('addProfile', profiles)

if (profiles.length > 0 && profiles[0].aws_access_key_id) {
    store.commit('setActiveProfile', profiles[0])
    store.commit('setPage', 'instance-list')
}

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

const app = new Vue({
    el: rootEl,
    store: store,
    ...App
})
