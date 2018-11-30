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
            let filter = null
            if (search.startsWith('i-')) {
                filter = { Name: 'instance-id', Values: [search] }
            } else if (search.split('.') === 4) {
                filter = { Name: 'private-dns-name', Values: [`ip-${search.replace(/\./g, '-')}.dev.tech.local`] }
            } else {
                filter = { Name: 'tag:Name', Values: [`*${search}*`] }
            }
        
            ec2.describeInstances({ Filters: [filter] }, (err, data) => {
                if (err) {
                    return rej(err)
                }
                res(data.Reservations.reduce((out, res) => {
                    out.push.apply(out, res.Instances);
                    return out;
                }, []))
            })
        })
    }
}