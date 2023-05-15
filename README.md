## taf-discord-bridge

# Discord Bot Setup Instructions, please use the discord.js for further help https://discord.com/invite/djs

This guide will help you set up your Discord bot using the Discord Developer Portal.

## Step 1: Creating Your Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).

2. Click on the 'New Application' button. Give your application a name and click 'Create'.

3. On the left-hand side panel, click on 'Bot'.

4. Click on the 'Add Bot' button on the right and confirm by clicking 'Yes, do it!'.

## Step 2: Setting Bot Permissions

1. Still in the Discord Developer Portal, click on 'OAuth2' in the left-hand side panel.

2. Scroll down to the 'Scopes' section and tick the 'bot' checkbox.

3. In the 'Bot Permissions' section that appears, tick the 'Send Messages' and 'Read Message History' checkboxes. These permissions correspond to the numeric permission '3072'.

4. Copy the URL generated in the 'Scopes' section and open it in your browser to invite the bot to your server. 

## Step 3: Configuring Your Bot

1. In your local project, open the `config.json` file. 

2. Add your bot's token and ID to the `config.json` file:

> **Note**: Your bot's token and ID can be found in the 'Bot' section of the Discord Developer Portal.

And that's it! You should now have your Discord bot set up and ready to go. Happy coding!
