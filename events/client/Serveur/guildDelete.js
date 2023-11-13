const client = require('../../../index');
const Discord = require('discord.js');
const db = require('quick.db');

client.on('guildCreate', async (guild) => {
    client.guilds.cache.get('822531997976625163').channels.cache.get('858845753492635659').send(new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor(`Suppression Serveur`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/wcYC4Qe9B3')
    .setDescription(`${client.user} vient d'etre retiré d'un serveur. Il est désormais sur \`${client.guilds.cache.size}\` serveurs !\n\n<:name_:844212523179442216> Nom du Serveur: \`${guild.name}\` (\`${guild.id}\`)\n<:owner_:844181332187283509> Créateur: <@${guild.ownerID}> (\`${guild.ownerID}\`)\n<:members_:844213377541996614> Membres: \`${guild.memberCount}\``)
    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()  
    )

    const verify = db.get(`guild_${guild.id}_muteRoleID`);
    if(verify) {
        db.delete(`guild_${guild.id}_muteRoleID`);
    } else {
        return;
    }
});