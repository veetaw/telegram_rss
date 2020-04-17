// TODO: development

// getChannelInfos().then(channel => {
//   console.log(channel.title);
//   console.log(channel.description);
//   console.log(channel.profile_photo);
//   console.log(channel.username);
// });

// getMessage(7).then((message) => {
//   if (!message) return;
//   console.log(message.content);
//   console.log(message.date_time);
//   if (message.image_url) console.log(message.image_url);
// });

const Channel = require("./channel");
const _channel = new Channel("test_telegram_rss")

_channel.getChannelInfos().then(_ => {
  console.log(_channel.title);
});