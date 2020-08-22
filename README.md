# River JavaScript client for the browser

## Installation

To use in webpack-like build environments:

```
npm install river-client-js
```

and then require the module:

```javascript
const River = require("river-client-js");
```

To download a stand-alone browser script which exposes `River` as a global variable, see the `dist` folder.

## Initialization

To configure the client, use the `River` constructor:

```javascript
const river = new River({
  host: "localhost", // River server endpoint
  jwt: "your JWT", // the token should be signed using the secret you received when deploying River
});
```

When the constructor is called, a connection is established with the River server.

## Authorization

Every connection to River must present a valid JSON Web Token. River supports the `HS256` algorithm at this time. If a token has the `exp` field, this will be checked to make sure the time of the token has not expired. The `exp` field is optional however, and a token without one will never expire. It is recommended that a sensible expiration time is set for every token issued.

The token is generated and signed on your existing application's backend, using the 256-bit secret that is generated upon River deployment (See the [`deploy` repo](https://github.com/river-live/deploy) for more information). The JWT is then passed to the browser, which then passes it to River when trying to connect. River does not dictate how you generate or pass around the JWTs. There are best-practices and many libraries to help with this task.

Any browser client trying to connect to River via WebSocket will receive a connection. River then expects to receive a message within 15 seconds with a valid JWT. If one is not received in that time frame, the WebSocket connection is terminated. When passing in the JWT into the River constuctor, this is all done behind the scenes.

## Usage

### Subscribe

Receive messages on channel `my-channel`:

```javascript
river.subscribe("my-channel");
```

### Unsubscribe

Stop receiving messages on channel `my-channel`:

```javascript
river.unsubscribe("my-channel");
```

### Receiving messages

```javascript
river.on("eventName", (payload) => {
  // do something
})

// payload example
{
  channel: "my-channel",
  data: data
}
```

The callback function given to the `.on` method (as the second argument) is executed every time a message is received with a matching `eventName`, on a channel to which the client is subscribed.

`"my-channel"`, `"eventName"`, and `data` correspond to the `channel`, `eventName`, and `data` given when the event is published to River. Please see the [`http-node`](https://github.com/river-live/http-node) repo for more information.
