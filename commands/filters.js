module.exports = {
    name: 'addfilter',
    aliases: ['af'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        if (!args[0]) return message.channel.send(`${client.emotes.error} | You need to specify a filter!`)
        if (args[0] === 'add') {
            if (!args[1]) return message.channel.send(`${client.emotes.error} | You need to specify a filter!`)
            if (queue.filters.includes(args[1])) return message.channel.send(`${client.emotes.error} | That filter is already in the queue!`)
            queue.filters.push(args[1])
            message.channel.send(`${client.emotes.success} | Added filter ${args[1]} to the queue!`)
        } else if (args[0] === 'remove') {
            if (!args[1]) return message.channel.send(`${client.emotes.error} | You need to specify a filter!`)
            if (!queue.filters.includes(args[1])) return message.channel.send(`${client.emotes.error} | That filter is not in the queue!`)
            queue.filters.splice(queue.filters.indexOf(args[1]), 1)
            message.channel.send(`${client.emotes.success} | Removed filter ${args[1]} from the queue!`)
        } else if (args[0] === 'list') {
            if (queue.filters.length === 0) return message.channel.send(`${client.emotes.error} | There are no filters in the queue!`)
            const filters = queue.filters.join(', ')
            message.channel.send(`${client.emotes.success} | Filters in the queue: \`${filters}\``)
        } else {
            return message.channel.send(`${client.emotes.error} | You need to specify a filter!`)
        }
      if (args[0] === 'off' && queue.filters?.length) queue.setFilter(false)
      else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
      else if (args[0]) return message.channel.send(`${client.emotes.error} | Not a valid filter`)
      message.channel.send(`Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\``)
    }
  }

