const { ApplicationCommandOptionType } = require('discord.js');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');
const { useQueue } = require('discord-player');

module.exports = {
  name: 'volume',
  description: 'Change the volume.',
  options: [
    {
      name: 'volume',
      type: ApplicationCommandOptionType.Integer,
      description: 'Number between 0-200',
      required: true,
    },
  ],

  async execute(interaction, player) {
    try {
      if (!VoiceChannel(interaction)) return;
      
      const queue = useQueue(interaction.guild);
      const volume = interaction.options.getInteger('volume');

      await interaction.deferReply();

      if (!queue) {
        return void interaction.followUp({
          embeds: [
            {
              description: 'No music is currently playing!',
              color: colors.error,
            },
          ],
        });
      }

      if (volume > 200) {
        return void interaction.followUp({
          embeds: [
            {
              description: 'Max volume is 200%!',
              color: colors.error,
            },
          ],
        });
      }

      try {
        queue.node.setVolume(volume);
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
