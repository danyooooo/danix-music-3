const { useQueue, QueueRepeatMode } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'stop',
  description: 'Stop all songs in the queue.',

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
        queue.setRepeatMode(QueueRepeatMode.OFF);
        queue.node.stop();

        return void interaction.followUp({
          embeds: [
            {
              description: 'Stopped the playback.',
              color: colors.success,
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
