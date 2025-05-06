const { MessageFlags, ApplicationCommandOptionType } = require('discord.js');
const { useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'move',
  description: 'Move song position in the queue.',
  options: [
    {
      name: 'track',
      type: ApplicationCommandOptionType.Integer,
      description: 'The track number you want to move',
      required: true,
    },
    {
      name: 'position',
      type: ApplicationCommandOptionType.Integer,
      description: 'The position to move it to',
      required: true,
    },
  ],

  async execute(interaction) {
    try {
      if (!VoiceChannel(interaction)) return;

      await interaction.deferReply();

      const queue = useQueue(interaction.guild);

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

      const from = interaction.options.getInteger('track') - 1;
      const to = interaction.options.getInteger('position') - 1;

      if (from > queue.tracks.size || to > queue.tracks.size) {
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
        queue.moveTrack(from, to);

        return void interaction.followUp({
          embeds: [
            {
              description: `Moved **${from}** to **${to}**`,
              color: colors.changed,
            },
          ],
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
