
const aws = require('electron').remote.require('./aws')

class InstanceService {
    listInstances(profile, region, search) {
        return aws.listInstances(profile.name, region, search)
    }

    startInstance(instanceId) {
        return aws.startInstance(instanceId)
    }
    
    stopInstance(instanceId) {
        return aws.stopInstance(instanceId)
    }
}

export default new InstanceService()
