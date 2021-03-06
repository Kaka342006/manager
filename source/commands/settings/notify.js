const { getDatabase, ref, child, get, set } = require("firebase/database");

module.exports.run = (client, message, args) => {
    const input = args.join(" ");
    const inputType = args[0];
    const inputOption = args[1] ? args[1].toLowerCase() : "";
    const inputChannel = args[2];

    const guildID = message.guild.id;
    const prefix = client.config.prefix;
    const type = ["alert", "channelCreate", "channelDelete", "channelPinsUpdate", "channelUpdate", "emojiCreate", "emojiDelete", "emojiUpdate", "guildMemberAdd", "guildMemberRemove"];
    const dbRef = child(child(ref(getDatabase(), "Shioru/apps/discord/guilds"), guildID), "config");

    get(child(dbRef, "notification")).then(snapshot => {
        if (snapshot.exists()) {
            const alert = snapshot.val().alert;
            const channelCreate = snapshot.val().channelCreate;
            const channelDelete = snapshot.val().channelDelete;
            const channelPinsUpdate = snapshot.val().channelPinsUpdate;
            const channelUpdate = snapshot.val().channelUpdate;
            const emojiCreate = snapshot.val().emojiCreate;
            const emojiDelete = snapshot.val().emojiDelete;
            const emojiUpdate = snapshot.val().emojiUpdate;
            const guildMemberAdd = snapshot.val().guildMemberAdd;
            const guildMemberRemove = snapshot.val().guildMemberRemove;

            if (!input) {
                return message.channel.send({
                    "embeds": [
                        {
                            "title": client.translate.commands.notify.title,
                            "description": client.translate.commands.notify.description
                                .replace("%s1", (alert ? ("<#" + alert + ">") : client.translate.commands.notify.not_set))
                                .replace("%s2", (channelCreate ? ("<#" + channelCreate + ">") : client.translate.commands.notify.not_set))
                                .replace("%s3", (channelDelete ? ("<#" + channelDelete + ">") : client.translate.commands.notify.not_set))
                                .replace("%s4", (channelPinsUpdate ? ("<#" + channelPinsUpdate + ">") : client.translate.commands.notify.not_set))
                                .replace("%s5", (channelUpdate ? ("<#" + channelUpdate + ">") : client.translate.commands.notify.not_set))
                                .replace("%s6", (emojiCreate ? ("<#" + emojiCreate + ">") : client.translate.commands.notify.not_set))
                                .replace("%s7", (emojiDelete ? ("<#" + emojiDelete + ">") : client.translate.commands.notify.not_set))
                                .replace("%s8", (emojiUpdate ? ("<#" + emojiUpdate + ">") : client.translate.commands.notify.not_set))
                                .replace("%s9", (guildMemberAdd ? ("<#" + guildMemberAdd + ">") : client.translate.commands.notify.not_set))
                                .replace("%s10", (guildMemberRemove ? ("<#" + guildMemberRemove + ">") : client.translate.commands.notify.not_set))
                                .replace("%s11", (prefix + module.exports.help.usage))
                                .replace("%s12", ("/" + module.exports.help.usage)),
                            "color": 14684245,
                            "timestamp": new Date(),
                            "footer": {
                                "text": client.translate.commands.notify.data_at
                            }
                        }
                    ]
                });
            }

            switch (inputOption) {
                case "set":
                    if (!inputType) return message.reply(client.translate.commands.notify.empty_type.replace("%s", type.join(", ")));
                    if (!type.includes(inputType)) return message.reply(client.translate.commands.notify.type_not_found.replace("%s", type.join(", ")));
                    if (!inputChannel) return message.reply(client.translate.commands.notify.empty_config_channel);

                    const channel = message.guild.channels.cache.find(channels => (channels.id === inputChannel) || (channels.name === inputChannel));

                    if (!channel) return message.reply(client.translate.commands.notify.channel_not_found);

                    set(child(child(dbRef, "notification"), inputType), channel.id.toString()).then(() => {
                        message.channel.send(client.translate.commands.notify.set_success.replace("%s1", inputType).replace("%s2", channel.name));
                    });
                    break;
                case "remove":
                    if (!inputType) return message.reply(client.translate.commands.notify.empty_type.replace("%s", type.join(", ")));
                    if (!type.includes(inputType)) return message.reply(client.translate.commands.notify.type_not_found.replace("%s", type.join(", ")));

                    set(child(child(dbRef, "notification"), inputType), false).then(() => {
                        message.channel.send(client.translate.commands.notify.remove_success.replace("%s", inputType));
                    });
                    break;
                default:
                    return message.reply(client.translate.commands.notify.invalid_options.replace("%s", inputOption));
            }
        } else {
            set(child(dbRef, "notification"), {
                "alert": false,
                "channelCreate": false,
                "channelDelete": false,
                "channelPinsUpdate": false,
                "channelUpdate": false,
                "emojiCreate": false,
                "emojiDelete": false,
                "emojiUpdate": false,
                "guildMemberAdd": false,
                "guildMemberRemove": false
            }).then(() => {
                module.exports.run(client, message, args);
            });
        }
    });
}

module.exports.help = {
    "name": "notify",
    "description": "Set up the notifications you want.",
    "usage": "notify [option: set, remove] <type> <channel>",
    "category": "settings",
    "aliases": ["notification", "????????????????????????????????????"],
    "userPermissions": ["MANAGE_GUILD"],
    "clientPermissions": ["SEND_MESSAGES"]
}

module.exports.interaction = {
    "data": {
        "name": module.exports.help.name,
        "name_localizations": {
            "en-US": "notify",
            "th": "????????????????????????????????????"
        },
        "description": module.exports.help.description,
        "description_localizations": {
            "en-US": "Set up the notifications you want.",
            "th": "????????????????????????????????????????????????????????????????????????????????????????????????"
        },
        "options": [
            {
                "type": 1,
                "name": "info",
                "name_localizations": {
                    "th": "??????????????????"
                },
                "description": "Receive information about each channel's notification.",
                "description_localizations": {
                    "th": "???????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                "required": false
            },
            {
                "type": 1,
                "name": "set",
                "name_localizations": {
                    "th": "?????????????????????"
                },
                "description": "The type of notification you want to set.",
                "description_localizations": {
                    "th": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                "required": false,
                "options": [
                    {
                        "type": 3,
                        "name": "type",
                        "name_localizations": {
                            "th": "??????????????????"
                        },
                        "description": "The type of notification you want to set.",
                        "description_localizations": {
                            "th": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                        },
                        "required": true,
                        "choices": [
                            {
                                "name": "General",
                                "name_localizations": {
                                    "th": "??????????????????"
                                },
                                "value": "alert"
                            },
                            {
                                "name": "Channel (Create)",
                                "name_localizations": {
                                    "th": "???????????? (???????????????)"
                                },
                                "value": "channelCreate"
                            },
                            {
                                "name": "Channel (Delete)",
                                "name_localizations": {
                                    "th": "???????????? (??????)"
                                },
                                "value": "channelDelete"
                            },
                            {
                                "name": "Channel (Pins Update)",
                                "name_localizations": {
                                    "th": "???????????? (???????????????????????????)"
                                },
                                "value": "channelPinsUpdate"
                            },
                            {
                                "name": "Channel (Update)",
                                "name_localizations": {
                                    "th": "???????????? (??????????????????)"
                                },
                                "value": "channelUpdate"
                            },
                            {
                                "name": "Emoji (Create)",
                                "name_localizations": {
                                    "th": "?????????????????? (???????????????)"
                                },
                                "value": "emojiCreate"
                            },
                            {
                                "name": "Emoji (Delete)",
                                "name_localizations": {
                                    "th": "?????????????????? (??????)"
                                },
                                "value": "emojiDelete"
                            },
                            {
                                "name": "Emoji (Update)",
                                "name_localizations": {
                                    "th": "?????????????????? (??????????????????)"
                                },
                                "value": "emojiUpdate"
                            },
                            {
                                "name": "Guild (Members Join)",
                                "name_localizations": {
                                    "th": "????????????????????????????????? (??????????????????????????????????????????)"
                                },
                                "value": "guildMemberAdd"
                            },
                            {
                                "name": "Guild (Members Leave)",
                                "name_localizations": {
                                    "th": "????????????????????????????????? (???????????????????????????)"
                                },
                                "value": "guildMemberRemove"
                            }
                        ]
                    },
                    {
                        "type": 7,
                        "name": "channel",
                        "name_localizations": {
                            "th": "????????????"
                        },
                        "description": "The channel you want to set the notification.",
                        "description_localizations": {
                            "th": "????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                        },
                        "required": true,
                        "channel_types": [
                            0,
                            5,
                            10,
                            11,
                            12,
                            15
                        ]
                    }
                ]
            },
            {
                "type": 1,
                "name": "remove",
                "name_localizations": {
                    "th": "??????"
                },
                "description": "The type of notification you want to remove.",
                "description_localizations": {
                    "th": "????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                "required": false,
                "options": [
                    {
                        "type": 3,
                        "name": "type",
                        "name_localizations": {
                            "th": "??????????????????"
                        },
                        "description": "The type of notification you want to remove.",
                        "description_localizations": {
                            "th": "????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                        },
                        "required": true,
                        "choices": [
                            {
                                "name": "General",
                                "name_localizations": {
                                    "th": "??????????????????"
                                },
                                "value": "alert"
                            },
                            {
                                "name": "Channel (Create)",
                                "name_localizations": {
                                    "th": "???????????? (???????????????)"
                                },
                                "value": "channelCreate"
                            },
                            {
                                "name": "Channel (Delete)",
                                "name_localizations": {
                                    "th": "???????????? (??????)"
                                },
                                "value": "channelDelete"
                            },
                            {
                                "name": "Channel (Pins Update)",
                                "name_localizations": {
                                    "th": "???????????? (???????????????????????????)"
                                },
                                "value": "channelPinsUpdate"
                            },
                            {
                                "name": "Channel (Update)",
                                "name_localizations": {
                                    "th": "???????????? (??????????????????)"
                                },
                                "value": "channelUpdate"
                            },
                            {
                                "name": "Emoji (Create)",
                                "name_localizations": {
                                    "th": "?????????????????? (???????????????)"
                                },
                                "value": "emojiCreate"
                            },
                            {
                                "name": "Emoji (Delete)",
                                "name_localizations": {
                                    "th": "?????????????????? (??????)"
                                },
                                "value": "emojiDelete"
                            },
                            {
                                "name": "Emoji (Update)",
                                "name_localizations": {
                                    "th": "?????????????????? (??????????????????)"
                                },
                                "value": "emojiUpdate"
                            },
                            {
                                "name": "Guild (Members Join)",
                                "name_localizations": {
                                    "th": "????????????????????????????????? (??????????????????????????????????????????)"
                                },
                                "value": "guildMemberAdd"
                            },
                            {
                                "name": "Guild (Members Leave)",
                                "name_localizations": {
                                    "th": "????????????????????????????????? (???????????????????????????)"
                                },
                                "value": "guildMemberRemove"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const inputType = interaction.options.get("type");
        const inputChannel = interaction.options.get("channel");

        const guildID = interaction.guild.id;
        const prefix = interaction.client.config.prefix;
        const dbRef = child(child(ref(getDatabase(), "Shioru/apps/discord/guilds"), guildID), "config");

        get(child(dbRef, "notification")).then(async snapshot => {
            if (snapshot.exists()) {
                const alert = snapshot.val().alert;
                const channelCreate = snapshot.val().channelCreate;
                const channelDelete = snapshot.val().channelDelete;
                const channelPinsUpdate = snapshot.val().channelPinsUpdate;
                const channelUpdate = snapshot.val().channelUpdate;
                const emojiCreate = snapshot.val().emojiCreate;
                const emojiDelete = snapshot.val().emojiDelete;
                const emojiUpdate = snapshot.val().emojiUpdate;
                const guildMemberAdd = snapshot.val().guildMemberAdd;
                const guildMemberRemove = snapshot.val().guildMemberRemove;

                if (subCommand === "info") {
                    return await interaction.editReply({
                        "embeds": [
                            {
                                "title": interaction.client.translate.commands.notify.title,
                                "description": interaction.client.translate.commands.notify.description
                                    .replace("%s1", (alert ? ("<#" + alert + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s2", (channelCreate ? ("<#" + channelCreate + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s3", (channelDelete ? ("<#" + channelDelete + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s4", (channelPinsUpdate ? ("<#" + channelPinsUpdate + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s5", (channelUpdate ? ("<#" + channelUpdate + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s6", (emojiCreate ? ("<#" + emojiCreate + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s7", (emojiDelete ? ("<#" + emojiDelete + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s8", (emojiUpdate ? ("<#" + emojiUpdate + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s9", (guildMemberAdd ? ("<#" + guildMemberAdd + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s10", (guildMemberRemove ? ("<#" + guildMemberRemove + ">") : interaction.client.translate.commands.notify.not_set))
                                    .replace("%s11", (prefix + module.exports.help.usage))
                                    .replace("%s12", ("/" + module.exports.help.usage)),
                                "color": 14684245,
                                "timestamp": new Date(),
                                "footer": {
                                    "text": interaction.client.translate.commands.notify.data_at
                                }
                            }
                        ]
                    });
                }

                if (subCommand === "set") {
                    const channel = interaction.guild.channels.cache.find(channels => (channels.id === inputChannel.value) || (channels.name === inputChannel.value));

                    if (!channel) return await interaction.editReply(interaction.client.translate.commands.notify.channel_not_found);

                    await set(child(child(dbRef, "notification"), inputType.value), channel.id.toString());
                    await interaction.editReply(interaction.client.translate.commands.notify.set_success.replace("%s1", inputType.value).replace("%s2", channel.name));
                }

                if (subCommand === "remove") {
                    await set(child(child(dbRef, "notification"), inputType.value), false);
                    await interaction.editReply(interaction.client.translate.commands.notify.remove_success.replace("%s", inputType.value));
                }
            } else {
                set(child(dbRef, "notification"), {
                    "alert": false,
                    "channelCreate": false,
                    "channelDelete": false,
                    "channelPinsUpdate": false,
                    "channelUpdate": false,
                    "emojiCreate": false,
                    "emojiDelete": false,
                    "emojiUpdate": false,
                    "guildMemberAdd": false,
                    "guildMemberRemove": false
                }).then(() => {
                    module.exports.interaction.execute(interaction);
                });
            }
        });
    }
};