const { ApplicationCommandOptionType } = require('discord.js');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');
const { useQueue } = require('discord-player');

module.exports = {
  name: 'swap',
  description: 'Swap song positions in the queue.',
  options: [
    {
      name: 'track1',
      type: ApplicationCommandOptionType.Integer,
      description: 'The track number you want to swap',
      required: true,
    },
    {
      name: 'track2',
      type: ApplicationCommandOptionType.Integer,
      description: 'The track number you want to swap',
      required: true,
    },
  ],

  async execute(interaction) {
    try {
      if (!VoiceChannel(interaction)) return;
      
      const queue = useQueue(interaction.guild);
      const track1 = interaction.options.getInteger('track1') - 1;
      const track2 = interaction.options.getInteger('track2') - 1;

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

      if (track1 > queue.tracks.size) {
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
        queue.swapTracks(track1, track2);

        return void interaction.followUp({
          embeds: [
            {
              description: `Swapped **${track1}** with **${track2}**`,
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
