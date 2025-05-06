const { useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'resume',
  description: 'Resume current song.',

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
        if (queue.node.isPaused()) {
          queue.node.resume();

          return void interaction.followUp({
            embeds: [
              {
                description: 'Playback resumed!',
                color: colors.changed,
              },
            ],
          });
        } else if (queue.node.isPlaying()) {
          return void interaction.followUp({
            embeds: [
              {
                description: 'Playback is resumed already!',
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