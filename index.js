const ejs = require('ejs')
const fs = require('fs')
const axios = require('axios')

var prevFollowerCount=0

const username='YOUR_GITHUB_USERNAME'

axios.get(`https://api.github.com/users/${username}/followers`)
    .then((data) => checkData(data.data))

function checkData(followerCount) {
    if(followerCount>prevFollowerCount) {
        printData(followerCount)
        prevFollowerCount=followerCount
    }
}

function printData(followerData) {
    fs.readFile(__dirname + '/template.ejs', (err, data) => {
        if (err) throw err
        const time = new Date().toLocaleString()

        const writeData = ejs.render(data.toString(), {
            followers: followerData,
            time: time
        })
        fs.writeFileSync('README.md', writeData);
    })
}