const { ApplicationCommandOptionType } = require('discord.js');
const colors = require('../colors.json');
const { QueueRepeatMode, useQueue } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');

module.exports = {
  name: 'loop',
  description: 'Sets loop mode.',
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: 'mode',
      description: 'Loop type',
      required: true,
      choices: [
        {
          name: 'Off',
          value: QueueRepeatMode.OFF,
        },
        {
          name: 'Track',
          value: QueueRepeatMode.TRACK,
        },
        {
          name: 'Queue',
          value: QueueRepeatMode.QUEUE,
        },
        {
          name: 'Autoplay',
          value: QueueRepeatMode.AUTOPLAY,
        },
      ],
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

      try {
        const loopMode = interaction.options.getNumber('mode');

        queue.setRepeatMode(loopMode);

        const loop = {
          [QueueRepeatMode.OFF]: 'OFF',
          [QueueRepeatMode.TRACK]: 'TRACK',
          [QueueRepeatMode.QUEUE]: 'QUEUE',
          [QueueRepeatMode.AUTOPLAY]: 'AUTOPLAY'
        };

        return void interaction.followUp({
          embeds: [
            {
              description: `Set loop mode to \`${loop[loopMode]}\``,
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
      interaction.followUp({
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