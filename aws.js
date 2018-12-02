const AWS = require('aws-sdk')

let ec2;

module.exports = {
    startInstance(instanceId) {
        return new Promise((res, rej) => {
            ec2.startInstances({ InstanceIds: [instanceId] }, (err, data) => {
                if (err) {
                    return rej(err)
                }
                res(data)
            })
        })
    },
    stopInstance(instanceId) {
        return new Promise((res, rej) => {
            ec2.stopInstances({ InstanceIds: [instanceId] }, (err, data) => {
                if (err) {
                    return rej(err)
                }
                res(data)
            })
        })
    },
    listInstances(profile, region, search) {
        return new Promise((res, rej) => {
            AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile })
            ec2 = new AWS.EC2({
                apiVersion: '2016-11-15',
                region,
            })

            if (typeof search === 'string') {
                search = search.trim()
            }
            if (Array.isArray(search) || search.startsWith('i-')) {
                if (typeof search === 'string') {
                    search = search.split(/[^a-zA-Z0-9-]/).filter(i => i)
                }
                ec2.describeInstances({ InstanceIds: search }, (err, data) => {
                    if (err) {
                        return rej(err)
                    }
                    res(data.Reservations.reduce((out, res) => {
                        out.push.apply(out, res.Instances)
                        return out;
                    }, []))
                })
                return
            }
        
            const isIp = search.split('.').length === 4
            const nameRe = new RegExp(search, 'i')
            ec2.describeInstances((err, data) => {
                if (err) {
                    return rej(err)
                }
                res(data.Reservations.reduce((out, res) => {
                    res.Instances.forEach(inst => {
                        if (isIp) {
                            if (inst.PrivateIpAddress === search) {
                                out.push(inst)
                            }
                        } else {
                            const name = inst.Tags.find(tag => tag.Key === 'Name') || { Value: ''}
                            if (name.Value.match(nameRe)) {
                                out.push(inst)
                            }
                        }
                    })
                    return out;
                }, []))
            })
        }).then(instances => {
            return instances.map(inst => {
                return {
                    id: inst.InstanceId,
                    name: (inst.Tags.find(tag => tag.Key == 'Name') || { Value: ''}).Value,
                    privateIp: inst.PrivateIpAddress,
                    state: inst.State.Name,
                }
            })
        })
    },
    launchHelp() {
        const start = process.platform == 'darwin' ? 'open'
                    : process.platform == 'win32' ? 'start'
                    : 'xdg-open';
        require('child_process').exec(start + ' https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html');
    },
    exit() {
        process.exit()
    }
}