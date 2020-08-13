# River JavaScript client for the browser

## Installation

```
npm install river-client-js
```

## Initialization

To configure the client, use the RiverJS constructor:

```javascript
const River = require("river-client-js");

const river = new River({
  host: "localhost", // River server endpoint
  jwt: "your JWT", // the token should be signed using the secret you received when deploying River
});
```

When the constructor is called, a connection is established with the River server.

## Authorization

TODO

## Subsribe

```javascript
river.subscribe("my-channel");
```

## Unsubscribe

```javascript
river.unsubscribe("my-channel");
```

## Receiving messages

```javascript
river.on("eventName", (data) => {
  // do something
})

// data payload example
{
  channel: 'my-channel',
  data: data
}
```
