const Discord = require('discord.js')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');


module.exports = {
    name: 'setup',
    aliases: ['set-up'],

        run: async (client, message, args) => {
      
                        

            const icon = client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 300 });
            if(args[0]) return message.channel.send({
                
            embeds: [
                new Discord.MessageEmbed()
                .setTitle("DM Role")
                .setDescription("Please select the dm role in your server...")
                .setColor(0x0099ff)
                .setThumbnail(icon)
            ]
        })
            else {
                message.channel.send({
            
                    embeds:[
                    new Discord.MessageEmbed()
                        .setTitle('Setup - Please enter !setup <option>')
                        .setAuthor({ name: client.user.tag})
                        .setThumbnail(icon)
                        .setDescription(`\`${client.prefix}setup\` - Setup the bot.\n\`${client.prefix}setup dm\` - Setup the dm role.\n\`${client.prefix}setup invite\` - Setup the invite command.`)
                        .setColor('#0099ff')
                    ]
                })
            }

        }
    }
          