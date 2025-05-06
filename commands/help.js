const fs = require('fs');
const { MessageFlags } = require('discord.js');
const colors = require('../colors.json');

module.exports = {
  name: 'help',
  description: 'List all available commands.',

  execute(interaction) {
    try {
      let str = '';
      const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`./${file}`);
        str += `\`/${command.name}\` : ${command.description} \n`;
      }

      const user = interaction.options.getUser('user');
      
      return void interaction.reply({
        embeds: [
          {
            title: 'Available Commands',
            description: str,
            footer: (
              {
                text: 'If any commands is not working, please report it to the developer!',
              }
            ),
            color: colors.misc,
          },
        ],
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      return void interaction.reply({
        embeds: [
          {
            title: 'An Error Occured',
            description: `Error: \`${error}\``,
            colors: colors.error,
          },
        ],
      });
    }
  },
};