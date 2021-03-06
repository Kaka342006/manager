const { getDatabase, ref, push, update } = require("firebase/database");

module.exports.run = async (client, message, args) => {
    const inputMessage = args.join(" ");

    const db = getDatabase();
    const dbRef = ref(db, "Shioru/data/bugs");

    const authorUid = message.author.id;
    const authorTag = message.author.tag;
    const date = new Date();

    if (!inputMessage) return message.reply(client.translate.commands.bug.message_required);
    if (inputMessage.length < 5) return message.reply(client.translate.commands.bug.too_short_message);

    let msg = await message.channel.send(client.translate.commands.bug.sending);
    update(push(dbRef), {
        "message": inputMessage,
        "user": authorTag,
        "uid": authorUid,
        "reportAt": date,
        "status": {
            "read": false,
            "close": false,
            "comment": false
        }
    }).then(() => {
        msg.edit(client.translate.commands.bug.success);
    });
}

module.exports.help = {
    "name": "bug",
    "description": "Report error information about bots.",
    "usage": "bug <message>",
    "category": "me",
    "aliases": ["bugreport", "bugReport", "breport"],
    "clientPermissions": ["SEND_MESSAGES"]
}

module.exports.interaction = {
    "data": {
        "name": module.exports.help.name,
        "name_localizations": {
            "en-US": "bug",
            "th": "บัค"
        },
        "description": module.exports.help.description,
        "description_localizations": {
            "en-US": "Report error information about bots.",
            "th": "รายงานข้อผิดพลาดเกี่ยวกับบอท"
        },
        "options": [
            {
                "type": 3,
                "name": "message",
                "name_localizations": {
                    "th": "ข้อความ"
                },
                "description": "Message about the bugs you find.",
                "description_localizations": {
                    "th": "ข้อความเกี่ยวกับข้อบกพร่องที่คุณพบ"
                },
                "required": true,
                "min_value": 5
            }
        ]
    },
    async execute(interaction) {
        const inputMessage = interaction.options.get("message").value;

        const db = getDatabase();
        const dbRef = ref(db, "Shioru/data/bugs");

        const authorUid = interaction.user.id;
        const authorTag = interaction.user.tag;
        const date = new Date();

        await interaction.editReply(interaction.client.translate.commands.bug.sending);
        
        await update(push(dbRef), {
            "message": inputMessage,
            "user": authorTag,
            "uid": authorUid,
            "reportAt": date,
            "status": {
                "read": false,
                "close": false,
                "comment": false
            }
        });
        
        await interaction.editReply(interaction.client.translate.commands.bug.success);
    }
};