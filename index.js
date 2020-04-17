const rss = require("rss");
const Channel = require("./Channel");

//TODO: when a list of messages is passed generate the complete rss with feed.item
function rssGenerator(channel, messages) {
  if (channel == null) throw "channel should not be null";
  if (!channel instanceof Channel)
    throw "channel should be an instance of Channel";
  if (!channel.title)
    throw "channel.getChannelInfos should be called before generating rss";

  const options = {
    title: channel.title,
    description: channel.description,
    generator: "telegram_rss",
    image_url: channel.profile_photo,
    "site_url ": "https://t.me/" + channel.username,
  };

  const feed = new rss(options);

  const xml = feed.xml({ indent: true });

  console.log(xml);
  return xml;
}

const channel = new Channel("test_telegram_rss");
channel.getChannelInfos().then(_ => {
  rssGenerator(channel, null);
});
