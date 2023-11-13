const client = require('../../../index');
const Discord = require('discord.js');
const emojis = require('../../../data/emojis.json');
const Guild = require('../../../models/Guild');
const db = require('quick.db');
const moment = require('moment');

client.on('guildMemberAdd', async (member) => {
    try {
        const user = client.users.cache.get(member.user.id);
        if((Date.now() - user.createdAt) <= 172800000 /*2 jours*/) {
            const antiNewAccountStatut = db.get(`guild_${member.guild.id}_statutAntiNewAccount`, true);
            if(antiNewAccountStatut) {
                const antiNewAccountSanction = db.get(`guild_${member.guild.id}_sanctionAntiNewAccount`, true);
                if(antiNewAccountSanction) {
                    const embed = new Discord.MessageEmbed()
            
                    .setColor('#2f3136')
                    .setAuthor(`Expulsion`, `${member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                    .addFields({ name: `Utilisateur`, value: `${member.user} (${member.user.id})`, inline: true }, { name: `Date de création`, value: `${moment(user.createdAt).format('DD/MM/YYYY [à] HH:mm:ss')}`, inline: true }, { name: `Raison`, value: `Anti-NewAccount`, inline: false })
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
    
                    const embedMember = new Discord.MessageEmbed()
        
                    .setColor('#2f3136')
                    .setAuthor(`${member.user.username} - Expulsion`, `${member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                    .setImage('https://zupimages.net/up/21/23/33c7.png')
                    .setDescription(`${emojis.bc_welcome} Bonjour/Bonsoir ${member},\nJe viens de vous **expulser** du serveur **${member.guild.name}** car vous êtes considéré comme **un nouveau compte Discord**. Si ce n'est pas le cas, je vous invite à rejoindre le **[serveur Support](https://discord.gg/zepjJrAgPx)** pour contacter mon développeur et ainsi, trouver une solution.\nBonne journée/soirée !`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
    
                    try {
                        member.send(embedMember);
                    } catch (err) {
                        return;
                    }
        
                    setTimeout(async () => {
                        try {
                            await member.kick(`Anti-NewAccount`);
                        } catch (err) {
                            return;
                        }
                    }, 500);
                } else {
                    const embed = new Discord.MessageEmbed()
            
                    .setColor('#2f3136')
                    .setAuthor(`Bannissement`, `${member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                    .addFields({ name: `Utilisateur`, value: `${member.user} (${member.user.id})`, inline: true }, { name: `Date de création`, value: `${moment(user.createdAt).format('DD/MM/YYYY [à] HH:mm:ss')}`, inline: true }, { name: `Raison`, value: `Anti-NewAccount`, inline: false })
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
        
                    const embedMember = new Discord.MessageEmbed()
        
                    .setColor('#2f3136')
                    .setAuthor(`${member.user.username} - Bannissement`, `${member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                    .setImage('https://zupimages.net/up/21/23/33c7.png')
                    .setDescription(`${emojis.bc_welcome} Bonjour/Bonsoir ${member},\nJe viens de vous **bannir** du serveur **${member.guild.name}** car vous êtes considéré comme **un nouveau compte Discord**. Si ce n'est pas le cas, je vous invite à rejoindre le **[serveur Support](https://discord.gg/zepjJrAgPx)** pour contacter mon développeur et ainsi, trouver une solution.\nBonne journée/soirée !`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
    
                    try {
                        member.send(embedMember);
                    } catch (err) {
                        return;
                    }
    
                    setTimeout(async () => {
                        try {
                            await member.ban({ reason: `Anti-NewAccount` });
                        } catch (err) {
                            return;
                        }
                    }, 500);
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