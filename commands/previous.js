module.exports = {
    name: 'previous',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | Ript said: There is nothing in the queue right now!`)
      const song = queue.previous()
      message.channel.send(`${client.emotes.success} | RiptMan Is Now Playing:\n${song.name}`)
    }
  }