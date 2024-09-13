# Nuke Bot

Welcome to the Nuke Bot repository! This bot is designed to perform server management functions in Discord. Please use it responsibly and only on servers where you have explicit permission to execute these actions.

## Features

- **Nuke Command**: Deletes all channels, renames the server, and updates @everyone role permissions. It then continuously creates new channels and spams them with messages.
- **Clear Command**: Stops the nuke process, deletes all channels, and creates a new "general" channel.

## Commands

### `*nuke`

This command activates the nuke process:

1. Deletes all existing channels in the server.
2. Renames the server to "nuked by apex".
3. Grants the @everyone role administrator permissions.
4. Continuously creates new channels named "nuked by apex".
5. Spams each new channel with the message `@everyone https://discord.gg/6Vtg4WpPHY` every second.

**Usage:**
