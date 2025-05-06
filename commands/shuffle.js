const { useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');

module.exports = {
  name: 'shuffle',
  description: 'Shuffle the queue.',

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
        if (!queue.isShuffling()) {
          queue.tracks.shuffle();
          
          return void interaction.followUp({
            embeds: [
              {
                description: 'Shuffling the queue!',
                color: colors.error,
              },
            ],
          });
        } else if (queue.isShuffling()) {
          queue.disableShuffle();
          
          return void interaction.followUp({
            embeds: [
              {
                description: 'Shuffle disabled!',
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
