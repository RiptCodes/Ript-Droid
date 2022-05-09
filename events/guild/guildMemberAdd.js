const profileModel = require('../../models/profileSchema');

module.exports = async (client,discord,message,args) => {
        let profile = await profileModel.create({
            userID: member.id,
            serverID: message.guild.id,
            coins: 1000,
            bank: 0
        })
    profile.save()
}
