module.exports.run = (client, message, args) => {
    const queue = client.music.getQueue(message);

    if (!queue) return message.reply(client.translate.commands.resume.no_queue);
    if (message.author.id !== queue.songs[0].user.id && queue.autoplay === false) return message.reply(client.translate.commands.resume.not_owner);
    if (!queue.paused) return message.reply(client.translate.commands.resume.now_playing);

    client.music.resume(message);
    message.channel.send(client.translate.commands.resume.resumed);
};

module.exports.help = {
    "name": "resume",
    "description": "Continue playing music from the beginning.",
    "usage": "resume",
    "category": "music",
    "aliases": ["rs", "เล่นต่อ", "ต่อ"],
    "clientPermissions": ["SEND_MESSAGES"]
};

module.exports.interaction = {
    "data": {
        "name": module.exports.help.name,
        "name_localizations": {
            "en-US": "resume",
            "th": "เล่นต่อ"
        },
        "description": module.exports.help.description,
        "description_localizations": {
            "en-US": "Continue playing music from the beginning.",
            "th": "เล่นเพลงต่อจากจุดเริ่มต้น"
        }
    },
    async execute(interaction) {
        const queue = interaction.client.music.getQueue(interaction);

        if (!queue) return await interaction.editReply(interaction.client.translate.commands.resume.no_queue);
        if (interaction.user.id !== queue.songs[0].user.id && queue.autoplay === false) return await interaction.editReply(interaction.client.translate.commands.resume.not_owner);
        if (!queue.paused) return await interaction.editReply(interaction.client.translate.commands.resume.now_playing);

        interaction.client.music.resume(interaction);
        await interaction.editReply(interaction.client.translate.commands.resume.resumed);
    }
};