module.exports = {
	config: {
		name: "esewa",
		aliases: ["payment"],
		version: "1.0",
		author: "ZenitshuAgatsumaARBIN",
		countDown: 5,
		role: 2,
		shortDescription: "get admins ewewa qr code for payment",
		longDescription: "",
		category: "utility",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ "https://i.ibb.co/VNhqBFq/image.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
 attachment: await global.utils.getStreamFromURL(img)
})
}
}