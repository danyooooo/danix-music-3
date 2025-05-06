const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');
const { useQueue } = require('discord-player');

module.exports = {
  name: 'pause',
  description: 'Pause current song.',

  async execute(interaction) {
    try {
      if (!VoiceChannel(interaction)) return;

      const queue = useQueue(interaction.guild);

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

      try {
        if (queue.node.isPlaying()) {
          queue.node.pause();

          return void interaction.followUp({
            embeds: [
              {
                description: `Playback paused.`,
                color: colors.changed,
              },
            ],
          });
        } else if (queue.node.isPaused()) {
          return void interaction.followUp({
            embeds: [
              {
                description: `Playback is paused already!`,
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