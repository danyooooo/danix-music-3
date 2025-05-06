const { ApplicationCommandOptionType } = require('discord.js');
const { useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'remove',
  description: 'Remove a song from the queue.',
  options: [
    {
      name: 'number',
      type: ApplicationCommandOptionType.Integer,
      description: 'The queue number you want to remove',
      required: true,
    },
  ],

  async execute(interaction) {
    try {
      if (!VoiceChannel(interaction)) return;
      
      const queue = useQueue(interaction.guild);
      const index = interaction.options.getInteger('number') - 1;

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

      if (index > queue.tracks.size) {
        return void interaction.followUp({
          embeds: [
            {
              description: 'Track number greater than queue size!',
              color: colors.error,
            },
          ],
        });
      }

      try {
        queue.removeTrack(index);
      } catch (error) {
        return void interaction.followUp({
          embeds: [
            {
              title: 'An Error Occured',
              description: `Error: \`${error}\``,
              color: colors.error
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
