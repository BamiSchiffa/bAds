const fs = require(`fs`);
const db = require(`quick.db`);
module.exports = {
    getData: JSON.parse(fs.readFileSync('./data/data.json', 'utf8'))
}

module.exports.quick = {
    getVerified: function (user) {
        return db.fetch(`verified.${user.id}`);
    },
    setVerified: function (user, boolean) {
        return db.set(`verified.${user.id}`, boolean);
    }
}

module.exports.users = {
    add: function (user, accesToken) {
        const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
        if (!data.users) data.users = [];
        data.users[user.id] = { accesToken }
        //data.users[user.id].accesToken = user.accesToken 
        fs.writeFileSync('./data/data.json', JSON.stringify(data));
    },
    get: function (id) {
        const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
        if (!data.users) data.users = [];
        return data.users[id]
    }
};

