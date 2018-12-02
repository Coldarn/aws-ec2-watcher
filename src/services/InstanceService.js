
const aws = require('electron').remote.require('./aws')

class InstanceService {
    listInstances(profile, search) {
        return aws.listInstances(profile.name, profile.region, search)
    }

    startInstance(instanceId) {
        return aws.startInstance(instanceId)
    }
    
    stopInstance(instanceId) {
        return aws.stopInstance(instanceId)
    }
}

export default new InstanceService()
