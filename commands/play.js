const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (client, message, args, queue) => {
      const string = args.join(' ')
      if (!string) return message.channel.send(`${client.emotes.error} | Ript said: Please enter a song url or query to search.`)
      client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message
      })

    }
  }
  
