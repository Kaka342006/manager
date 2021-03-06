module.exports.run = async (client, message, args) => {
	if (message.member.id !== client.config.owner) return message.reply(client.translate.commands.shutdown.not_owner);

	const inputPassword = args[0];

	if (!client.temp.password) {
		const owner = await client.users.fetch(client.config.owner);
		let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let password = "";

		client.temp.password = 0;

		for (let i = 0; i <= 12; i++) {
			let randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber + 1);
		}

		client.temp.password = password;

		owner.send("**:red_circle: มีคำขอสำหรับการปิดระบบค่าา!!**\nเพื่อยืนยันว่าเป็นท่านกรุณากรอกรหัสผ่านนี้ในเซิร์ฟเวอร์ที่ท่านเรียกใช้คำสั่ง\nท่านสามารถละเว้นได้หากไม่ต้องการดำเนินการต่อ\nขอขอบคุณที่ท่านยังดูแลฉันมาจนถึงทุกวันนี้นะคะ :)\n||%s||".replace("%s", password));
	}
	if (!inputPassword) return message.reply(client.translate.commands.shutdown.password_is_required);
	if (inputPassword !== client.temp.password) return message.reply(client.translate.commands.shutdown.password_is_incorrect);

	message.channel.send(client.translate.commands.shutdown.shutting_down).then((msg) => {
		msg.edit(client.translate.commands.shutdown.now_shutdown).then(async () => {
			await client.destroy();
			process.exit();
		});
	});
};

module.exports.help = {
	"name": "shutdown",
	"description": "Shutdown the bot system.",
	"usage": "shutdown (password)",
	"category": "owner",
	"aliases": ["sd", "ปิดระบบ"],
	"clientPermissions": ["SEND_MESSAGES"]
};

module.exports.interaction = {
	"data": {
		"name": module.exports.help.name,
		"name_localizations": {
			"en-US": "shutdown",
			"th": "ปิดตัวลง"
		},
		"description": module.exports.help.description,
		"description_localizations": {
			"en-US": "Shutdown the bot system.",
			"th": "ปิดระบบบอท"
		},
		"options": [
			{
				"type": 3,
				"name": "password",
				"name_localizations": {
					"th": "รหัสผ่าน"
				},
				"description": "Password to confirm the shutdown of the bot.",
				"description_localizations": {
					"th": "รหัสผ่านเพื่อยืนยันการปิดระบบของบอท"
				},
				"required": false
			}
		]
	},
	async execute(interaction) {
		if (interaction.user.id !== interaction.client.config.owner) return await interaction.editReply(interaction.client.translate.commands.shutdown.not_owner);

		const inputPassword = interaction.options.get("password");

		if (!interaction.client.temp.password) {
			const owner = await interaction.client.users.fetch(interaction.client.config.owner);
			let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			let password = "";

			interaction.client.temp.password = 0;

			for (let i = 0; i <= 12; i++) {
				let randomNumber = Math.floor(Math.random() * chars.length);
				password += chars.substring(randomNumber, randomNumber + 1);
			}

			interaction.client.temp.password = password;

			owner.send("**:red_circle: มีคำขอสำหรับการปิดระบบค่าา!!**\nเพื่อยืนยันว่าเป็นท่านกรุณากรอกรหัสผ่านนี้ในเซิร์ฟเวอร์ที่ท่านเรียกใช้คำสั่ง\nท่านสามารถละเว้นได้หากไม่ต้องการดำเนินการต่อ\nขอขอบคุณที่ท่านยังดูแลฉันมาจนถึงทุกวันนี้นะคะ :)\n||%s||".replace("%s", password));
		}
		if (inputPassword.value !== interaction.client.temp.password) return await interaction.editReply(interaction.client.translate.commands.shutdown.password_is_incorrect);

		await interaction.editReply(interaction.client.translate.commands.shutdown.shutting_down);
		await interaction.client.destroy();
		await interaction.editReply(interaction.client.translate.commands.shutdown.now_shutdown);

		process.exit();
	}
};