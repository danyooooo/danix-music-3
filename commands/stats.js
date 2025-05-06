const colors = require('../colors.json');

module.exports = {
    name: 'stats',
    description: 'Informations about this bot',
    
    execute(interaction) {
        let seconds = Math.floor(interaction.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        
        interaction.reply({
            embeds: [
                {
                    title: `${interaction.client.user.username} Stats`,
                    fields: [
                        { name: 'Commands', value: `\`${interaction.client.commands.size}\``, inline: true },
                        { name: 'Channels', value: `\`${interaction.client.channels.cache.size}\``, inline: true },
                        { name: 'Users', value: `\`${interaction.client.users.cache.size}\``, inline: true },
                        { name: 'Guilds', value: `\`${interaction.client.guilds.cache.size}\``, inline: true },
                        { name: 'Ping', value: `\`${Math.round(interaction.client.ws.ping)}ms\``, inline: true },
                        { name: 'Uptime', value: `\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``, inline: true },
                    ],
                    footer: (
                        {
                            text: 'More info coming soon!'
                        }
                    ),
                    color: colors.misc,
                },
            ],
        });
    }
}