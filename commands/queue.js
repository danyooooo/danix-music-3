const { useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'queue',
  description: 'View the queue of current songs.',

  async execute(interaction) {
    try {
      if (!VoiceChannel(interaction)) return;

      await interaction.deferReply();
      
      const queue = useQueue(interaction.guild);
      const tracks = queue.tracks.toArray();
      const currentTrack = queue.currentTrack;

      if (!queue) {
        return void interaction.followUp({
          embeds: [
            {
              description: 'No music is currently playing!',
              color: colors.error,
            },
          ],
        });
      } else if (!currentTrack) {
        return void interaction.followUp({
          embeds: [
            {
              description: 'No music is currently playing!',
              color: colors.error,
            },
          ],
        });
      } else if (!tracks) {
        return void interaction.followUp({
          embeds: [
            {
              description: 'No music is currently playing!',
              color: colors.error,
            },
          ],
        });
      } else {
        return void interaction.followUp({
          embeds: [
            {
              title: `${interaction.guild} Queue`,
              description: `Now playing: **${currentTrack}** \n\nUpcoming tracks: \n\n${tracks}`,
              color: colors.success,
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
  }
}