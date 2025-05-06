require('dotenv').config();
const { PresenceUpdateStatus, EmbedBuilder, MessageFlags, REST, Routes } = require('discord.js');
const colors = require('../colors.json');
const config = require('../config.json');
const { validateID } = require('ytdl-core');

module.exports = (client, player) => {
    player.events.on('audioFiltersUpdate', (queue, oldFilters, newFilters) => {
        const filtersChange = new EmbedBuilder()
            .setDescription('Audio filters changed!')
            .setTimestamp()
            .setColor(0xFFB6E6)

        queue.metadata.channel.send({ embeds: [filtersChange] });
    });

    /*player.events.on('audioTrackAdd', (queue, track) => {
        if (!queue) return;
        
        const addsong = new EmbedBuilder()
            //.setColor(0xffffff)
            .setDescription(`**${track.title}** queued!`)
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [addsong] });
    });*/

    player.events.on('audioTrackRemove', (queue, track) => {
        const trackRemove = new EmbedBuilder()
            .setDescription(`**${track.title}** removed from the queue!`)
            .setTimestamp()
            .setColor(0xFFB6E6)

        queue.metadata.channel.send({ embeds: [trackRemove] });
    });

    player.events.on('audioTracksAdd', (queue, track) => {
        if (!queue) return;

        const addsongs = new EmbedBuilder()
            .setDescription('Multiple tracks queued!')
            .setTimestamp()
            .setColor(0xFFB6E6)

        queue.metadata.channel.send({ embeds: [addsongs] });
    });

    player.events.on('audioTracksRemove', (queue, track) => {
        const tracksRemove = new EmbedBuilder()
            .setDescription('Multiple tracks removed from the queue!')
            .setTimestamp()
            .setColor(0xFFB6E6)

        queue.metadata.channel.send({ embeds: [tracksRemove] });
    });

    /*player.events.on('connection', (queue) => {
        queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
            const oldNetworking = Reflect.get(oldState, 'networking');
            const newNetworking = Reflect.get(newState, 'networking');

            const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
                const newUdp = Reflect.get(newNetworkState, 'udp');
                clearInterval(newUdp?.keepAliveInterval);
            }

            oldNetworking?.off('stateChange', networkStateChangeHandler);
            newNetworking?.on('stateChange', networkStateChangeHandler);
        });
    });*/

    player.events.on('disconnect', queue => {
        const bdc = new EmbedBuilder()
            .setColor(0xff0000)
            .setDescription('I was manually disconnected from the voice channel, clearing queue.')
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [bdc] });
    });

    player.events.on('emptyChannel', (queue) => {
        const noone = new EmbedBuilder()
            .setColor(0x96B7E6)
            .setDescription('Nobody is in the voice channel, leaving...')
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [noone] });
    });

    player.events.on('emptyQueue', queue => {
        if (queue.repeatMode == 1 || queue.repeatMode == 2) return;

        const ended = new EmbedBuilder()
            .setColor(0x96B7E6)
            .setDescription('Queue ended.')
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [ended] });
    });

    player.events.on('error', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.events.on('playerError', (queue, error, track) => {
        const playerError = new EmbedBuilder()
            .setColor(0xD2B0A7)
            .setTitle(`An Error Occured`)
            .setDescription(`Error: \`${error.message}\``)
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [playerError] });
    });

    /*player.events.on('playerPause', (queue) => {
        const pause = new EmbedBuilder()
            .setDescription('Playback paused!')
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [pause] });
    });

    player.events.on('playerResume', (queue) => {
        const resume = new EmbedBuilder()
            .setDescription('Playback resumed!')
            .setTimestamp()

        queue.metadata.channel.send({ embeds: [resume] });
    });*/

    /*player.events.on('playerSkip', (queue, track, reason) => {
        const skip = new EmbedBuilder()
            .setDescription(`Skipping **${track.title}** \nReason: ${reason}`)
            .setTimestamp()
            .setColor(0xD2B0A7)

        queue.metadata.channel.send({ embeds: [skip] });
    });*/

    player.events.on('playerStart', (queue, track) => {
        if (!config.loopMessage && queue.repeatMode == 1 || !config.loopMessage && queue.repeatMode == 2 && queue.tracks.size == 1) return;

        const playmusic = new EmbedBuilder()
            .setColor(0x4CEB89)
            .setTitle('Started Playing:')
            .setDescription(`[${track.title}](${track.url})`)
            .setTimestamp()

        if (track.thumbnail) {
            playmusic.setThumbnail(track.thumbnail);
        }

        /*if (track.duration) {
            playmusic.addFields({ name: 'Duration', value: track.duration, inline: true });
        }*/

        /*if (track.requestedBy) {
            playmusic.addFields({ name: 'Requested By:', value: track.requestedBy, inline: true });
        }*/

        /*if (track.extractor) {
            playmusic.addFields({ name: 'Source', value: track.extractor, inline: true });
        }*/

        queue.metadata.channel.send({ embeds: [playmusic] });
    });

    player.events.on('queueDelete', (queue) => {
        const deleteQueue = new EmbedBuilder()
            .setDescription('Queue cleared!')
            .setTimestamp()
            .setColor(0xFFB6E6)

        queue.metadata.channel.send({ embeds: [deleteQueue] });
    });

    player.events.on('volumeChange', (queue, oldVolume, newVolume) => {
        const changeVolume = new EmbedBuilder()
            .setDescription(`Volume changed to \`${newVolume}%\`.`)
            .setTimestamp()
            .setColor(0xFFB6E6)

        queue.metadata.channel.send({ embeds: [changeVolume] });
    });

    /*const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    async function clearAllGuildCommands(client) {
        for (const [guildId] of client.guilds.cache) {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
                    { body: [] }
                );
                console.log(`Cleared commands in guild ${guildId}`);
            } catch (error) {
                console.error(`Failed to clear commands in guild ${guildId}:`, error);
            }
        }
    };*/

    client.once('ready', async () => {
        // clearAllGuildCommands(client);
        console.log('Ready!');

        /*try {
            // Fetch all global commands
            const commands = await client.application.commands.fetch();
            console.log(`Found ${commands.size} global commands.`);

            // Delete each command
            for (const [id, command] of commands) {
                await client.application.commands.delete(id);
                console.log(`Deleted global command: ${command.name} (${id})`);
            }

            console.log('All global commands deleted.');
        } catch (error) {
            console.error('Error deleting global commands:', error);
        } finally {
            client.destroy();
        }*/
    });

    client.once('reconnecting', () => {
        console.log('Reconnecting!');
    });

    client.once('disconnect', () => {
        console.log('Disconnect!');
    });

    client.on('ready', function () {
        client.user.setPresence({
            activities: [{ name: config.activity, type: Number(config.activityType) }],
            status: PresenceUpdateStatus.Idle,
        });
    });

    client.on('messageCreate', async message => {
        if (message.author.bot || !message.guild) return;
        if (!client.application?.owner) await client.application?.fetch();

        if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
            await message.guild.commands
                .set(client.commands)
                .then(() => {
                    message.reply('Deployed!');
                })
                .catch(err => {
                    message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
                    console.error(err);
                });
        }
    });

    client.on('interactionCreate', async interaction => {
        const command = client.commands.get(interaction.commandName.toLowerCase());

        try {
            if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
                command.execute(interaction, client);
            } else if (
                interaction.commandName == '247' ||
                interaction.commandName == 'autoplay' ||
                interaction.commandName == 'filters' ||
                interaction.commandName == 'lyrics' ||
                interaction.commandName == 'playlists' ||
                interaction.commandName == 'seek'
            ) {
                interaction.reply({
                    embeds: [
                        {
                            title: 'Command Disabled',
                            description: 'This command is currently disabled due to memory leak. Any updates will be posted through our website.',
                            color: colors.error,
                        },
                    ],
                });
            } else {
                command.execute(interaction, player);
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

        /*if (interaction.isCommand()) {
            interaction.reply({
                embeds: [
                    {
                        title: 'Update Maintenance',
                        description: 'This bot is currently updating to v3. Any updates and changes will be announced in our website!',
                        color: colors.error,
                    },
                ],
                flags: MessageFlags.Ephemeral,
            });
        }*/
    });
}