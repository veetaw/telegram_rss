// TODO: mock internet requests
// TODO: check message, old function used to develop: 
// getMessage(7).then((message) => {
//   if (!message) return;
//   console.log(message.content);
//   console.log(message.date_time);
//   if (message.image_url) console.log(message.image_url);
// });
describe("Channel", function() {
  const Channel = require("../../Channel");
  const TEST_USERNAME = "test_telegram_rss";

  var channel;

  beforeEach(function() {
    channel = new Channel(TEST_USERNAME);
  })

  it("Should get channel infos for the test channel", function () {
    channel.getChannelInfos().then(_ => {
      expect(channel.title).toEqual("This is the channel title");
      expect(channel.description).toBeDefined();
      expect(channel.profile_photo).toBeDefined();
      expect(channel.username).toBeDefined();
    });
  })
})
