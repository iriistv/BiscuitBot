const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const db = require('quick.db');

module.exports = {
    name: 'antiwebhook',
    //aliases: [''],
    category: 'Anti-Raid',
    description: 'Renvoit le panel de configuration de l\'antiwebhook',
    usage: '',
    antiraid: true,
    permission: ['SEND_MESSAGES', 'ADMINISTRATOR'],

    run : async (client, message, args) => {        
        
        try {
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`ADMINISTRATOR\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const msgawait = await message.channel.send(`${emojis.bc_loading} Veuillez patienter ...`)
            await Promise.all(['🔑', '🧤', '🔒'].map(r => msgawait.react(r)));

            const embedReactions = await new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setTitle('AntiWebhook')
            .setDescription(`\`🔑\` Statut ➜ ${db.get(`guild_${message.guild.id}_statutAntiWebhook`) ? `${emojis.bc_on}` : `${emojis.bc_off}`}\n\`🧤\` Sanction ➜ ${db.get(`guild_${message.guild.id}_sanctionAntiWebhook`) ? `**Kick**` : `**Ban**`}\n\`🔒\` Réinitialiser`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            const embedForEdit = await msgawait.edit('', embedReactions);

            const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
            const filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;

            const collectorReaction = await new Discord.ReactionCollector(msgawait, filterReaction);
            collectorReaction.on('collect', async reaction => {
                switch (reaction.emoji.name || reaction.emoji.id) {
                    case '🔑':
                        const verifyStatut = await db.get(`guild_${message.guild.id}_statutAntiWebhook`, true);
                        if(verifyStatut) {
                            db.delete(`guild_${message.guild.id}_statutAntiWebhook`);
                        } else {
                            db.set(`guild_${message.guild.id}_statutAntiWebhook`, true);
                        }

                        const embedStatut = new Discord.MessageEmbed()

                        .setColor('#2f3136')
                        .setTitle('AntiWebhook')
                        .setDescription(`\`🔑\` Statut ➜ ${db.get(`guild_${message.guild.id}_statutAntiWebhook`) ? `${emojis.bc_on}` : `${emojis.bc_off}`}\n\`🧤\` Sanction ➜ ${db.get(`guild_${message.guild.id}_sanctionAntiWebhook`) ? `**Kick**` : `**Ban**`}\n\`🔒\` Réinitialiser`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()

                        await embedForEdit.edit('', embedStatut);
                        
                        reaction.users.remove(message.member);
                    break;
                    case '🧤':
                        const verifySanction = await db.get(`guild_${message.guild.id}_sanctionAntiWebhook`, true);
                        if(verifySanction) {
                            db.delete(`guild_${message.guild.id}_sanctionAntiWebhook`);
                        } else {
                            db.set(`guild_${message.guild.id}_sanctionAntiWebhook`, true);
                        }

                        const embedSanction = new Discord.MessageEmbed()

                        .setColor('#2f3136')
                        .setTitle('AntiWebhook')
                        .setDescription(`\`🔑\` Statut ➜ ${db.get(`guild_${message.guild.id}_statutAntiWebhook`) ? `${emojis.bc_on}` : `${emojis.bc_off}`}\n\`🧤\` Sanction ➜ ${db.get(`guild_${message.guild.id}_sanctionAntiWebhook`) ? `**Kick**` : `**Ban**`}\n\`🔒\` Réinitialiser`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()

                        await embedForEdit.edit('', embedSanction);
                        
                        reaction.users.remove(message.member);
                    break;
                    case '🔒':
                        const verifyStatutRéinitialisation = await db.get(`guild_${message.guild.id}_statutAntiWebhook`, true);
                        if(verifyStatutRéinitialisation) {
                            db.delete(`guild_${message.guild.id}_statutAntiWebhook`);
                        }

                        const verifySanctionRéinitialisation = await db.get(`guild_${message.guild.id}_sanctionAntiWebhook`, true);
                        if(verifySanctionRéinitialisation) {
                            db.delete(`guild_${message.guild.id}_sanctionAntiWebhook`);
                        }

                        const embedRéinitialisation  = new Discord.MessageEmbed()

                        .setColor('#2f3136')
                        .setTitle('AntiWebhook')
                        .setDescription(`\`🔑\` Statut ➜ ${db.get(`guild_${message.guild.id}_statutAntiWebhook`) ? `${emojis.bc_on}` : `${emojis.bc_off}`}\n\`🧤\` Sanction ➜ ${db.get(`guild_${message.guild.id}_sanctionAntiWebhook`) ? `**Kick**` : `**Ban**`}\n\`🔒\` Réinitialiser`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()

                        await embedForEdit.edit('', embedRéinitialisation);
                        
                        reaction.users.remove(message.member);
                    break;
                }
            });
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`antiwebhook\` est survenue dans **${message.guild.name}**.`)
            .addField(`__La voici:__`, `\`\`\`JS\n${err}\`\`\``)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`Erreur`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur vient d'apparaître, mon développeur a été averti.`)
            .addField(`__La voici:__`, `\`\`\`JS\n${err}\`\`\``)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
        }
    }
}