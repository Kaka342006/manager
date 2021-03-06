const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    const inputData = args[0];

    const dateFormat = (data) => {
        if (!data) return;

        const date = new Date(data);
        const days = [
            client.translate.commands.guild.sunday,
            client.translate.commands.guild.monday,
            client.translate.commands.guild.tuesday,
            client.translate.commands.guild.wednesday,
            client.translate.commands.guild.thursday,
            client.translate.commands.guild.friday,
            client.translate.commands.guild.saturday
        ];
        const months = [
            client.translate.commands.guild.january,
            client.translate.commands.guild.february,
            client.translate.commands.guild.march,
            client.translate.commands.guild.april,
            client.translate.commands.guild.may,
            client.translate.commands.guild.june,
            client.translate.commands.guild.july,
            client.translate.commands.guild.august,
            client.translate.commands.guild.september,
            client.translate.commands.guild.october,
            client.translate.commands.guild.november,
            client.translate.commands.guild.december
        ];

        return client.translate.commands.guild.format_at
            .replace("%s1", days[date.getDay()])
            .replace("%s2", date.getDate())
            .replace("%s3", months[date.getMonth()])
            .replace("%s4", date.getFullYear())
            .replace("%s5", date.getHours())
            .replace("%s6", date.getMinutes());
    }

    const afkChannelId = message.guild.afkChannelId || client.translate.commands.guild.unknown;
    const afkTimeout = message.guild.afkTimeout.toString() || client.translate.commands.guild.unknown;
    const applicationId = message.guild.applicationId || client.translate.commands.guild.do_not_have;
    const approximateMemberCount = message.guild.approximateMemberCount || client.translate.commands.guild.unknown;
    const approximatePresenceCount = message.guild.approximatePresenceCount || client.translate.commands.guild.unknown;
    const available = message.guild.available ? client.translate.commands.guild.available : client.translate.commands.guild.unavailable;
    const banner = message.guild.bannerURL() || client.translate.commands.guild.do_not_have;
    const createdAt = dateFormat(message.guild.createAt) || client.translate.commands.guild.unknown;
    const createdTimestamp = dateFormat(message.guild.createdTimestamp) || client.translate.commands.guild.unknown;
    const defaultMessageNotification = message.guild.defaultMessageNotification || client.translate.commands.guild.unknown;
    const description = message.guild.description || client.translate.commands.guild.do_not_have;
    const discoverySplash = message.guild.discoverySplashURL() || client.translate.commands.guild.do_not_have;
    const explicitContentFilter = message.guild.explicitContentFilter || client.translate.commands.guild.unknown;
    const features = message.guild.features.join() || client.translate.commands.guild.do_not_have;
    const icon = message.guild.iconURL() || client.translate.commands.guild.unknown;
    const id = message.guild.id || client.translate.commands.guild.unknown;
    const joinedAt = dateFormat(message.guild.joinedAt) || client.translate.commands.guild.unknown;
    const joinTimestamp = dateFormat(message.guild.joinTimestamp) || client.translate.commands.guild.unknown;
    const large = message.guild.large ? client.translate.commands.guild.yes : client.translate.commands.guild.no;
    const maximumMembers = message.guild.maximumMembers.toString() || client.translate.commands.guild.unknown;
    const maximumPresences = message.guild.maximumPresences || client.translate.commands.guild.unknown;
    const memberCount = message.guild.memberCount.toString() || client.translate.commands.guild.unknown;
    const mfaLevel = message.guild.mfaLevel || client.translate.commands.guild.unknown;
    const name = message.guild.name || client.translate.commands.guild.unknown;
    const nameAcronym = message.guild.nameAcronym || client.translate.commands.guild.do_not_have;
    const nsfwLevel = message.guild.nsfwLevel || client.translate.commands.guild.unknown;
    const ownerId = message.guild.ownerId || client.translate.commands.guild.unknown;
    const partnered = message.guild.partnered ? client.translate.commands.guild.yes : client.translate.commands.guild.none;
    const preferredLocale = message.guild.preferredLocale || client.translate.commands.guild.unknown;
    const premiumSubscriptionCount = message.guild.premiumSubscriptionCount.toString() || client.translate.commands.guild.unknown;
    const premiumTier = message.guild.premiumTier || client.translate.commands.guild.unknown;
    const publicUpdatesChannelId = message.guild.publicUpdatesChannelId || client.translate.commands.guild.unknown;
    const rulesChannelId = message.guild.rulesChannelId || client.translate.commands.guild.unknown;
    const splash = message.guild.splashURL() || client.translate.commands.guild.do_not_have;
    const systemChannelId = message.guild.systemChannelId || client.translate.commands.guild.unknown;
    const vanityURLCode = message.guild.vanityURLCode || client.translate.commands.guild.do_not_have;
    const vanityURLUses = message.guild.vanityURLUses || client.translate.commands.guild.unknown;
    const verificationLevel = message.guild.verificationLevel || client.translate.commands.guild.unknown;
    const verified = message.guild.verified ? client.translate.commands.guild.yes : client.translate.commands.guild.none;
    const widgetChannelId = message.guild.widgetChannelId || client.translate.commands.guild.unknown;
    const widgetEnabled = message.guild.widgetEnabled ? client.translate.commands.guild.on : client.translate.commands.guild.off;

    const clientUsername = client.user.username;
    const clientAvatarURL = client.user.avatarURL();
    const embed = new MessageEmbed()
        .setTitle(client.translate.commands.guild.server_info)
        .setDescription(client.translate.commands.guild.server_info_description)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter({ "text": client.translate.commands.guild.info_date, "iconURL": icon })
        .setThumbnail(icon)
        .setAuthor({ "name": clientUsername, "iconURL": clientAvatarURL });

    const info = [
        "afkChannelId",
        "afkTimeout",
        "applicationId",
        "approximateMemberCount",
        "approximatePresenceCount",
        "available",
        "banner",
        "createdAt",
        "createdTimestamp",
        "defaultMessageNotification",
        "description",
        "discoverySplash",
        "explicitContentFilter",
        "features",
        "icon",
        "id",
        "joinedAt",
        "joinTimestamp",
        "large",
        "maximumMembers",
        "maximumPresences",
        "memberCount",
        "mfaLevel",
        "name",
        "nameAcronym",
        "nsfwLevel",
        "ownerId",
        "partnered",
        "preferredLocale",
        "premiumSubscriptionCount",
        "premiumTier",
        "publicUpdatesChannelId",
        "rulesChannelId",
        "splash",
        "systemChannelId",
        "vanityURLCode",
        "vanityURLUses",
        "verificationLevel",
        "verified",
        "widgetChannelId",
        "widgetEnabled"
    ];

    const infoList = [
        { "name": client.translate.commands.guild.afk_channel_id, "value": afkChannelId, "inline": true },
        { "name": client.translate.commands.guild.afk_timeout, "value": afkTimeout, "inline": true },
        { "name": client.translate.commands.guild.application_id, "value": applicationId, "inline": true },
        { "name": client.translate.commands.guild.approximate_member_count, "value": approximateMemberCount, "inline": true },
        { "name": client.translate.commands.guild.approximate_presence_count, "value": approximatePresenceCount, "inline": true },
        { "name": client.translate.commands.guild.guild_available, "value": available, "inline": true },
        { "name": client.translate.commands.guild.banner, "value": banner, "inline": true },
        { "name": client.translate.commands.guild.create_at, "value": createdAt, "inline": true },
        { "name": client.translate.commands.guild.create_timestamp, "value": createdTimestamp, "inline": true },
        { "name": client.translate.commands.guild.default_message_notification, "value": defaultMessageNotification, "inline": true },
        { "name": client.translate.commands.guild.description, "value": description, "inline": true },
        { "name": client.translate.commands.guild.discovery_splash, "value": discoverySplash, "inline": true },
        { "name": client.translate.commands.guild.explicit_content_filter, "value": explicitContentFilter, "inline": true },
        { "name": client.translate.commands.guild.features, "value": features, "inline": true },
        { "name": client.translate.commands.guild.icon, "value": icon, "inline": true },
        { "name": client.translate.commands.guild.id, "value": id, "inline": true },
        { "name": client.translate.commands.guild.joined_at, "value": joinedAt, "inline": true },
        { "name": client.translate.commands.guild.join_timestamp, "value": joinTimestamp, "inline": true },
        { "name": client.translate.commands.guild.large, "value": large, "inline": true },
        { "name": client.translate.commands.guild.maximum_members, "value": maximumMembers, "inline": true },
        { "name": client.translate.commands.guild.maximum_presences, "value": maximumPresences, "inline": true },
        { "name": client.translate.commands.guild.member_count, "value": memberCount, "inline": true },
        { "name": client.translate.commands.guild.mfa_level, "value": mfaLevel, "inline": true },
        { "name": client.translate.commands.guild.name, "value": name, "inline": true },
        { "name": client.translate.commands.guild.name_acronym, "value": nameAcronym, "inline": true },
        { "name": client.translate.commands.guild.nsfw_level, "value": nsfwLevel, "inline": true },
        { "name": client.translate.commands.guild.owner_id, "value": ownerId, "inline": true },
        { "name": client.translate.commands.guild.partnered, "value": partnered, "inline": true },
        { "name": client.translate.commands.guild.preferred_locale, "value": preferredLocale, "inline": true },
        { "name": client.translate.commands.guild.premium_subscription_count, "value": premiumSubscriptionCount, "inline": true },
        { "name": client.translate.commands.guild.premium_tier, "value": premiumTier, "inline": true },
        { "name": client.translate.commands.guild.public_updates_channel_id, "value": publicUpdatesChannelId, "inline": true },
        { "name": client.translate.commands.guild.rules_channel_id, "value": rulesChannelId, "inline": true },
        { "name": client.translate.commands.guild.splash, "value": splash, "inline": true },
        { "name": client.translate.commands.guild.system_channel_id, "value": systemChannelId, "inline": true },
        { "name": client.translate.commands.guild.vanity_url_code, "value": vanityURLCode, "inline": true },
        { "name": client.translate.commands.guild.vanity_url_uses, "value": vanityURLUses, "inline": true },
        { "name": client.translate.commands.guild.verification_level, "value": verificationLevel, "inline": true },
        { "name": client.translate.commands.guild.verified, "value": verified, "inline": true },
        { "name": client.translate.commands.guild.widget_channel_id, "value": widgetChannelId, "inline": true },
        { "name": client.translate.commands.guild.widget_enabled, "value": widgetEnabled, "inline": true }
    ];

    if (inputData) {
        if (info.includes(inputData)) {
            for (let i = 0; i < info.length; i++) {
                if (inputData === info[i]) {
                    embed.addFields(infoList[i]);
                    message.channel.send({ "embeds": [embed] });
                }
            }
        } else {
            message.reply(client.translate.commands.guild.specific_use.replace("%s", info.join(", ")));
        }
    } else {
        embed.addFields(Array.from(infoList));
        message.channel.send({ "embeds": [embed] });
    }
};

module.exports.help = {
    "name": "guild",
    "description": "Get information about the server.",
    "usage": "guild (info)",
    "category": "information",
    "aliases": ["guildinfo", "gi", "????????????????????????????????????????????????????????????"],
    "clientPermissions": ["SEND_MESSAGES"]
};

module.exports.interaction = {
    "data": {
        "name": module.exports.help.name,
        "name_localizations": {
            "en-US": "guild",
            "th": "???????????????"
        },
        "description": module.exports.help.description,
        "description_localizations": {
            "en-US": "Get information about the server.",
            "th": "???????????????????????????????????????????????????????????????????????????????????????"
        },
        "options": [
            {
                "type": 3,
                "name": "info",
                "name_localizations": {
                    "th": "??????????????????"
                },
                "description": "The information you want to be specific, for example afkChannelId.",
                "description_localizations": {
                    "th": "???????????????????????????????????????????????????????????????????????????????????? afkChannelId"
                },
                "required": false
            }
        ]
    },
    async execute(interaction) {
        const inputInfo = interaction.options.get("info");

        const dateFormat = (data) => {
            if (!data) return;

            const date = new Date(data);
            const days = [
                interaction.client.translate.commands.guild.sunday,
                interaction.client.translate.commands.guild.monday,
                interaction.client.translate.commands.guild.tuesday,
                interaction.client.translate.commands.guild.wednesday,
                interaction.client.translate.commands.guild.thursday,
                interaction.client.translate.commands.guild.friday,
                interaction.client.translate.commands.guild.saturday
            ];
            const months = [
                interaction.client.translate.commands.guild.january,
                interaction.client.translate.commands.guild.february,
                interaction.client.translate.commands.guild.march,
                interaction.client.translate.commands.guild.april,
                interaction.client.translate.commands.guild.may,
                interaction.client.translate.commands.guild.june,
                interaction.client.translate.commands.guild.july,
                interaction.client.translate.commands.guild.august,
                interaction.client.translate.commands.guild.september,
                interaction.client.translate.commands.guild.october,
                interaction.client.translate.commands.guild.november,
                interaction.client.translate.commands.guild.december
            ];

            return interaction.client.translate.commands.guild.format_at
                .replace("%s1", days[date.getDay()])
                .replace("%s2", date.getDate())
                .replace("%s3", months[date.getMonth()])
                .replace("%s4", date.getFullYear())
                .replace("%s5", date.getHours())
                .replace("%s6", date.getMinutes());
        }

        const afkChannelId = interaction.guild.afkChannelId || interaction.client.translate.commands.guild.unknown;
        const afkTimeout = interaction.guild.afkTimeout.toString() || interaction.client.translate.commands.guild.unknown;
        const applicationId = interaction.guild.applicationId || interaction.client.translate.commands.guild.do_not_have;
        const approximateMemberCount = interaction.guild.approximateMemberCount || interaction.client.translate.commands.guild.unknown;
        const approximatePresenceCount = interaction.guild.approximatePresenceCount || interaction.client.translate.commands.guild.unknown;
        const available = interaction.guild.available ? interaction.client.translate.commands.guild.available : interaction.client.translate.commands.guild.unavailable;
        const banner = interaction.guild.bannerURL() || interaction.client.translate.commands.guild.do_not_have;
        const createdAt = dateFormat(interaction.guild.createAt) || interaction.client.translate.commands.guild.unknown;
        const createdTimestamp = dateFormat(interaction.guild.createdTimestamp) || interaction.client.translate.commands.guild.unknown;
        const defaultMessageNotification = interaction.guild.defaultMessageNotification || interaction.client.translate.commands.guild.unknown;
        const description = interaction.guild.description || interaction.client.translate.commands.guild.do_not_have;
        const discoverySplash = interaction.guild.discoverySplashURL() || interaction.client.translate.commands.guild.do_not_have;
        const explicitContentFilter = interaction.guild.explicitContentFilter || interaction.client.translate.commands.guild.unknown;
        const features = interaction.guild.features.join() || interaction.client.translate.commands.guild.do_not_have;
        const icon = interaction.guild.iconURL() || interaction.client.translate.commands.guild.unknown;
        const id = interaction.guild.id || interaction.client.translate.commands.guild.unknown;
        const joinedAt = dateFormat(interaction.guild.joinedAt) || interaction.client.translate.commands.guild.unknown;
        const joinTimestamp = dateFormat(interaction.guild.joinTimestamp) || interaction.client.translate.commands.guild.unknown;
        const large = interaction.guild.large ? interaction.client.translate.commands.guild.yes : interaction.client.translate.commands.guild.no;
        const maximumMembers = interaction.guild.maximumMembers.toString() || interaction.client.translate.commands.guild.unknown;
        const maximumPresences = interaction.guild.maximumPresences || interaction.client.translate.commands.guild.unknown;
        const memberCount = interaction.guild.memberCount.toString() || interaction.client.translate.commands.guild.unknown;
        const mfaLevel = interaction.guild.mfaLevel || interaction.client.translate.commands.guild.unknown;
        const name = interaction.guild.name || interaction.client.translate.commands.guild.unknown;
        const nameAcronym = interaction.guild.nameAcronym || interaction.client.translate.commands.guild.do_not_have;
        const nsfwLevel = interaction.guild.nsfwLevel || interaction.client.translate.commands.guild.unknown;
        const ownerId = interaction.guild.ownerId || interaction.client.translate.commands.guild.unknown;
        const partnered = interaction.guild.partnered ? interaction.client.translate.commands.guild.yes : interaction.client.translate.commands.guild.none;
        const preferredLocale = interaction.guild.preferredLocale || interaction.client.translate.commands.guild.unknown;
        const premiumSubscriptionCount = interaction.guild.premiumSubscriptionCount.toString() || interaction.client.translate.commands.guild.unknown;
        const premiumTier = interaction.guild.premiumTier || interaction.client.translate.commands.guild.unknown;
        const publicUpdatesChannelId = interaction.guild.publicUpdatesChannelId || interaction.client.translate.commands.guild.unknown;
        const rulesChannelId = interaction.guild.rulesChannelId || interaction.client.translate.commands.guild.unknown;
        const splash = interaction.guild.splashURL() || interaction.client.translate.commands.guild.do_not_have;
        const systemChannelId = interaction.guild.systemChannelId || interaction.client.translate.commands.guild.unknown;
        const vanityURLCode = interaction.guild.vanityURLCode || interaction.client.translate.commands.guild.do_not_have;
        const vanityURLUses = interaction.guild.vanityURLUses || interaction.client.translate.commands.guild.unknown;
        const verificationLevel = interaction.guild.verificationLevel || interaction.client.translate.commands.guild.unknown;
        const verified = interaction.guild.verified ? interaction.client.translate.commands.guild.yes : interaction.client.translate.commands.guild.none;
        const widgetChannelId = interaction.guild.widgetChannelId || interaction.client.translate.commands.guild.unknown;
        const widgetEnabled = interaction.guild.widgetEnabled ? interaction.client.translate.commands.guild.on : interaction.client.translate.commands.guild.off;

        const clientUsername = interaction.client.user.username;
        const clientAvatarURL = interaction.client.user.avatarURL();
        const embed = new MessageEmbed()
            .setTitle(interaction.client.translate.commands.guild.server_info)
            .setDescription(interaction.client.translate.commands.guild.server_info_description)
            .setColor("BLUE")
            .setTimestamp()
            .setFooter({ "text": interaction.client.translate.commands.guild.info_date, "iconURL": icon })
            .setThumbnail(icon)
            .setAuthor({ "name": clientUsername, "iconURL": clientAvatarURL });

        const info = [
            "afkChannelId",
            "afkTimeout",
            "applicationId",
            "approximateMemberCount",
            "approximatePresenceCount",
            "available",
            "banner",
            "createdAt",
            "createdTimestamp",
            "defaultMessageNotification",
            "description",
            "discoverySplash",
            "explicitContentFilter",
            "features",
            "icon",
            "id",
            "joinedAt",
            "joinTimestamp",
            "large",
            "maximumMembers",
            "maximumPresences",
            "memberCount",
            "mfaLevel",
            "name",
            "nameAcronym",
            "nsfwLevel",
            "ownerId",
            "partnered",
            "preferredLocale",
            "premiumSubscriptionCount",
            "premiumTier",
            "publicUpdatesChannelId",
            "rulesChannelId",
            "splash",
            "systemChannelId",
            "vanityURLCode",
            "vanityURLUses",
            "verificationLevel",
            "verified",
            "widgetChannelId",
            "widgetEnabled"
        ];

        const infoList = [
            { "name": interaction.client.translate.commands.guild.afk_channel_id, "value": afkChannelId, "inline": true },
            { "name": interaction.client.translate.commands.guild.afk_timeout, "value": afkTimeout, "inline": true },
            { "name": interaction.client.translate.commands.guild.application_id, "value": applicationId, "inline": true },
            { "name": interaction.client.translate.commands.guild.approximate_member_count, "value": approximateMemberCount, "inline": true },
            { "name": interaction.client.translate.commands.guild.approximate_presence_count, "value": approximatePresenceCount, "inline": true },
            { "name": interaction.client.translate.commands.guild.guild_available, "value": available, "inline": true },
            { "name": interaction.client.translate.commands.guild.banner, "value": banner, "inline": true },
            { "name": interaction.client.translate.commands.guild.create_at, "value": createdAt, "inline": true },
            { "name": interaction.client.translate.commands.guild.create_timestamp, "value": createdTimestamp, "inline": true },
            { "name": interaction.client.translate.commands.guild.default_message_notification, "value": defaultMessageNotification, "inline": true },
            { "name": interaction.client.translate.commands.guild.description, "value": description, "inline": true },
            { "name": interaction.client.translate.commands.guild.discovery_splash, "value": discoverySplash, "inline": true },
            { "name": interaction.client.translate.commands.guild.explicit_content_filter, "value": explicitContentFilter, "inline": true },
            { "name": interaction.client.translate.commands.guild.features, "value": features, "inline": true },
            { "name": interaction.client.translate.commands.guild.icon, "value": icon, "inline": true },
            { "name": interaction.client.translate.commands.guild.id, "value": id, "inline": true },
            { "name": interaction.client.translate.commands.guild.joined_at, "value": joinedAt, "inline": true },
            { "name": interaction.client.translate.commands.guild.join_timestamp, "value": joinTimestamp, "inline": true },
            { "name": interaction.client.translate.commands.guild.large, "value": large, "inline": true },
            { "name": interaction.client.translate.commands.guild.maximum_members, "value": maximumMembers, "inline": true },
            { "name": interaction.client.translate.commands.guild.maximum_presences, "value": maximumPresences, "inline": true },
            { "name": interaction.client.translate.commands.guild.member_count, "value": memberCount, "inline": true },
            { "name": interaction.client.translate.commands.guild.mfa_level, "value": mfaLevel, "inline": true },
            { "name": interaction.client.translate.commands.guild.name, "value": name, "inline": true },
            { "name": interaction.client.translate.commands.guild.name_acronym, "value": nameAcronym, "inline": true },
            { "name": interaction.client.translate.commands.guild.nsfw_level, "value": nsfwLevel, "inline": true },
            { "name": interaction.client.translate.commands.guild.owner_id, "value": ownerId, "inline": true },
            { "name": interaction.client.translate.commands.guild.partnered, "value": partnered, "inline": true },
            { "name": interaction.client.translate.commands.guild.preferred_locale, "value": preferredLocale, "inline": true },
            { "name": interaction.client.translate.commands.guild.premium_subscription_count, "value": premiumSubscriptionCount, "inline": true },
            { "name": interaction.client.translate.commands.guild.premium_tier, "value": premiumTier, "inline": true },
            { "name": interaction.client.translate.commands.guild.public_updates_channel_id, "value": publicUpdatesChannelId, "inline": true },
            { "name": interaction.client.translate.commands.guild.rules_channel_id, "value": rulesChannelId, "inline": true },
            { "name": interaction.client.translate.commands.guild.splash, "value": splash, "inline": true },
            { "name": interaction.client.translate.commands.guild.system_channel_id, "value": systemChannelId, "inline": true },
            { "name": interaction.client.translate.commands.guild.vanity_url_code, "value": vanityURLCode, "inline": true },
            { "name": interaction.client.translate.commands.guild.vanity_url_uses, "value": vanityURLUses, "inline": true },
            { "name": interaction.client.translate.commands.guild.verification_level, "value": verificationLevel, "inline": true },
            { "name": interaction.client.translate.commands.guild.verified, "value": verified, "inline": true },
            { "name": interaction.client.translate.commands.guild.widget_channel_id, "value": widgetChannelId, "inline": true },
            { "name": interaction.client.translate.commands.guild.widget_enabled, "value": widgetEnabled, "inline": true }
        ];

        if (inputInfo) {
            if (info.includes(inputInfo.value)) {
                for (let i = 0; i < info.length; i++) {
                    if (inputInfo.value === info[i]) {
                        embed.addFields(infoList[i]);
                        await interaction.editReply({ "embeds": [embed] });
                    }
                }
            } else {
                await interaction.editReply(interaction.client.translate.commands.guild.specific_use.replace("%s", info.join(", ")));
            }
        } else {
            embed.addFields(Array.from(infoList));
            await interaction.editReply({ "embeds": [embed] });
        }
    }
};