const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'help',
    aliases: ['aide'],
    category: 'Informations',
    description: 'Renvoit la liste complète des commandes du bot',
    informations: true,
    permission: ['SEND_MESSAGES'],
    usage: '[commande]',

    run : async (client, message, args) => {
        
        try {
            const member = message.member;
            const prefix = "-";
    
            if(args[0] === 'commands') {
                const embed = new Discord.MessageEmbed()
    
                .setColor('#2f3136')
                .setAuthor(`Menu d'Aide`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
                .addField(`${emojis.bc_administration} Administration (${client.commands.filter(command => command.administration).size})`, `>>> ${client.commands.filter(command => command.administration).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_modération} Modération (${client.commands.filter(command => command.modération).size})`, `>>> ${client.commands.filter(command => command.modération).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_antiraid} Anti-Raid (${client.commands.filter(command => command.antiraid).size})`, `>>> ${client.commands.filter(command => command.antiraid).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_configuration} Configuration (${client.commands.filter(command => command.configuration).size})`, `>>> ${client.commands.filter(command => command.configuration).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_utilitaire} Utilitaire (${client.commands.filter(command => command.utilitaire).size})`, `>>> ${client.commands.filter(command => command.utilitaire).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_fun} Fun (${client.commands.filter(command => command.fun).size})`, `> ${client.commands.filter(command => command.fun).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_informations} Informations (${client.commands.filter(command => command.informations).size})`, `>>> ${client.commands.filter(command => command.informations).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_musique} Musique (${client.commands.filter(command => command.musique).size})`, `>>> ${client.commands.filter(command => command.musique).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`${emojis.bc_giveaways} Giveaways (${client.commands.filter(command => command.giveaways).size})`, `>>> ${client.commands.filter(command => command.giveaways).map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`\u200B`, `${emojis.bc_liens} [Support](https://discord.gg/zepjJrAgPx)・[Ajoutez-moi](https://discord.com/oauth2/authorize?client_id=814886281984737340&scope=bot&permissions=2147483647)`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
    
                message.channel.send(embed);
            } else if(args[0]) {
                const command = client.commands.get(args[0]) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0]));
                if(!command) return message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_cross} la commande \`${args.join(' ')}\` n'existe pas.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
        
                const embed = new Discord.MessageEmbed()
        
                .setColor('#2f3136')
                .setAuthor(`Menu d'Aide`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
                .addField(`Commande`, `${command.name ? `\`${command.name}\`` : 'Aucun Nom'}`)
                .addField(`Aliases`, `${command.aliases ? `\`${command.aliases.join("` `")}\`` : 'Aucun Aliases'}`)
                .addField(`Description`, `${command.description ? command.description : 'Aucune Description'}`)
                .addField(`Utilisation`, `${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``}`)
                .addField(`Permission Réquise`, `${command.permission ? `\`${command.permission.join("` `")}\`` : 'Aucune Permission'}`)
                .addField(`Informations`, `Argument obligatoire: \`<>\`\nArgument facultatif: \`[]\``)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
        
                message.channel.send(embed);
            }
    
            const embed = new Discord.MessageEmbed()
    
            .setColor('#2f3136')
            .setAuthor(`Menu d'Aide`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`${emojis.bc_rules} Le prefix de ce serveur est: \`${prefix}\`.\n${emojis.bc_informations} Pour obtenir des informations sur une commande, faites \`${prefix}help <commande>\`.\n${emojis.bc_dossier} Si vous souhaitez obtenir la liste complète de mes commandes, tapez \`${prefix}help commands\` ou bien, réagissez avec la réaction de ce message.`)
            .addField(`\u200B`, `${emojis.bc_liens} [Support](https://discord.gg/zepjJrAgPx)・[Ajoutez-moi](https://discord.com/oauth2/authorize?client_id=814886281984737340&scope=bot&permissions=2147483647)`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
    
            if(!args[0]) {
                message.channel.send(embed).then((m) => {
                m.react('💩')
                const filtro = (reaction, user) => {
                    return user.id == message.author.id;
                };
                m.awaitReactions(filtro, {
                    max: 1,
                    time: 86400000,
                    errors: ["time"]
                }).catch(() => {
    
                }).then(async(coleccionado) => {
                    const reaccion = coleccionado.first();
                    if(reaccion.emoji.name === '💩') {
                        reaccion.users.remove(member);
                        reaccion.users.remove(client.user.id);
    
                        const helpEmbed = new Discord.MessageEmbed()
    
                        .setColor('#2f3136')
                        .setAuthor(`Menu d'Aide`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
                        .addField(`${emojis.bc_administration} Administration (${client.commands.filter(command => command.administration).size})`, `> ${client.commands.filter(command => command.administration).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_modération} Modération (${client.commands.filter(command => command.modération).size})`, `> ${client.commands.filter(command => command.modération).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_antiraid} Anti-Raid (${client.commands.filter(command => command.antiraid).size})`, `> ${client.commands.filter(command => command.antiraid).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_configuration} Configuration (${client.commands.filter(command => command.configuration).size})`, `> ${client.commands.filter(command => command.configuration).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_utilitaire} Utilitaire (${client.commands.filter(command => command.utilitaire).size})`, `> ${client.commands.filter(command => command.utilitaire).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_fun} Fun (${client.commands.filter(command => command.fun).size})`, `> ${client.commands.filter(command => command.fun).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_informations} Informations (${client.commands.filter(command => command.informations).size})`, `> ${client.commands.filter(command => command.informations).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_musique} Musique (${client.commands.filter(command => command.musique).size})`, `> ${client.commands.filter(command => command.musique).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`${emojis.bc_giveaways} Giveaways (${client.commands.filter(command => command.giveaways).size})`, `>>> ${client.commands.filter(command => command.giveaways).map(command => `\`${command.name}\``).join(', ')}`)
                        .addField(`\u200B`, `${emojis.bc_liens} [Support](https://discord.gg/zepjJrAgPx)・[Ajoutez-moi](https://discord.com/oauth2/authorize?client_id=814886281984737340&scope=bot&permissions=2147483647)`)
                        .setTimestamp()
                        .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
    
                            await m.edit('', helpEmbed);
                        } else {
                            return;
                        }
                    });
                });
            }
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`help\` est survenue dans **${message.guild.name}**.`)
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