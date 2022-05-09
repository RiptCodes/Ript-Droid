module.exports = {
    name: 'resume',
    aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | Ript said: There is nothing in the queue right now!`)
      queue.resume()
      message.channel.send('Ript said: Resumed the song for you :)')
    }
  }