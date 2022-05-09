

module.exports = {
  name: 'kick',
  aliases: ['remove'],
  run: async (client, message, args) => {
         //kick a user
         if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`${client.emotes.error} | You don't have permission to kick members!`)
         if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${client.emotes.error} | I don't have permission to kick members!`)
         if (!args[0]) return message.channel.send(`${client.emotes.error} | Please enter a user to kick!`)
         let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
         if (!user) return message.channel.send(`${client.emotes.error} | Please enter a valid user!`)
         if (user.id === message.author.id) return message.channel.send(`${client.emotes.error} | You can't kick yourself!`)
         if (user.id === message.guild.ownerID) return message.channel.send(`${client.emotes.error} | You can't kick the server owner!`)
         if (user.id === client.user.id) return message.channel.send(`${client.emotes.error} | You can't kick me!`)
         if (!user.kickable) return message.channel.send(`${client.emotes.error} | I can't kick this user!`)
         let reason = args.slice(1).join(' ')
         if (!reason) reason = 'No reason provided.'
         user.kick(reason)
         message.channel.send(`${client.emotes.success} | Kicked ${user} for \`${reason}\``)
      }
    }
    
 
   
   // //if the message is from the bot, ignore it
    // if (message.author.bot) return;
    // //check if message starts with prefix
    // if (message.content.indexOf(PREFIX) !== 0) return;
    // //split the message into an array
    // const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    // const command = args.shift().toLowerCase();
    // //make a ping message
    // if (command === 'ping') {
    //     client.commands.get('ping').execute(message, args);
    // }
    // //make a kick command
    // if (command === 'kick') {
    //     //check if the user has the permission to kick
    //     if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('You do not have permission to kick members');
    //     //check if the user has the permission to kick
    //     if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.channel.send('I do not have permission to kick members');
    //     //check if the user has the permission to kick
    //     if (!args[1]) return message.channel.send('Please specify a user');
    //     //check if the user has the permission to kick
    //     if (!args[2]) return message.channel.send('Please specify a reason');
    //     //get the user to kick
    //     let user = message.mentions.members.first();
    //     //get the reason to kick
    //     let reason = args.slice(2).join(' ');
    //     //kick the user
    //     user.kick(reason).then(() => {
    //         //send a message to the channel
    //         message.channel.send(`${user.user.tag} has been kicked`);
    //     }).catch(err => {
    //         //send a message to the channel
    //         message.channel.send('I was unable to kick the user');
    //     });
    // }
