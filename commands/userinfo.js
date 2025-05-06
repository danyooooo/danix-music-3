const { ApplicationCommandOptionType } = require('discord.js');
const colors = require('../colors.json');

module.exports = {
  name: 'userinfo',
  description: 'Get information about a user.',
  options: [
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'The user you want to get info about',
      required: true,
    },
  ],

  execute(interaction) {
    try {
      const user = interaction.options.getUser('user');

      interaction.reply({
        embeds: [
          {
            title: 'User Info',
            fields: [
              { name: 'Name', value: `\`${user.username}\``, inline: true },
              { name: 'ID', value: `\`${user.id}\``, inline: true },
              { name: 'Date Joined', value: `\`${user.createdAt}\`` },
              { name: 'Avatar', value: `${user.displayAvatarURL()}`, dynamic: true },
            ],
            image: (
              {
                value: `${user.avatarURL()}`
              }
            ),
            color: colors.misc,
          },
        ],
        
        /*content: `Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
        flags: MessageFlags.Ephemeral,*/
      });
    } catch (error) {
      return void interaction.followUp({
        embeds: [
          {
            title: 'An Error Occured',
            description: `Error: \`${error}\``,
            color: colors.error,
          },
        ],
      });
    }
  },
};
