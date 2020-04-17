const Message = require("./message.js");
const axios = require("axios").default;
const cheerio = require("cheerio");

class Channel {
  constructor(username) {
    this.username = username;
    this.BASE_URL = "https://t.me/";
  }

  getChannelInfos() {
    return axios
      .get(this.BASE_URL + this.username)
      .then((response) => {
        if (response.status == 200) {
          const body = response.data;

          const title = cheerio(".tgme_page_title", body).text();
          const description = cheerio(".tgme_page_description", body).text();
          const profile_photo = cheerio(".tgme_page_photo_image", body).attr(
            "src"
          );
          this.title = title.trim();
          this.description = description.trim();
          this.profile_photo = profile_photo.trim();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  getMessage(id) {
    return axios
      .get(BASE_URL + CHANNEL_USERNAME + "/" + id + "?embed=true")
      .then((response) => {
        if (response.status == 200) {
          const message = new Message();
          const body = response.data;

          const error = cheerio(".tgme_widget_message_error", body).text();
          if (error) {
            return null;
          }

          const image = cheerio(".tgme_widget_message_photo_wrap", body);
          if (image.text()) {
            const image_url = image.attr("style").match("'(.*?)'")[1].trim();
            message.image_url = image_url;
          }

          message.content = cheerio(".tgme_widget_message_text", body).text();
          message.date_time = Date(cheerio(".datetime", body).attr("datetime"));
          message.channel = this;
          messsage.id = id;

          return result;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = Channel;
