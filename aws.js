const AWS = require('aws-sdk')

module.exports = {
    listInstances(profile, region, search) {
        return new Promise((res, rej) => {
            const ec2 = new AWS.EC2({
                apiVersion: '2016-11-15',
                region,
                profile,
            })

            console.log(search)

            search = search.trim()
            if (search.startsWith('i-')) {
                filter = { Name: 'instance-id', Values: search.split(/[^a-zA-Z0-9-]/).filter(i => i) }
                ec2.describeInstances({ InstanceIds : [search] }, data => {
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
                }, []).map(inst => {
                    return {
                        id: inst.InstanceId,
                        name: (inst.Tags.find(tag => tag.Key == 'Name') || { Value: ''}).Value,
                        privateIp: inst.PrivateIpAddress
                    }
                }))
            })
        })
    }
}