
const aws = require('electron').remote.require('./aws')

class InstanceService {
    listInstances(profile, region, search) {
        return aws.listInstances(profile.name, region, search)
    }
}

export default new InstanceService()
