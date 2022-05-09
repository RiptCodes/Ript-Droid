module.exports = {
    name: 'shuffle',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | Ript said: There is nothing in the queue right now!`)
      queue.shuffle()
      message.channel.send('Ript Shuffled songs in the queue')
    }
  }