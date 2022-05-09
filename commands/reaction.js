const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)

module.exports = {
    name: 'role',
    description: 'get Roles',
    userPerms: ['ADMINISTRATOR'],
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Roles Assign Center')
        .setColor('#0099ff')
        .setDescription("Please select 📔 to get DM's about the server")

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('DM role add')
            .setPlaceholder('Select to Add 📔 Role')
            .addOptions([
                { 
                    label: '📔 DM Role',
                    description: "Click to Add 📔 role",
                    value: 'dm',
                }
            ])
        );
        const row2 = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('DM role remove')
            .setPlaceholder('Select to Remove 📔 Role')
            .addOptions([
                { 
                    label: '📔 DM Role',
                    description: "Click to Reomove 📔 role",
                    value: 'dm',
                }
            ])

        );


        await message.channel.send({ embeds: [embed], components: [row] })
        
        
    .catch(err => 
        message.channel.send(`${client.emotes.error} | An error occured: ${err}`)
    )
    }  
}
