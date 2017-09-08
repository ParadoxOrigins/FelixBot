const moment = require('moment');

module.exports = async(client, guild) => {
    if (client.guilds.get('328842643746324481')) {
        try {
            client.guilds.get('328842643746324481').channels.get('328847359100321792').send({
                embed: {
                    title: ':outbox_tray: I left the guild ' + guild.name,
                    description: `**ID:** ${guild.id}\n**Members:** ${guild.members.filter(m => !m.user.bot).size}\n**Bots:** ${guild.members.filter(m => m.user.bot).size}\n**Owner:** ${guild.owner.user.tag}\n**Joined:** ${moment().to(guild.joinedAt)}`,
                    timestamp: new Date(),
                    image: {
                        url: guild.iconURL
                    }
                }
            });
        } catch (err) {
            console.error(err);
            client.Raven.captureException(err);
        }
        const updateDbl = await client.updateDbl();
        client.latestDblUpdate = {
            date: new Date(),
            timestamp: Date.now(),
            sucess: updateDbl.sucess
        }
    }
}