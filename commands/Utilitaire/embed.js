const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'embed',
    //aliases: [''],
    category: 'Utilitaire',
    description: 'Renvoit un embed entièrement personnalisable',
    usage: '',
    utilitaire: true,
    permission: ['SEND_MESSAGES', 'ADMINISTRATOR'],

    run : async (client, message, args) => {        
        
        try {
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`ADMINISTRATOR\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const embedBeforeEdit = new Discord.MessageEmbed()

            .setDescription(`Embed Par Défaut`)

            const msgEmbedForEditing = await message.channel.send(embedBeforeEdit);

            const msgawait = await message.channel.send(`${emojis.bc_loading} Veuillez patienter ...`)
            await Promise.all(['✏️', '💬', '🕵️', '🔻', '🔳', '🕙', '🖼️', '🌐', '🔵', '↪️', '↩️', '📑', '✅', '❌'].map(r => msgawait.react(r)));

            const embedReactions = await new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setDescription(`Voici le panneau de configuration de l'embed ci-dessus. Pour l'utiliser, il vous faudra cliquer sur les réactions en dessous de ce message.`)
            .addFields({ name: `✏️`, value: `➜ Modifier le titre`, inline: true }, { name: `💬`, value: `➜ Modifier la description`, inline: true }, { name: `🕵️`, value: `➜ Modifier l'auteur`, inline: true }, { name: `🔻`, value: `➜ Modifier le footer`, inline: true }, { name: `🔳`, value: `➜ Modifier le thumbnail`, inline: true }, { name: `🕙`, value: `➜ Ajouter un timestamp`, inline: true }, { name: `🖼️`, value: `➜ Modifier l'image`, inline: true }, { name: `🌐`, value: `➜ Modifier l'URL`, inline: true }, { name: `🔵`, value: `➜ Modifier la couleur`, inline: true }, { name: `↪️`, value: `➜ Ajouter un field`, inline: true }, { name: `↩️`, value: `➜ Supprimer un field`, inline: true }, { name: `📑`, value: `➜ Modifier un embed`, inline: true }, { name: `✅`, value: `➜ Envoyer l'embed`, inline: true }, { name: `❌`, value: `➜ Annuler la création`, inline: true })

            msgawait.edit('', embedReactions);

            const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
            const filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;

            const collectorReaction = await new Discord.ReactionCollector(msgawait, filterReaction);
            collectorReaction.on('collect', async reaction => {
                switch (reaction.emoji.name || reaction.emoji.id) {
                    case '✏️':
                        const msgQuestionTitle = await message.channel.send(`${emojis.bc_question} Quel est le titre ?`);
                        const title = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000})).first();
                        if(title === undefined) return;
                        reaction.users.remove(message.member);
                        msgQuestionTitle.delete();
                        title.delete();
                        embedBeforeEdit.setTitle(title.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '💬':
                        const msgQuestionDescription = await message.channel.send(`${emojis.bc_question} Quelle est la description ?`);
                        const description = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000})).first();
                        if(description === undefined) return;
                        reaction.users.remove(message.member);
                        msgQuestionDescription.delete();
                        description.delete();
                        embedBeforeEdit.setDescription(description.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🕵️':
                        const msgQuestionAuthor = await message.channel.send(`${emojis.bc_question} Quel est l'auteur ?`)
                        const author = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(author === undefined) return;
                        msgQuestionAuthor.delete();
                        const msgQuestionAuthorImage = await message.channel.send(`${emojis.bc_question} Quel est l'image de l'auteur ?`)
                        const authorImage = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(authorImage === undefined) return;
                        msgQuestionAuthorImage.delete();
                        embedBeforeEdit.setAuthor(author.content, authorImage.content);
                        reaction.users.remove(message.member);
                        author.delete();
                        authorImage.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🔻':
                        const msgQuestionFooter = await message.channel.send(`${emojis.bc_question} Quel est le footer ?`);
                        const footer = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000})).first();
                        if(footer === undefined) return;
                        reaction.users.remove(message.member);
                        msgQuestionFooter.delete();
                        footer.delete();
                        embedBeforeEdit.setFooter(footer.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🔳':
                        const msgQuestionThumbnail = await message.channel.send(`${emojis.bc_question} Quel est le thumbnail ?`);
                        const thumbnail = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000})).first();
                        if(thumbnail === undefined) return;
                        if(!thumbnail.content.includes('http') || !thumbnail.content.includes('https')) return message.channel.send(`${emojis.bc_cross} Vous n'avez pas fourni le bon format, veuillez réesayer.`).then(msg => msg.delete({ timeout: 5000 }));
                        reaction.users.remove(message.member);
                        msgQuestionThumbnail.delete();
                        thumbnail.delete();
                        embedBeforeEdit.setThumbnail(thumbnail.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🕙':
                        reaction.users.remove(message.member);
                        if(embedBeforeEdit.timestamp) {
                            embedBeforeEdit.timestamp = null;
                        } else {
                            embedBeforeEdit.setTimestamp()
                        }
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🖼️':
                        const msgQuestionImage = await message.channel.send(`${emojis.bc_question} Quelle est l'image ?`);
                        const image = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(image === undefined) return;
                        if(!image.content.includes('http') || !image.content.includes('https')) return message.channel.send(`${emojis.bc_cross} Vous n'avez pas fourni le bon format, veuillez réesayer.`).then(msg => msg.delete({ timeout: 5000 }));
                        reaction.users.remove(message.member);
                        msgQuestionImage.delete();
                        image.delete();
                        embedBeforeEdit.setImage(image.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🌐':
                        const msgQuestionURL = await message.channel.send(`${emojis.bc_question} Quel est l'URL ?`);
                        const url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(url === undefined) return;
                        if(!url.content.includes('http') || !url.content.includes('https')) return message.channel.send(`${emojis.bc_cross} Vous n'avez pas fourni le bon format, veuillez réesayer.`).then(msg => msg.delete({ timeout: 5000 }));
                        reaction.users.remove(message.member);
                        msgQuestionURL.delete();
                        url.delete();
                        embedBeforeEdit.setURL(url.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '🔵':
                        const msgQuestionColor = await message.channel.send(`${emojis.bc_question} Quelle est la couleur ?`);
                        const color = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(color === undefined) return;
                        if(color.content.includes('bleu' || 'blanc' || 'rouge' || 'vert' || 'orange' || 'invisible' || 'violet' || 'rose' || 'noir' || 'gris' || 'marron' || 'brun')) return message.channel.send(`${emojis.bc_cross} Vous n'avez pas fourni le bon format, veuillez réesayer.`).then(msg => msg.delete({ timeout: 5000 }));
                        reaction.users.remove(message.member);
                        msgQuestionColor.delete();
                        color.delete();
                        embedBeforeEdit.setColor(color.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '↪️':
                        const msgQuestionFieldName = await message.channel.send(`${emojis.bc_question} Quel est le titre ?`);
                        const fieldName = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(fieldName === undefined) return;
                        const msgQuestionFieldValue = await message.channel.send(`${emojis.bc_question} Quelle est la description ?`);
                        const fieldValue = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(fieldValue === undefined) return;
                        reaction.users.remove(message.member);
                        msgQuestionFieldName.delete();
                        msgQuestionFieldValue.delete();
                        fieldName.delete();
                        fieldValue.delete();
                        embedBeforeEdit.addField(fieldName.content, fieldValue.content);
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '↩️':
                        const msgQuestionField = await message.channel.send(`${emojis.bc_question} Quel est le titre du field à supprimer ?`);
                        const fieldTitle = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(fieldTitle === undefined) return;
                        reaction.users.remove(message.member);
                        msgQuestionField.delete();
                        fieldTitle.delete();
                        let indexField = '';
                        embedBeforeEdit.fields.map(field => {
                            if(indexField !== '') return;
                            if(field.name === fieldTitle.content) indexField += embedBeforeEdit.fields.indexOf(field);
                        });
                        if(indexField === '') return message.channel.send(`${emojis.bc_cross} Aucun field n'a été trouvé.`).then(msg => msg.delete({ timeout: 5000 }));
                        delete embedBeforeEdit.fields[indexField];
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case '📑':
                        const msgQuestionChannel = await message.channel.send(`${emojis.bc_question} Quel est l'ID du salon ?`);
                        const msgChannel = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(msgChannel === undefined) return;
                        const channel = await message.guild.channels.cache.get(msgChannel.content);
                        const msgChange = await message.channel.send(`${emojis.bc_question} Quel est l'ID de l'embed ?`)
                        const msgMessage = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(msgMessage === undefined) return;
                        const messageID = msgMessage.content;
                        const msg = channel.messages.fetch(messageID).then(msgTarget => msgTarget.edit(embedBeforeEdit));
                        msgQuestionChannel.delete();
                        msgChannel.delete();
                        msgChange.delete();
                        msgMessage.delete();
                        reaction.users.remove(message.member);
                        msgawait.delete();
                        msgEmbedForEditing.delete();
                        message.channel.send(new Discord.MessageEmbed()
                        .setColor('#2f3136')
                        .setDescription(`${emojis.bc_check} Votre embed a bien été édité.`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
                        )
                    break;
                    case '✅':
                        const msgQuestionChannelSend = await message.channel.send(`${emojis.bc_question} Quel est le salon ?`);
                        const channelSend = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if(channelSend === undefined) return;
                        if(!message.guild.channels.cache.get(channelSend.content)) {
                            reaction.users.remove(message.member);
                            msgQuestionChannelSend.delete();
                            channelSend.delete();
                            return message.channel.send(`${emojis.bc_cross} Le salon fourni n'a pas été trouvé.`).then(msg => msg.delete({ timeout: 5000 }));
                        } else {
                            message.guild.channels.cache.get(channelSend.content).send(embedBeforeEdit);
                            msgQuestionChannelSend.delete();
                            channelSend.delete();
                            msgEmbedForEditing.delete();
                            msgawait.delete();
                            message.channel.send(new Discord.MessageEmbed()
                            .setColor('#2f3136')
                            .setDescription(`${emojis.bc_check} Votre embed a bien été envoyé.`)
                            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                            .setTimestamp()
                            )
                        }
                    break;
                    case '❌':
                        msgEmbedForEditing.delete();
                        msgawait.delete();
                        message.channel.send(new Discord.MessageEmbed()
                        .setColor('#2f3136')
                        .setDescription(`${emojis.bc_check} La création de votre embed a bien été annulée.`)
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
                        )
                    break;
                }
            });
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`embed\` est survenue dans **${message.guild.name}**.`)
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