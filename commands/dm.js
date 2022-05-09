const { MessageEmbed } = require("discord.js");
const config = require(`../config.json`);

module.exports = {
    name: `${config.prefix}dm`,
    description: 'DM a user',
    run: async(client, message, args) => {
        //if user has dm role then dm user
    client.settings.ensure(message.guild.id, {
    prefix: config.prefix,
  });

      let { prefix } = client.settings.get(message.guild.id)
        if(message.content.startsWith(prefix) && !args[0]) return message.channel.send('Please specify a user/role to DM');
        if(message.content.startsWith(prefix) && !args[1]) return message.channel.send('Please specify a message');

        let user = message.mentions.roles.first();
        if(message.content.startsWith(prefix) && !user) return message.channel.send('Please specify a valid user');

        let msg = args.slice(1).join(' ');
        let cmd = args.shift() ?.toLowerCase();
        if(message.content.startsWith(prefix) && !msg) return message.channel.send('Please specify a message');

        message.guild.roles.cache.get(user.id).members.forEach(member => member.send(msg))
    }
}