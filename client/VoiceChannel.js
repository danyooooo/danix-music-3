const { GuildMember, MessageFlags } = require('discord.js');
const colors = require('../colors.json');

function VoiceChannel(interaction) {
    const inVoiceChannel = !interaction.member.voice.channel || (!(interaction.member instanceof GuildMember));
    const sameVoiceChannel = interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId;

    if (inVoiceChannel) {
        interaction.reply({
            embeds: [
                {
                    description: 'You are not in a voice channel!',
                    color: colors.error,
                },
            ],
            flags: MessageFlags.Ephemeral,
        });

        return false;
    }

    if (sameVoiceChannel) {
        interaction.reply({
            embeds: [
                {
                    description: 'You are not in my voice channel!',
                    color: colors.error,
                },
            ],
            flags: MessageFlags.Ephemeral,
        });

        return false;
    }

    return true;
}

module.exports = { VoiceChannel }