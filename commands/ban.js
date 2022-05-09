
module.exports = {
    name: 'ban',
    description: 'Ban a user',
    async execute(client, Discord, message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('You do not have permission to ban members');
        //check if the user has the permission to ban
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send('I do not have permission to ban members');
        //check if the user has the permission to ban
        if (!args[0]) return message.channel.send('Please specify a user');
        //check if the user has the permission to ban
        if (!args[1]) return message.channel.send('Please specify a reason');
        //get the user to ban
        let user = message.mentions.members.first();
        //get the reason to ban
        let reason = args.slice(2).join(' ');
        //ban the user
        user.ban(reason).then(() => {
            //send a message to the channel
            message.channel.send(`${user.user.tag} has been banned`);
        }).catch(err => {
            //send a message to the channel
            message.channel.send('I was unable to ban the user');
        }); 
    }
}