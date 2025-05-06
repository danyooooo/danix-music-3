/*const { ApplicationCommandOptionType } = require('discord.js');
const { usePlayer, QueryType, QueueRepeatMode } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');
const yt = require('discord-player-youtubei');
const { validateURL } = require('discord-player-youtubei');

module.exports = {
  name: 'play',
  description: 'Play a song in your voice channel.',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'The song you want to play',
      required: true,
    },
  ],
  
  async execute(interaction) {
    try {
      const player = usePlayer();
      const query = interaction.options.getString('query', true);

      if (!VoiceChannel(interaction)) return;

      await interaction.deferReply();

      try {
        if (validateURL(query)) {
          const searchResult = await player.search(query, {
            requestedBy: interaction.user,
            searchEngine: `ext:${yt.YoutubeiExtractor}`
          }).catch(() => { });

          try {
            await player.play(interaction.member.voice.channel, searchResult, {
              nodeOptions: {
                metadata: { channel: interaction.channel },
                volume: 100,
                disableHistory: false,
                leaveOnEnd: false,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300000,
                selfDeaf: true,
                repeatMode: QueueRepeatMode.OFF
              }
            });

            await interaction.followUp({
              embeds: [
                {
                  description: `Searching...`
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
        } else {
          try {
            await player.play(interaction.member.voice.channel, query, {
              nodeOptions: {
                metadata: { channel: interaction.channel },
                volume: 100,
                disableHistory: false,
                leaveOnEnd: false,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300000,
                selfDeaf: true,
                repeatMode: QueueRepeatMode.OFF,
              }
            });

            await interaction.followUp({
              embeds: [
                {
                  description: `Searching for "**${query}**"`,
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
      console.log(error);
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
};*/


const { ApplicationCommandOptionType } = require('discord.js');
const { useMainPlayer, QueryType, QueueRepeatMode } = require('discord-player');
const { VoiceChannel } = require('../client/VoiceChannel');
const colors = require('../colors.json');
const { validateURL, YoutubeiExtractor } = require('discord-player-youtubei');

module.exports = {
    name: 'play',
    description: 'Play a song in your voice channel.',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'The song you want to play',
            required: true,
        },
    ],

    async execute(interaction) {
        try {
            const player = useMainPlayer();
            const query = interaction.options.getString('query', true);

            if (!VoiceChannel(interaction)) return;

            await interaction.deferReply();

            try {
                if (validateURL(query)) {
                    if (query.includes('youtube.com') || query.includes('youtu.be') || query.includes('music.youtube.com')) {
                        try {
                            const searchResult = await player.search(query, {
                                requestedBy: interaction.user,
                                searchEngine: `ext:${YoutubeiExtractor.identifier}`
                            });

                            await player.play(interaction.member.voice.channel, searchResult.tracks[0], {
                                nodeOptions: {
                                    metadata: { channel: interaction.channel },
                                    volume: 100,
                                    disableHistory: false,
                                    leaveOnEnd: false,
                                    leaveOnEmpty: true,
                                    leaveOnEmptyCooldown: 300000,
                                    selfDeaf: true,
                                    repeatMode: QueueRepeatMode.OFF
                                }
                            });

                            await interaction.followUp({
                                embeds: [
                                    {
                                        description: 'Fetching Youtube link...',
                                        color: colors.misc
                                    }
                                ],
                            });
                        } catch (error) {
                            return void interaction.followUp({
                                embeds: [
                                    {
                                        title: 'An Error Occured',
                                        description: `Error: \`${error}\``,
                                        color: colors.error
                                    }
                                ],
                            });
                        }
                    } else {
                        try {
                            const searchResult = player.search(query, {
                                requestedBy: interaction.user,
                                searchEngine: QueryType.AUTO
                            });

                            await player.play(interaction.member.voice.channel, searchResult.tracks[0], {
                                nodeOptions: {
                                    metadata: { channel: interaction.channel },
                                    volume: 100,
                                    disableHistory: false,
                                    leaveOnEnd: false,
                                    leaveOnEmpty: true,
                                    leaveOnEmptyCooldown: 300000,
                                    selfDeaf: true,
                                    repeatMode: QueueRepeatMode.OFF
                                }
                            });

                            await interaction.followUp({
                                embeds: [
                                    {
                                        description: 'Fetching link...',
                                        color: colors.misc
                                    }
                                ],
                            });
                        } catch (error) {
                            return void interaction.followUp({
                                embeds: [
                                    {
                                        title: 'An Error Occured',
                                        description: `Error: \`${error}\``,
                                        color: colors.error
                                    }
                                ],
                            });
                        }
                    }
                } else {
                    try {
                        await player.play(interaction.member.voice.channel, query, {
                            nodeOptions: {
                                metadata: { channel: interaction.channel },
                                volume: 100,
                                disableHistory: false,
                                leaveOnEnd: false,
                                leaveOnEmpty: true,
                                leaveOnEmptyCooldown: 300000,
                                selfDeaf: true,
                                repeatMode: QueueRepeatMode.OFF
                            }
                        });

                        await interaction.followUp({
                            embeds: [
                                {
                                    description: `Searching for "**${query}**"`,
                                    color: colors.misc
                                }
                            ],
                        });
                    } catch (error) {
                        return void interaction.followUp({
                            embeds: [
                                {
                                    title: 'An Error Occured',
                                    description: `Error: \`${error}\``,
                                    color: colors.error
                                }
                            ],
                        });
                    }
                }
            } catch (error) {
                return void interaction.followUp({
                    embeds: [
                        {
                            title: 'An Error Occured',
                            description: `Error: \`${error}\``,
                            color: colors.error
                        }
                    ],
                });
            };
        } catch (error) {
            if (interaction.deferred) {
                return void interaction.followUp({
                    embeds: [
                        {
                            title: 'An Error Occured',
                            description: `Error: \`${error}\``,
                            color: colors.error
                        }
                    ],
                });
            } else {
                return void interaction.reply({
                    embeds: [
                        {
                            title: 'An Error Occured',
                            description: `Error: \`${error}\``,
                            color: colors.error
                        }
                    ],
                });
            }
        };
    },
};