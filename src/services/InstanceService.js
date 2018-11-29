
import AWS from 'aws-sdk'

class InstanceService {
    listInstances(profile) {
        return new Promise((res, rej) => {
            AWS.config.region = 'us-east-1'
            AWS.config.credentials = new AWS.Credentials(profile.aws_access_key_id, profile.aws_secret_access_key)
            const ec2 = new AWS.EC2({apiVersion: '2016-11-15'})

            ec2.describeInstances({}, (err, data) => {
                if (err) {
                    return rej(err)
                }
                res(data)
            })
        })
    }
}

export default new InstanceService()
