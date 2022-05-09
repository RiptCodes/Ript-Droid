const ms = require('ms')

module.exports = {
    name: 'purge',
    description: 'Purge messages',
    userPermissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'amount',
            description: 'Amount of messages to delete',
            type: 'integer',
            required: true
        }
    ],
    run: async(Client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Ript said: You do not have permission to purge messages');
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Ript said: I do not have permission to purge messages');
            //stop infinite loop
            if (args[0] > 100) return message.channel.send('Ript said: You can only purge up to 100 messages at a time');
            if (args[0] < 1) return message.channel.send('Ript said: You can only purge at least 1 message');
            //if args[0] == 'all'
            if (args[0] == 'all') {
                message.channel.messages.fetch({ limit: 100 }).then(messages => {
                    message.channel.bulkDelete(messages);
                });
            } else {
                message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages);
                });
            }
            if (isNaN(args[0]) && args[0] !== 'all') return message.channel.send('Ript said: Please specify a number');
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} messages have been purged`);
            

            }).catch(err => {
                console.log(err);
            });
        }
}

            
            //message.channel.send(`${args[0]} messages have been purged`);

  
// execute(message, args) {
//     if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to purge messages');
//     //check if the user has the permission to purge
//     if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send('I do not have permission to purge messages');
//     //check if the user has the permission to purge
//     if (!args[1]) return message.channel.send('Please specify a number');
//     //ask for a amount to delete
//     message.channel.bulkDelete(args[1]).then(() => {
//         //send a message to the channel
//         message.channel.send(`${args[1]} messages have been deleted`);
//     }).catch(err => {
//         //send a message to the channel
//         message.channel.send('I was unable to delete messages');
//     }
//     );
// }
// }