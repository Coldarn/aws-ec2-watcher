
import mkdirp from 'mkdirp'
import ini from 'ini'

const fs = require('fs')
const path = require('path')
const os = require('os')

const credsDir = path.join(os.homedir(), '.aws')
const awsCredsFile = path.join(credsDir, 'credentials')
const instancesFile = path.join(credsDir, 'watched-instances.json')


function readAwsCreds() {
    console.log('Using credentials file:', awsCredsFile)
    if (!fs.existsSync(awsCredsFile)) {
        fs.writeFileSync(awsCredsFile, '')
    }
    return ini.parse(fs.readFileSync(awsCredsFile, { encoding: 'utf8' }))
}
function writeAwsCreds(creds) {
    fs.writeFileSync(awsCredsFile, ini.stringify(creds))
}


function readInstances() {
    if (!fs.existsSync(instancesFile)) {
        fs.writeFileSync(instancesFile, '{}')
    }
    try {
        return JSON.parse(fs.readFileSync(instancesFile, { encoding: 'utf8' }))
    } catch {
        return {}
    }
}
function writeInstances(instances) {
    fs.writeFileSync(instancesFile, JSON.stringify(instances, null, 2))
}


class ProfileService {
    getProfiles() {
        mkdirp.sync(credsDir)
        
        const profiles = readAwsCreds()
        const instances = readInstances()
        return Object.keys(profiles).map(name => {
            return {
                name,
                aws_access_key_id: profiles[name].aws_access_key_id,
                aws_secret_access_key: profiles[name].aws_secret_access_key,
                region: profiles[name].region,
                instances: instances[name] || []
            }
        })
    }

    saveProfile(oldName, profile) {
        const profiles = readAwsCreds()
        const instances = readInstances()

        if (oldName !== profile.name) {
            profiles[profile.name] = profiles[oldName]
            delete profiles[oldName]
            
            instances[profile.name] = instances[oldName]
            delete instances[oldName]
        }

        const scrubbedProfile = Object.assign({}, profile)
        delete scrubbedProfile.id
        delete scrubbedProfile.name
        delete scrubbedProfile.instances
        profiles[profile.name] = Object.assign(profiles[profile.name] || {}, scrubbedProfile);

        instances[profile.name] = profile.instances

        writeAwsCreds(profiles)
        writeInstances(instances)
    }

    removeProfile(profileName) {
        const profiles = readAwsCreds()
        const instances = readInstances()

        delete profiles[profileName]
        delete instances[profileName]

        writeAwsCreds(profiles)
        writeInstances(instances)
    }
}

export default new ProfileService()
