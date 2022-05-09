module.exports = {
    name: 'love',
    description: 'Love someone',
    run: async(client, message, args) => {
        if(message.author.username !== 'Riptz') message.channel.send('I love you too ' + message.author.username);
    else if(message.author.username === 'Riptz') return message.channel.send("I love you in particular DAD")
    }
}