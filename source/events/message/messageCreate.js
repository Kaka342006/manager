const { getDatabase, ref, update, get } = require("firebase/database");
const chatSystem = require("../../extras/chatSystem");
const levelSystem = require("../../extras/levelSystem");
const settingsData = require("../../extras/settingsData");
const catchError = require("../../extras/catchError");
const ansiColor = require("../../extras/ansiColor")

module.exports = async (message) => {
    const client = message.client;
    
    const round = 3;
    const defaultPrefix = "S";
    
    let command = "";
    const prefix = client.config.prefix;
    const mentioned = message.content.startsWith("<@!" + client.user.id + ">") || message.content.startsWith("<@" + client.user.id + ">");
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const clearStyle = ansiColor(0, "sgr");
    const underlineStyle = ansiColor(4, "sgr");
    const blueBrightColor = ansiColor(33, "foreground");

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (client.mode === "start") {
        settingsData(client, message.guild, module.exports, message);
        if (client.temp.set !== 1) return;

        levelSystem(client, message, "POST", 123);
    }
    if (mentioned) chatSystem(client, message, mentioned, args);

    // When the members forget the prefix, inform the prefix.
    if (message.content.startsWith(defaultPrefix)) {
        if (cmd.length) {
            if (client.commands.has(cmd)) command = client.commands.get(cmd);
            if (client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd));
            if (command) {
                if (!client.temp.round) client.temp.round = 0;
                if (defaultPrefix !== prefix) {
                    client.temp.round += 1;

                    // If the correct order is printed, each prefix is incorrect, 3 times, immediately alert.
                    if (client.temp.round >= round) {
                        client.temp.round = 0;
                        message.reply(client.translate.events.messageCreate.forgot_the_prefix.replace("%s1", prefix).replace("%s2", prefix));
                    }
                }
            }
        }
    }

    if (message.content.startsWith(prefix)) {
        if (!cmd.length) return;
        if (client.commands.has(cmd)) command = client.commands.get(cmd);
        if (client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd));
        if (!command) return console.log(underlineStyle + message.author.username + clearStyle + " Type an unknown command: " + blueBrightColor + cmd + clearStyle);
        if (!client.temp.round) client.temp.round = 0;

        // If the members remember the prefix, then start counting again.
        client.temp.round = 0;
        
        message.channel.sendTyping();

        // Check the permissions of the command for the user.
        if (command.help.userPermissions) {
            if (!message.member.permissions.has(command.help.userPermissions)) {
                return message.reply(client.translate.events.messageCreate.user_is_not_allowed).replace("%s", command.help.userPermissions.join());
            }
        }

        // Check the permissions of the command for the bot.
        if (command.help.clientPermissions) {
            if (!message.guild.me.permissions.has(command.help.clientPermissions)) {
                return message.reply(client.translate.events.messageCreate.client_is_not_allowed).replace("%s", command.help.clientPermissions.join());
            }
        }

        try {
            command.run(client, message, args);

            // Stores information when the bot is working properly.
        if (client.mode === "start") {
            get(ref(getDatabase(), 'Shioru/data/survey/working'), (snapshot) => {
                if (snapshot.exists()) {
                    let working = snapshot.val();

                    update(ref(getDatabase(), 'Shioru/data/survey'), {
                        "working": (working + 1)
                    });
                } else {
                    update(ref(getDatabase(), 'Shioru/data/survey'), {
                        "working": 1
                    });
                }
            });
        }
        } catch(error) {
            catchError(client, message, command.help.name, error);
        }
    }
};