module.exports = {
    name: 'ping',
    description: 'Ping! Command',
    run: async (client, message) => {
        var speed = ["https://www.youtube.com/shorts/abxmdigmpMU", "https://www.youtube.com/shorts/oljoYj34ZCs", "https://www.youtube.com/shorts/CRilAYdek2Y", "https://www.youtube.com/shorts/Hrl1qJ9l_lM", "https://www.youtube.com/shorts/JWPESjHnF-o", "https://www.youtube.com/shorts/Tsi4zyf-HQI", "https://www.youtube.com/shorts/pHML23bQFKw", "https://www.youtube.com/shorts/ovjw8NuoC_0", "https://www.youtube.com/shorts/CjdDRqx28Nk"]
        var random = Math.floor(Math.random() * speed.length);
        let lastRandom = Math.floor(Math.random() * speed.length);
        //check if random repeats
        if (random === lastRandom) {
            random = Math.floor(Math.random() * speed.length);
        }

        message.channel.send(`F$%£ YOUR PING PONG \n ${message.member} here is a video of IshowSpeed's \n ${speed[random]}`);
    }
}