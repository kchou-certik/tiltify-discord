const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('goalchannel')
        .setDescription('Registers a VC to track goal amount.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel you wish to use. Make sure this is a VC.')
                .setRequired(true))
};