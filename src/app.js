
import Vue from 'vue'
import App from './App.vue'

const fs = require('fs')
const path = require('path')
const os = require('os')
const ini = require('ini')

const userDir = os.homedir()
const awsCredsFile = path.join(userDir, '.aws', 'credentials')
console.log('Using credentials file:', awsCredsFile)

if (!fs.existsSync(awsCredsFile)) {
    console.log('creds file missing')
}

import Store from './store'

const app = new Vue({
    store: Store(),
    ...App
})
