const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('raisedchannel')
        .setDescription('Registers a VC to track amount raised.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel you wish to use. Make sure this is a VC.')
                .setRequired(true))
};