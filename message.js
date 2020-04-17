class Message {
    get channel() {
        return this._channel;
    }

    set channel(channel) {
        this._channel = channel;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get content() {
        return this._content;
    }

    set content(content) {
        this._content = content;
    }

    get datetime() {
        return this._datetime;
    }

    set datetime(datetime) {
        this._datetime = datetime;
    }

    get image_url() {
        return this._image_url;
    }

    set image_url(image_url) {
        this._image_url = image_url;
    }
}

module.exports = Message;
