const { getDatabase, ref, child, get, set } = require("firebase/database");

module.exports.run = (client, message, args) => {
    const input = args.join(" ");
    const inputType = args[0] ? args[0].toLowerCase() : "";
    const inputBoolean = args[1] ? args[1].toLowerCase() : "";

    const guildID = message.guild.id;
    const authorID = message.author.id;
    const prefix = client.config.prefix;
    const type = ["avatar", "info", "uid"]
    const dbRef = child(child(child(child(ref(getDatabase(), "Shioru/apps/discord/guilds"), guildID), "data/users"), authorID), "access");

    get(dbRef).then(snapshot => {
        if (snapshot.exists()) {
            const avatar = snapshot.val().avatar;
            const info = snapshot.val().info;
            const uid = snapshot.val().uid;

            if (!input) {
                return message.channel.send({
                    "embeds": [
                        {
                            "title": client.translate.commands.personal.title,
                            "description": client.translate.commands.personal.description
                                .replace("%s1", (avatar ? client.translate.commands.personal.yes : client.translate.commands.personal.no))
                                .replace("%s2", (info ? client.translate.commands.personal.yes : client.translate.commands.personal.no))
                                .replace("%s3", (uid ? client.translate.commands.personal.yes : client.translate.commands.personal.no))
                                .replace("%s4", (prefix + module.exports.help.usage))
                                .replace("%s5", ("/" + module.exports.help.usage)),
                            "color": 14684245,
                            "timestamp": new Date(),
                            "footer": {
                                "text": client.translate.commands.personal.data_at
                            }
                        }
                    ]
                });
            }
            if (!inputType) return message.reply(client.translate.commands.personal.empty_type.replace("%s", type.join(", ")));
            if (!type.includes(inputType)) return message.reply(client.translate.commands.personal.type_not_found.replace("%s", type.join(", ")));
            if (!inputBoolean) return message.reply(client.translate.commands.personal.empty_value);

            switch (inputBoolean) {
                case "true":
                    set(child(dbRef, inputType), true).then(() => {
                        message.channel.send(client.translate.commands.personal.true_success.replace("%s", inputType));
                    });
                    break;
                case "false":
                    set(child(dbRef, inputType), false).then(() => {
                        message.channel.send(client.translate.commands.personal.false_success.replace("%s", inputType));
                    });
                    break;
                default:
                    return message.reply(client.translate.commands.personal.invalid_value);
            }
        } else {
            set(dbRef, {
                "avatar": false,
                "info": false,
                "uid": false
            }).then(() => {
                module.exports.run(client, message, args);
            });
        }
    });
}

module.exports.help = {
    "name": "personal",
    "description": "Set up about your information.",
    "usage": "personal [type] <boolean>",
    "category": "settings",
    "aliases": ["pers", "?????????????????????", "???????????????????????????????????????"],
    "clientPermissions": ["SEND_MESSAGES"]
}

module.exports.interaction = {
    "data": {
        "name": module.exports.help.name,
        "name_localizations": {
            "en-US": "personal",
            "th": "???????????????????????????????????????"
        },
        "description": module.exports.help.description,
        "description_localizations": {
            "en-US": "Set up about your information.",
            "th": "????????????????????????????????????????????????????????????????????????????????????"
        },
        "options": [
            {
                "type": 1,
                "name": "current",
                "name_localizations": {
                    "th": "????????????????????????"
                },
                "description": "See your current settings.",
                "description_localizations": {
                    "th": "??????????????????????????????????????????????????????????????????????????????"
                },
                "required": false,
            },
            {
                "type": 1,
                "name": "set",
                "name_localizations": {
                    "th": "?????????????????????"
                },
                "description": "Set your permission to see your personal. (Specific to Shioru)",
                "description_localizations": {
                    "th": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? (??????????????? Shioru)"
                },
                "required": false,
                "options": [
                    {
                        "type": 3,
                        "name": "type",
                        "name_localizations": {
                            "th": "??????????????????"
                        },
                        "description": "The type of personal you want to set.",
                        "description_localizations": {
                            "th": "?????????????????????????????????????????????????????????????????????????????????????????????????????????"
                        },
                        "required": true,
                        "choices": [
                            {
                                "name": "Avatar",
                                "name_localizations": {
                                    "th": "??????????????????????????????????????????"
                                },
                                "value": "avatar"
                            },
                            {
                                "name": "Information",
                                "name_localizations": {
                                    "th": "??????????????????"
                                },
                                "value": "info"
                            },
                            {
                                "name": "User ID",
                                "name_localizations": {
                                    "th": "ID ??????????????????"
                                },
                                "value": "uid"
                            }
                        ]
                    },
                    {
                        "type": 5,
                        "name": "boolean",
                        "name_localizations": {
                            "th": "???????????????"
                        },
                        "description": "True means allow and False means not allowed.",
                        "description_localizations": {
                            "th": "True ???????????????????????????????????????????????? Flase ????????????????????????????????????????????????"
                        },
                        "required": true
                    }
                ]
            }
        ]
    },
    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const inputType = interaction.options.get("type").value;
        const inputBoolean = interaction.options.get("boolean").value;

        const guildID = interaction.guild.id;
        const authorID = interaction.user.id;
        const prefix = interaction.client.config.prefix;
        const dbRef = child(child(child(child(ref(getDatabase(), "Shioru/apps/discord/guilds"), guildID), "data/users"), authorID), "access");

        get(dbRef).then(async snapshot => {
            if (snapshot.exists()) {
                const avatar = snapshot.val().avatar;
                const info = snapshot.val().info;
                const uid = snapshot.val().uid;

                if (subCommand === "current") {
                    return await interaction.editReply({
                        "embeds": [
                            {
                                "title": interaction.client.translate.commands.personal.title,
                                "description": interaction.client.translate.commands.personal.description
                                    .replace("%s1", (avatar ? interaction.client.translate.commands.personal.yes : interaction.client.translate.commands.personal.no))
                                    .replace("%s2", (info ? interaction.client.translate.commands.personal.yes : interaction.client.translate.commands.personal.no))
                                    .replace("%s3", (uid ? interaction.client.translate.commands.personal.yes : interaction.client.translate.commands.personal.no))
                                    .replace("%s4", (prefix + module.exports.help.usage))
                                    .replace("%s5", ("/" + module.exports.help.usage)),
                                "color": 14684245,
                                "timestamp": new Date(),
                                "footer": {
                                    "text": interaction.client.translate.commands.personal.data_at
                                }
                            }
                        ]
                    });
                }

                if (subCommand === "set") {
                    switch (inputBoolean) {
                        case true:
                            await set(child(dbRef, inputType), true);
                            await interaction.editReply(interaction.client.translate.commands.personal.true_success.replace("%s", inputType));
                            break;
                        case false:
                            await set(child(dbRef, inputType), false);
                            await interaction.editReply(interaction.client.translate.commands.personal.false_success.replace("%s", inputType));
                            break;
                    }
                }
            } else {
                set(dbRef, {
                    "avatar": false,
                    "info": false,
                    "uid": false
                }).then(() => {
                    module.exports.interaction.execute(interaction);
                });
            }
        });
    }
};