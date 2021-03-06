class Cuddle {
    constructor() {
        this.help = {
            name: 'cuddle',
            description: 'cuddle someone',
            usage: 'cuddle [user_resolvable]'
        };
        this.conf = {
            require: "wolkeImageKey"
        }
    }

    run(client, message, args) {
        return new Promise(async(resolve, reject) => {
            const request = require("../../util/modules/request.js");
            try {
                let result = await request.get("https://api.weeb.sh/images/random?type=cuddle&filetype=gif", { 'Authorization': `Bearer ${client.config.wolkeImageKey}`, 'User-Agent': 'FelixBot' });
                let users = message.guild ? await message.getUserResolvable() : {};
                if (!result.data || !result.data.url) return resolve(await message.channel.createMessage(":x: An error occurred :v"));
                resolve(await message.channel.createMessage({
                    embed: {
                        description: users.first && users.first() ? `Hey ${users.map(u => '**' + u.tag + '**').join(", ")}, you've just been cuddled by **${message.author.tag}**` : "",
                        image: {
                            url: result.data.url
                        },
                        footer: {
                            text: `Powered by https://weeb.sh/`
                        }
                    }
                }));
            } catch (err) {
                reject(err, message);
            }
        });
    }
}

module.exports = new Cuddle();