require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const TiltifyClient = require("tiltify-api-client");
const { Client, Collection, Intents, GuildChannel } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const tiltClient = new TiltifyClient(process.env.TILT_ACCESS_TOKEN);

const campaign = tiltClient.Campaigns;

/** @type {GuildChannel} */
let goalChannel;
/** @type {GuildChannel} */
let raisedChannel;

// command listener
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'raisedchannel') {
        /** @type {GuildChannel} */
        const channelData = interaction.options.getChannel('channel');
        if (channelData.type !== "GUILD_VOICE") {
            return await interaction.reply("Please specify a voice channel!");
        }

        raisedChannel = channelData
        await interaction.reply(`Channel registered and set to ${channelData.name}`);
    } else if (commandName === 'goalchannel') {
        /** @type {GuildChannel} */
        const channelData = interaction.options.getChannel('channel');
        if (channelData.type !== "GUILD_VOICE") {
            return await interaction.reply("Please specify a voice channel!");
        }

        goalChannel = channelData
        await interaction.reply(`Channel registered and set to ${channelData.name}`);
    }
});

// ready
client.once('ready', () => console.log(`Ready! Logged in as ${client.user.tag}`));

client.login(process.env.BOT_TOKEN);


// update channel names

const dollarify = Intl.NumberFormat('en-US');

setInterval(updateChannel, 20000);

function updateChannel() {
    if (!raisedChannel || !goalChannel) return;
    try {
        campaign.get("171802", async function (data) {
            const raised = dollarify.format(data.totalAmountRaised);
            const goal = dollarify.format(data.fundraiserGoalAmount);
            const raisedString = `RAISED: $${raised}`;
            const goalString = `GOAL: $${goal}`;

            const og_rName = raisedChannel.name;
            const og_gName = goalChannel.name;
            if (og_rName !== raisedString) {
                raisedChannel.setName(raisedString);
            }
            if (og_gName !== goalString) {
                goalChannel.setName(goalString);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}