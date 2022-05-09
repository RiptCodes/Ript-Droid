const { MessageEmbed } = require("discord.js");
const config = require(`../config.json`);
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Information about the bot",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
 
  run: async (client, message, args) => {
    client.settings.ensure(message.guild.id, {
    prefix: config.prefix,
});
    
    let {prefix} = client.settings.get(message.guild.id)
    const arg = message.content.slice(prefix.length).trim().split(/ +/g)
    commandMap = client.commands.map(cmd => `\`${cmd.name}\``).join('\n ') //Rayan Please remember this for the future
    const command = arg.shift()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!client.commands)
        return message.channel.send(
          "❌ | Unable to find that command."
        );
    //Rayan remember that this lists a full commands section
    message.reply({
      embeds:[
        new Discord.MessageEmbed()
        .setTitle("COMMAND MENU")
        .setDescription(`Commands are listed below, to use these commands use the prefix \`${prefix}\` `)
        .addFields({
          name: "Music",
          value: `\`play\`, \`playskip\`, \`queue\`, \`autoplay\`, \`pause\`, \`seek\`, \`resume\`, \`volume\`, \`skip\`, \`shuffle\`, \`stop\``
          
        },
                   {
                     name: "FUN[10]",
                    value: `\`catch\`, \`trade\`, \`love\`, \`MORE TO COME SOON\``
                   },
                   {
                   name: "FILTER[1]",
                  value: `\`addfilter\`, MORE FILTERS TO BE ADDED `
                   }
                  )
        
        
        .setColor('#0000ff')
      ]
    })
    
    //Sends a dm to the member asking of a information page for commands
    message.member.send({
      embeds:[
        new Discord.MessageEmbed()
          .setTitle(`Server: ${message.guild.name}`)
          .setAuthor(`Commands of ${client.user.username}`)
          .setThumbnail("https://cdn.discordapp.com/attachments/960559868991930439/970109078028320768/FINAL-RIPT_2.jpg")
          .setDescription(`Server Prefix: ${prefix}`)
          .addFields(
		      { 
          name: 'Support & Commands', 
          value:
         '[Configuration](https://riptboard.rayanshamsi.repl.co/dashboard/)'
          })
          .setColor('#0099ff')
      ]
    })
      
    //   components: [
    //     {
    //         type: 1,
    //         components: [
    //             {
    //                 type: 2,
    //                 style: 1,
    //                 label: client.emotes.lastPage,
    //                 custom_id: "last_application",
    //             },
    //             {
    //                 type: 2,
    //                 style: 1,
    //                 label: client.emotes.nextPage,
    //                 custom_id: "next_application"
                
    //             }

    //         ]
    //     }
    // ]

  
    
    // let Embed = new MessageEmbed()
    //   .setAuthor(
    //     `Commands of ${client.user.username}`
    //   )
    //   .setFooter(
    //     `To get info of each command type ${prefix}help [Command] | Have a nice day!`)
    // .setDescription("Hello")
    
    // if (!args[0]) message.channel.send(Embed);
    // else {
    //   const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    //   if (!cmd)
    //     return client.sendTime(
    //       message.channel,
    //       `❌ | Unable to find that command.`
    //     );

    //   let embed = new MessageEmbed()
    //     .setAuthor(`Command: ${cmd.name}`)
    //     .setDescription(cmd.description)
    //     .setColor("GREEN")
    //     //.addField("Name", cmd.name, true)
    //     .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
    //     .addField(
    //       "Usage",
    //       `\`${prefix}${
    //         cmd.name
    //       }${cmd.usage ? " " + cmd.usage : ""}\``,
    //       true
    //     )
    //     .addField(
    //       "Permissions",
    //       "Member: " +
    //         cmd.permissions.member.join(", ") +
    //         "\nBot: " +
    //         cmd.permissions.channel.join(", "),
    //       true
    //     )
    //     .setFooter(
    //       `Prefix - ${
    //         prefix
    //       }`
    //     );

    //   message.channel.send(embed);
    // }
  }
}


// const Discord = require('discord.js')

// module.exports = {
//   name: 'help',
//   aliases: ['h', 'cmd', 'command'],
//   run: async (client, message) => {
//     const icon = client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 300 });
//     message.channel.send({

//       embeds:[
//         new Discord.MessageEmbed()
//           .setTitle('Commands')
//           .setAuthor({ name: client.user.tag})
//           .setThumbnail(icon)
//           .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join('\n '))
//           .setColor('#0099ff')
//       ],
//       components: [
//         {
//             type: 1,
//             components: [
//                 {
//                     type: 2,
//                     style: 1,
//                     label: client.emotes.lastPage,
//                     custom_id: "last_application",
//                 },
//                 {
//                     type: 2,
//                     style: 1,
//                     label: client.emotes.nextPage,
//                     custom_id: "next_application"
                
//                 }

//             ]
//         }
//     ]
//     })
  
//   }
// }
