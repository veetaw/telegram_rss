const axios = require("axios").default;
const cheerio = require("cheerio");

const BASE_URL = "https://t.me/";
const CHANNEL_USERNAME = "test_telegram_rss";

function getChannelInfos() {
  return axios
    .get(BASE_URL + CHANNEL_USERNAME)
    .then((response) => {
      if (response.status == 200) {
        const result = {};
        const body = response.data;

        const title = cheerio(".tgme_page_title", body).text();
        const description = cheerio(".tgme_page_description", body).text();
        const profile_photo = cheerio(".tgme_page_photo_image", body).attr(
          "src"
        );
        result["title"] = title.trim();
        result["description"] = description.trim();
        result["profile_photo"] = profile_photo.trim();

        result["username"] = CHANNEL_USERNAME;

        return result;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// TODO: support files
// seems useless beause you can't download files from web
function getMessage(id) {
  return axios
    .get(BASE_URL + CHANNEL_USERNAME + "/" + id + "?embed=true")
    .then((response) => {
      if (response.status == 200) {
        const result = {};
        const body = response.data;

        const error = cheerio(".tgme_widget_message_error", body).text();
        if (error) {
          return null;
        }

        const image = cheerio(".tgme_widget_message_photo_wrap", body);
        if (image.text()) {
          const image_url = image.attr("style").match("'(.*?)'")[1].trim();
          result["image_url"] = image_url;
        }

        const content = cheerio(".tgme_widget_message_text", body).text();
        const date_time = cheerio(".datetime", body).attr("datetime");

        result["content"] = content;
        result["date_time"] = Date(date_time);

        return result;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

getChannelInfos().then(channel => {
  console.log(channel.title);
  console.log(channel.description);
  console.log(channel.profile_photo);
  console.log(channel.username);
});

getMessage(7).then((message) => {
  if (!message) return;
  console.log(message.content);
  console.log(message.date_time);
  if (message.image_url) console.log(message.image_url);
});
