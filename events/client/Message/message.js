const client = require('../../../index');
const Discord = require('discord.js');
const config = require('../../../data/config.json');
const emojis = require('../../../data/emojis.json');
const Guild = require('../../../models/Guild');
const db = require('quick.db');

const usersEveryoneMap = new Map();
const usersSpamMap = new Map();

client.on('message', async (message) => {
    /*if(message.channel.id == "858912024079761458" && message.author.id == "858913354822320158" && message.content == "!!ping") {
        message.channel.send("...").then((m) => {
            m.edit(`Bot:${m.createdTimestamp - message.createdTimestamp}\nAPI:${client.ws.ping}`)
        });
    }*/

    //if(message.author.id !== '769577099618811935') return;

    if(!message.guild) return;
    if(!message.channel.type === "dm") return;
    
    // Anti-Spam
    try {
        const antiSpamStatut = db.get(`guild_${message.guild.id}_statutAntiSpam`, true);
        if(antiSpamStatut) {
            const antiSpamSanction = db.get(`guild_${message.guild.id}_sanctionAntiSpam`, true);
            if(antiSpamSanction) {
                if(usersSpamMap.has(message.author.id)) {
                    const userData = usersSpamMap.get(message.author.id);
                    let { msgCount } = userData;
                    msgCount += 1;
                    userData.msgCount = msgCount;
                    usersSpamMap.set(message.author.id, userData);
                    if(msgCount >= 5) {
                        message.guild.channels.cache.forEach(async salon => {
                            const messages = salon.messages.fetch()
                            const userMessages = (messages).filter(
                                (m) => m.author.id === message.author.id
                            );
                            await bulkDelete(userMessages);
                        });
                    }
                    if(msgCount === 10) {
                        const embed = new Discord.MessageEmbed()
            
                        .setColor('#2f3136')
                        .setAuthor(`Expulsion`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                        .addFields({ name: `Utilisateur`, value: `${message.member.user} (${message.member.user.id})`, inline: true }, { name: `Message(s) envoyé(s)`, value: `${msgCount}`, inline: true }, { name: `Raison`, value: `Anti-Spam`, inline: false })
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
    
                        let logsInDatabase = await Guild.findOne({ serverID: message.guild.id, reason: 'logs' });
                        let logsChannel;
                        if(!logsInDatabase) {
                            logsChannel = null;
                        } else {
                            logsChannel = message.guild.channels.cache.get(logsInDatabase.channelID);
                        }
            
                        if(logsChannel) logsChannel.send(embed);
    
                        const embedMember = new Discord.MessageEmbed()
        
                        .setColor('#2f3136')
                        .setAuthor(`${message.member.user.username} - Expulsion`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                        .setImage('https://zupimages.net/up/21/23/33c7.png')
                        .setDescription(`${emojis.bc_welcome} Bonjour/Bonsoir ${message.member},\nJe viens de vous **expulser** du serveur **${message.guild.name}** car vous avez été détecté par mon **anti-spam**. Si ce n'est pas le cas, je vous invite à rejoindre le **[serveur Support](https://discord.gg/zepjJrAgPx)** pour contacter mon développeur et ainsi, trouver une solution.\nBonne journée/soirée !`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
        
                        try {
                            message.member.send(embedMember);
                        } catch (err) {
                            return;
                        }
            
                        setTimeout(async () => {
                            try {
                                //await message.guild.member(message.author.id).kick(`Anti-Spam`);
                            } catch (err) {
                                return;
                            }
                        }, 500);
                    }
                } else {
                    usersSpamMap.set(message.author.id, {
                        msgCount: 1
                    });
                    setTimeout(async () => {
                        usersSpamMap.delete(message.author.id);
                    }, 20000);
                }
            } else {
                if(usersSpamMap.has(message.author.id)) {
                    const userData = usersSpamMap.get(message.author.id);
                    let { msgCount } = userData;
                    msgCount += 1;
                    userData.msgCount = msgCount;
                    usersSpamMap.set(message.author.id, userData);
                    if(msgCount >= 3) {
                        const member = message.author.id;
                        const messages = message.guild.messages.fetch();
                        if(member) {
                            const userMessages = (await messages).filter(
                                (m) => m.author.id === message.author.id
                            )
                            await message.guild.bulkDelete(userMessages);
                        }
                    }
                    if(msgCount === 6) {
                        const embed = new Discord.MessageEmbed()
            
                        .setColor('#2f3136')
                        .setAuthor(`Bannissement`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                        .addFields({ name: `Utilisateur`, value: `${message.member.user} (${message.member.user.id})`, inline: true }, { name: `Message(s) envoyé(s)`, value: `${msgCount}`, inline: true }, { name: `Raison`, value: `Anti-Spam`, inline: false })
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
    
                        let logsInDatabase = await Guild.findOne({ serverID: message.guild.id, reason: 'logs' });
                        let logsChannel;
                        if(!logsInDatabase) {
                            logsChannel = null;
                        } else {
                            logsChannel = message.guild.channels.cache.get(logsInDatabase.channelID);
                        }
            
                        if(logsChannel) logsChannel.send(embed);
    
                        const embedMember = new Discord.MessageEmbed()
        
                        .setColor('#2f3136')
                        .setAuthor(`${message.member.user.username} - Bannissement`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                        .setImage('https://zupimages.net/up/21/23/33c7.png')
                        .setDescription(`${emojis.bc_welcome} Bonjour/Bonsoir ${message.member},\nJe viens de vous **bannir** du serveur **${message.guild.name}** car vous avez été détecté par mon **anti-spam**. Si ce n'est pas le cas, je vous invite à rejoindre le **[serveur Support](https://discord.gg/zepjJrAgPx)** pour contacter mon développeur et ainsi, trouver une solution.\nBonne journée/soirée !`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
        
                        try {
                            message.member.send(embedMember);
                        } catch (err) {
                            return;
                        }
            
                        setTimeout(async () => {
                            try {
                                await message.guild.member(message.author.id).ban({ reason: `Anti-Spam` });
                            } catch (err) {
                                return;
                            }
                        }, 500);
                    }
                } else {
                    usersSpamMap.set(message.author.id, {
                        msgCount: 1
                    });
                    setTimeout(async () => {
                        usersSpamMap.delete(message.author.id);
                    }, 20000);
                }
            }
        }
    } catch (err) {
        return;
    }

    if(message.author.bot) return;
    
    // Anti-Everyone
    try {
        if(message.mentions.everyone) {
            const antiEveryoneStatut = db.get(`guild_${message.guild.id}_statutAntiEveryone`, true);
            if(antiEveryoneStatut) {
                const antiEveryoneSanction = db.get(`guild_${message.guild.id}_sanctionAntiEveryone`, true);
                if(antiEveryoneSanction) {
                    if(usersEveryoneMap.has(message.author.id)) {
                        const userData = usersEveryoneMap.get(message.author.id);
                        let { numberEveryoneSent } = userData;
                        numberEveryoneSent += 1;
                        userData.numberEveryoneSent = numberEveryoneSent;
                        usersEveryoneMap.set(message.author.id, userData);
                        if(numberEveryoneSent >= 3) {
                            message.delete();
                        }
                        if(numberEveryoneSent === 6) {
                            const embed = new Discord.MessageEmbed()
                
                            .setColor('#2f3136')
                            .setAuthor(`Expulsion`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                            .addFields({ name: `Utilisateur`, value: `${message.member.user} (${message.member.user.id})`, inline: true }, { name: `Mention(s) envoyée(s)`, value: `${numberEveryoneSent}`, inline: true }, { name: `Raison`, value: `Anti-Everyone`, inline: false })
                            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                            .setTimestamp()
    
                            let logsInDatabase = await Guild.findOne({ serverID: message.guild.id, reason: 'logs' });
                            let logsChannel;
                            if(!logsInDatabase) {
                                logsChannel = null;
                            } else {
                                logsChannel = message.guild.channels.cache.get(logsInDatabase.channelID);
                            }
                
                            if(logsChannel) logsChannel.send(embed);
    
                            const embedMember = new Discord.MessageEmbed()
            
                            .setColor('#2f3136')
                            .setAuthor(`${message.member.user.username} - Expulsion`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                            .setImage('https://zupimages.net/up/21/23/33c7.png')
                            .setDescription(`${emojis.bc_welcome} Bonjour/Bonsoir ${message.member},\nJe viens de vous **expulser** du serveur **${message.guild.name}** car vous avez mentionné trop de fois **@everyone**. Si ce n'est pas le cas, je vous invite à rejoindre le **[serveur Support](https://discord.gg/zepjJrAgPx)** pour contacter mon développeur et ainsi, trouver une solution.\nBonne journée/soirée !`)
                            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                            .setTimestamp()
            
                            try {
                                message.member.send(embedMember);
                            } catch (err) {
                                return;
                            }
                
                            setTimeout(async () => {
                                try {
                                    await message.guild.member(message.author.id).kick(`Anti-Everyone`);
                                } catch (err) {
                                    return;
                                }
                            }, 500);
                        }
                    } else {
                        usersEveryoneMap.set(message.author.id, {
                            numberEveryoneSent: 1
                        });
                        setTimeout(async () => {
                            usersEveryoneMap.delete(message.author.id);
                        }, 20000);
                    }
                } else {
                    if(usersEveryoneMap.has(message.author.id)) {
                        const userData = usersEveryoneMap.get(message.author.id);
                        let { numberEveryoneSent } = userData;
                        numberEveryoneSent += 1;
                        userData.numberEveryoneSent = numberEveryoneSent;
                        usersEveryoneMap.set(message.author.id, userData);
                        if(numberEveryoneSent >= 3) {
                            message.delete();
                        }
                        if(numberEveryoneSent === 6) {
                            const embed = new Discord.MessageEmbed()
                
                            .setColor('#2f3136')
                            .setAuthor(`Bannissement`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                            .addFields({ name: `Utilisateur`, value: `${message.member.user} (${message.member.user.id})`, inline: true }, { name: `Mention(s) envoyée(s)`, value: `${numberEveryoneSent}`, inline: true }, { name: `Raison`, value: `Anti-Everyone`, inline: false })
                            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                            .setTimestamp()
    
                            let logsInDatabase = await Guild.findOne({ serverID: message.guild.id, reason: 'logs' });
                            let logsChannel;
                            if(!logsInDatabase) {
                                logsChannel = null;
                            } else {
                                logsChannel = message.guild.channels.cache.get(logsInDatabase.channelID);
                            }
                
                            if(logsChannel) logsChannel.send(embed);
    
                            const embedMember = new Discord.MessageEmbed()
            
                            .setColor('#2f3136')
                            .setAuthor(`${message.member.user.username} - Bannissement`, `${message.member.user.displayAvatarURL({ dynamic: true })}`, 'https://discord.gg/zepjJrAgPx')
                            .setImage('https://zupimages.net/up/21/23/33c7.png')
                            .setDescription(`${emojis.bc_welcome} Bonjour/Bonsoir ${message.member},\nJe viens de vous **bannir** du serveur **${message.guild.name}** car vous avez mentionné trop de fois **@everyone**. Si ce n'est pas le cas, je vous invite à rejoindre le **[serveur Support](https://discord.gg/zepjJrAgPx)** pour contacter mon développeur et ainsi, trouver une solution.\nBonne journée/soirée !`)
                            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                            .setTimestamp()
            
                            try {
                                message.member.send(embedMember);
                            } catch (err) {
                                return;
                            }
                
                            setTimeout(async () => {
                                try {
                                    await message.guild.member(message.author.id).ban({ reason: `Anti-Everyone` });
                                } catch (err) {
                                    return;
                                }
                            }, 500);
                        }
                    } else {
                        usersEveryoneMap.set(message.author.id, {
                            numberEveryoneSent: 1
                        });
                        setTimeout(async () => {
                            usersEveryoneMap.delete(message.author.id);
                        }, 20000);
                    }
                }
            } else {
                return;
            }
        }
    } catch (err) {
        return;
    }
    
    const prefix = config.default_prefix;
    if(!message.content.startsWith(prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(cmd.length == 0) return;

    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args);

    if(!command) return;

    client.options.restTimeOffset = 0;
});