const client = require('../../../index');
const Discord = require('discord.js');
const emojis = require('../../../data/emojis.json');
const Guild = require('../../../models/Guild');
const db = require('quick.db');

client.on('guildMemberAdd', async (member) => {
    try {
        if(member.user.bot) {
            const antiBotStatut = db.get(`guild_${member.guild.id}_statutAntiBot`, true);
            if(antiBotStatut) {
                const antiBotSanction = db.get(`guild_${member.guild.id}_sanctionAntiBot`, true);
                if(antiBotSanction) {
                    member.guild.fetchAuditLogs().then(async (logs) => {
                        let adder = '';
                        if(logs.entries.first().action === 'BOT_ADD') {
                            adder = logs.entries.first().executor.id;
                        }
            
                        const embed = new Discord.MessageEmbed()
            
                        .setColor('#2f3136')
                        .setAuthor(`Expulsion`, `${member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                        .addFields({ name: `Utilisateur`, value: `${member.user} (${member.user.id})`, inline: true }, { name: `Ajouteur`, value: `${adder ? `<@${adder}> (**${adder}**)` : `Utilisateur Inconnu`}`, inline: true }, { name: `Raison`, value: `Anti-Bot`, inline: false })
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
            
                        let logsInDatabase = await Guild.findOne({ serverID: member.guild.id, reason: 'logs' });
                        let logsChannel;
                        if(!logsInDatabase) {
                            logsChannel = null;
                        } else {
                            logsChannel = member.guild.channels.cache.get(logsInDatabase.channelID);
                        }
            
                        if(logsChannel) logsChannel.send(embed);
                    });

                    try {
                        await member.kick(`Anti-Bot`);
                    } catch (err) {
                        return;
                    }
                } else {
                    member.guild.fetchAuditLogs().then(async (logs) => {
                        let adder = '';
                        if(logs.entries.first().action === 'BOT_ADD') {
                            adder = logs.entries.first().executor.id;
                        }
            
                        const embed = new Discord.MessageEmbed()
            
                        .setColor('#2f3136')
                        .setAuthor(`Bannissement`, `${member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                        .setImage('https://zupimages.net/up/21/23/33c7.png')
                        .addFields({ name: `Utilisateur`, value: `${member.user} (${member.user.id})`, inline: true }, { name: `Ajouteur`, value: `${adder ? `<@${adder}> (**${adder}**)` : `Utilisateur Inconnu`}`, inline: true }, { name: `Raison`, value: `Anti-Bot`, inline: false })
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
            
                        let logsInDatabase = await Guild.findOne({ serverID: member.guild.id, reason: 'logs' });
                        let logsChannel;
                        if(!logsInDatabase) {
                            logsChannel = null;
                        } else {
                            logsChannel = member.guild.channels.cache.get(logsInDatabase.channelID);
                        }
            
                        if(logsChannel) logsChannel.send(embed);
                    });
        
                    try {
                        await member.ban({ reason: `Anti-Bot` });
                    } catch (err) {
                        return;
                    }
                }
            } else {
                return;
            }
        } else {
            return;
        }
    } catch (err) {
        return;
    }
});