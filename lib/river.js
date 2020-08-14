const io = require("socket.io-client");

class River {
  constructor(options) {
    this.host = options.host;
    // connect to server
    this.socket = io(this.host, { transports: ["websocket"], upgrade: false });

    // not authenticated yet
    this.auth = false;

    this.socket.on("connect", () => {
      this.socket.emit("authenticate", {
        token: options.jwt,
      });

      this.socket.on("authenticated", () => {
        this.auth = true;
        console.log("authentication successful!");
      });

      this.socket.on("unauthorized", (msg) => {
        console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        throw new Error(msg.data.type);
      });
    });
  }

  subscribe(channel) {
    if (this.auth) {
      this.socket.emit("subscribe", channel);
    } else {
      // not authenticated yet, wait until auth is true before sending!
      const intervalId = setInterval(() => {
        if (this.auth) {
          clearInterval(intervalId);
          this.socket.emit("subscribe", channel);
        }
      }, 1000);
    }
  }

  unsubscribe(channel) {
    this.socket.emit("unsubscribe", channel);
  }

  disconnect() {
    this.socket.close();
  }

  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }
}

module.exports = River;
