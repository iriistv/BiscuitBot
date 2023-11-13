const client = require('../../../index');

client.on('ready', async () => {
    const statuses = [
        () => `-help 🍪`,
        () => `${client.guilds.cache.size} serveurs 🍪`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs 🍪`,
        () => `${client.commands.size} commandes 🍪`
    ]
    let i = 0;
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'WATCHING'})
        i = ++i % statuses.length
    }, 10000)

    console.log(`${client.user.tag} connecté 🍪`);
});