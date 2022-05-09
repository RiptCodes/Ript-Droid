const Discord = require("discord.js");
const config = require(`./config.json`);
const dash = require(`./dashboard/settings.json`);
const colors = require("colors");
const Enmap = require("enmap");
const { DisTube } = require('distube');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const client = new Discord.Client({
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});








client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})


client.on('ready', () => {
  console.log(`${client.user.tag} is ready.`)
})

client.on('guildMemberAdd', guildMember => {
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');

  guildMember.roles.add(welcomeRole)

  const channel = guildMember.guild.channels.cache.find(channel => channel.name === 'log');

  if (!channel) return;

  const icon = guildMember.user.displayAvatarURL({ format: 'png', dynamic: true, size: 3000 });
  const randColor = ['#DAB88B','#332FD0','#46244C','#FD5D5D','#3A3845']

  const embed = new MessageEmbed()
  .setTitle(" \nhas joined the server")
  .setAuthor({ name: guildMember.user.tag, iconURL: icon})
  .setThumbnail(icon)
  .setColor(randColor[Math.floor(Math.random() * randColor.length)])
  .setImage("https://cdn.discordapp.com/attachments/960312435095523378/961280028811878430/thumb-1920-1085558.jpg")
  channel.send({ embeds: [embed] })

})

client.on('guildMemberRemove', guildMember => {
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');

  const channel = guildMember.guild.channels.cache.find(channel => channel.name === 'log');

  if (!channel) return;

  const icon = guildMember.user.displayAvatarURL({ format: 'png', dynamic: true, size: 3000 });
  const randColor = ['#DAB88B','#332FD0','#46244C','#FD5D5D','#3A3845']

  const embed = new MessageEmbed()
  .setTitle(" \nhas left the server")
  .setAuthor({ name: guildMember.user.tag, iconURL: icon})
  .setThumbnail(icon)
  .setColor(randColor[Math.floor(Math.random() * randColor.length)])
  .setImage("https://cdn.discordapp.com/attachments/960312435095523378/961280028811878430/thumb-1920-1085558.jpg")
  channel.send({ embeds: [embed] })
})



client.on('interactionCreate', async interaction => {
  const member = await interaction.message.guild.members.fetch({ 
    user: interaction.user.id,
    force: true
  })
  if(!interaction.isSelectMenu()) return;

  if(interaction.values == 'dm') {
    await interaction .deferUpdate();
    interaction.values == ''
    interaction.channel.bulkDelete(
    (await interaction.channel.messages.fetch({ limit: 100, timeout:500 })).filter(m => !m.pinned)
    )
    
    if(!member.roles.cache.has("960547547166965770")){
      await member.roles.add("960547547166965770")
      return interaction.member.send('📔Ript added your DM role ')
    }else if(member.roles.cache.has("960547547166965770")){
      await member.roles.remove("960547547166965770")
      return interaction.member.send('📔Ript removed your DM role ')
    }
    
  }
})




  



client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  client.settings.ensure(message.guild.id, {
    prefix: config.prefix,
});
  let {prefix} = client.settings.get(message.guild.id)
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})


const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({ 
      embeds:[
      new Discord.MessageEmbed()
      .setTitle("Ripts Music Man")
      .setDescription(`${client.emotes.success} Listed for play \`${song.name}\` \nRequested By ${song.user}\nDuration of song \`${song.formattedDuration}\``)
        .setImage(
          "https://bestanimations.com/media/discs/1070104039cd-animated-gif-6.gif"
          )
      ]
    }
      )
  )


  
  .on('addSong', (queue, song) =>
    queue.textChannel.send({ 
      embeds:[
      new Discord.MessageEmbed()
      .setTitle("Ripts Music Man")
      .setDescription(`${client.emotes.success} Listed for play \`${song.name}\` \nRequested By ${song.user}\nDuration of song \`${song.formattedDuration}\``)
        .setImage(
          "https://bestanimations.com/media/discs/1070104039cd-animated-gif-6.gif"
          )
      ]
    }
  )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.queue} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send("hello"))


.on('finish', queue => 
  queue.textChannel.fetch({ limit: 1 }).then(messages => {
  let lastMessage = messages.first();  
  return lastMessage.delete()
}))


client.on("messageCreate", (message) => {
  if (!message.guild || message.author.bot) return;
  client.settings.ensure(message.guild.id, {
    prefix: config.prefix,
    hellomsg: "Hello World!",
    roles: [],
  });
  //Get the settings
  let { prefix, hellomsg, roles } = client.settings.get(message.guild.id)
  //Get the arguments
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift() ?.toLowerCase();
  //If there is a command, execute it
  try{
    if (cmd && cmd.length > 0 && message.content.startsWith(prefix)) {
    if (cmd == "prefix") {
      message.reply({
      embeds:[
        new Discord.MessageEmbed()
          .setTitle(`Server: ${message.guild.name}`)
          .setAuthor(`Commands of ${client.user.username}`)
          .setThumbnail("https://cdn.discordapp.com/attachments/960559868991930439/970109078028320768/FINAL-RIPT_2.jpg")
          .setDescription(`Server Prefix: ${prefix}`)
          .addFields(
		      { 
          name: 'Dashboard',
          value:`Current prefix is \`${prefix}\`!\n**Go to the Dashboard to change it!**\n`,
          value:
         '[Dashboard](https://riptboard.rayanshamsi.repl.co/dashboard/)'
          })
          .setColor('#0099ff')
      ]
        })
    }
  }
  }catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})

client.settings = new Enmap({ name: "settings", dataDir: "./databases/settings" });


client.on("ready", () => {
  require("./dashboard/index.js")(client);
})

client.on("ready",() => {

client.user.setActivity(`!help / Ript loves me`,{type: "LISTENING"});
});



client.login(config.token)



