const io = require("socket.io-client");

class River {
  constructor(options) {
    this.host = options.host;
    this.socket = io(this.host, {
      transports: ["websocket"],
      upgrade: false,
      path: "/ws",
    });

    this.socket.on("connect", () => {
      this.socket
        .emit("authenticate", {
          token: options.jwt,
        })
        .on("authenticated", () => {
          console.log("authentication successful!");
        })
        .on("unauthorized", (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          throw new Error(msg.data.type);
        });
    });
  }

  subscribe(channel) {
    this.socket.emit("subscribe", channel);
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
