const registerCase = require("../../util/helpers/registerCase.js");

class Unmute {
    constructor() {
        this.help = {
            name: 'unmute',
            usage: 'unmute <user_resolvable> -r <reason>',
            description: 'Unmute a member, reason is optional and can be added after. Screenshot is optional as well, it may be followed by the (single) url of the screenshot or stay blank if the screenshot is attached'
        }
        this.conf = {
            guildOnly: true,
            requirePerms: ['manageRoles']
        }
    }

    run(client, message, args) {
        return new Promise(async(resolve, reject) => {
            try {
                const guildEntry = client.guildData.get(message.guild.id);
                const mutedRole = message.guild.roles.find(r => r.name === "muted");
                if (!mutedRole) return resolve(await message.channel.createMessage(`:x: There is no \`muted\` role on this server`));
                if (!args[0]) return resolve(await message.channel.createMessage(`:x: Well you might want to specify a user to unmute`));
                let memberToUnmute = await message.getUserResolvable({
                    max: 1,
                    guildOnly: true
                });
                memberToUnmute = memberToUnmute.first() ? message.guild.members.get(memberToUnmute.first().id) : false;
                let reason = new RegExp(/\-r/gim).test(args.join(" ")) ? args.join(" ").split(/\-r/gim)[1].trim() : undefined;
                let screenshot = message.attachments[0] ? message.attachments[0].url : (new RegExp(/\-s/gim).test(args.join(" ")) ? args.join(" ").split(/\-s/gim)[1].trim() : undefined);
                if (!new RegExp(/\.jpg|.png|.gif|.jpeg/gim).test(screenshot)) screenshot = undefined;
                if (new RegExp(/\-s/gim).test(reason)) reason = reason.split(/\-s/gim)[0].trim();
                if (!memberToUnmute) return resolve(await message.channel.createMessage(`:x: I couldn't find the user you specified`));
                if (!memberToUnmute.roles.find(r => r === mutedRole.id)) return resolve(await message.channel.createMessage(`:x: The user \`${message.author.tag}\` is not muted`));
                if (message.guild.members.get(client.user.id).highestRole && mutedRole.position >= message.guild.roles.get(message.guild.members.get(client.user.id).highestRole).position) {
                    return resolve(await message.channel.createMessage(`:x: The \`muted\` role seems to be higher than my highest role, therefore i can't unmute :v`));
                }
                await message.guild.members.get(memberToUnmute.id).removeRole(mutedRole.id, `Unmuted by ${message.author.tag}: ${reason ? (reason.length > 450 ? reason.substr(0, 410) + "... Reason is too long for the audit log, see case #" + guildEntry.modLog.cases.length + 1 : reason) : "No reason specified"}`);
                if (guildEntry.modLog.channel) {
                    await registerCase(client, {
                        user: memberToUnmute.user,
                        action: "unmute",
                        moderator: message.author,
                        reason: reason,
                        guild: message.guild,
                        screenshot: screenshot
                    });
                }
                resolve(await message.channel.createMessage(`:white_check_mark: Successfully unmuted the user \`${memberToUnmute.tag}\``));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new Unmute();