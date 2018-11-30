
const aws = require('electron').remote.require('./aws')

class InstanceService {
    listInstances(profile) {
        return aws.listInstances(profile.name, 'us-east-1')
    }
}

export default new InstanceService()
