const AWS = require('aws-sdk')

module.exports = {
    listInstances(profile, region) {
        return new Promise((res, rej) => {
            const ec2 = new AWS.EC2({
                apiVersion: '2016-11-15',
                region,
                profile,
            })
        
            ec2.describeInstances((err, data) => {
                if (err) {
                    return rej(err)
                }
                res(data)
            })
        })
    }
}