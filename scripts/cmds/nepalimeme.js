module.exports = {
	config: {
		name: "nepalimeme",
		aliases: ["NM"],
		version: "1.0",
		author: "AceGun",
		countDown: 5,
		role: 0,
		shortDescription: "send you pic of dank meme",
		longDescription: "",
		category: "fun",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ "https://i.ibb.co/th0Zg4R/image.jpg",
"https://i.ibb.co/524Pm4S/image.jpg",
"https://i.ibb.co/b32Dxvb/image.jpg",
"https://i.ibb.co/y660mHd/image.jpg",
"https://i.ibb.co/LgFfYG6/image.jpg",
"https://i.ibb.co/w6BKW0f/image.jpg",
"https://i.ibb.co/2vGjvz1/image.jpg",
"https://i.ibb.co/qxbJdsP/image.jpg",
"https://i.ibb.co/Z8gptYy/image.jpg",
"https://i.ibb.co/hBMWB4y/image.jpg",
"https://i.ibb.co/MPyBfQ9/image.jpg",
"https://i.ibb.co/LSYdMmL/image.jpg",
"https://i.ibb.co/rmMGwq1/image.jpg",
"https://i.ibb.co/qmvpN0q/image.jpg",
"https://i.ibb.co/BT8MqZp/image.jpg",
"https://i.ibb.co/8s8Rs2y/image.jpg",
"https://i.ibb.co/3MrY39j/image.jpg",
"https://i.ibb.co/k3YVp4P/image.jpg",
"https://i.ibb.co/fXct1X2/image.jpg",
"https://i.ibb.co/hcPwFF0/image.jpg",
"https://i.ibb.co/ngR59Rx/image.jpg",
"https://i.ibb.co/N9M3Dj9/image.jpg",
"https://i.ibb.co/7WNTRbd/image.jpg",
"https://i.ibb.co/bsM4qpC/image.jpg",
"https://i.ibb.co/Fq62FK8/image.jpg",
"https://i.ibb.co/KXg7q7Y/image.jpg",
"https://i.ibb.co/4K8Bq4q/image.jpg",
"https://i.ibb.co/QFYJQjk/image.jpg",
"https://i.ibb.co/FHQckmJ/image.jpg",
"https://i.ibb.co/X4V8vyn/image.jpg",
"https://i.ibb.co/MVp2QnX/image.jpg",
"https://i.ibb.co/NtDQGzf/image.jpg",
"https://i.ibb.co/ySyLpqY/image.jpg",
"https://i.ibb.co/9gBnPSQ/image.jpg",
"https://i.ibb.co/C9dgrXP/image.jpg",
"https://i.ibb.co/tz0Kj88/image.jpg",
"https://i.ibb.co/XjzBxcZ/image.jpg",
"https://i.ibb.co/KNh26G5/image.jpg",
"https://i.ibb.co/9NCC896/image.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
 attachment: await global.utils.getStreamFromURL(img)
})
}
}