module.exports = {
	config: {
		name: "whatsapp",
		aliases: [" wa"],
		version: "1.0",
		author: "ZenitshuAgatsumaARBIN",
		countDown: 5,
		role: 0,
		shortDescription: "contact admin bot via whatsapp",
		longDescription: "",
		category: "contacts admin",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ "https://i.ibb.co/4PZ72RC/image.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
 attachment: await global.utils.getStreamFromURL(img)
})
}
}