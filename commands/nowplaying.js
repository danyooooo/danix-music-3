const { useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'nowplaying',
  description: 'Get the song that is currently playing.',

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

      const currentSong = queue.currentTrack;

      return void interaction.followUp({
        embeds: [
          {
            title: 'Now Playing:',
            description: `**${currentSong.title}**\n${queue.node.createProgressBar()}`,
            color: colors.misc,
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
  },
};