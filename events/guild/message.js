
module.exports = (client, Discord, message) => {
    const prefix = '!';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    try {
        command.execute(client, Discord, message,cmd, args);
    }catch (err){
        message.reply("There was an error trying to execute that command!");
        console.error(err);

    }
}