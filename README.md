# The Bot Platform API Documentation

## Getting started

To use this, you need a [The Bot Platform](http://thebotplatform.com) account and make sure your Account Manager has granted you API permissions.

The way our API works is simply passing the data from Messenger over to your server for response.

You need to make sure you add your url into the API url settings via your admin area.

![API URL settings](http://i.imgur.com/qOOdrEz.png)

Now any request that comes through from Work Chat or Messenger will now get sent onto your URL.

Along with the data from Facebook we also attach the user profile, and on top of that we also add on any information stored in The Bot Platform brain about that user.

From there you can respond to the request to send a message back to the user, by simply using the same response as the [Messenger Send API structure](https://developers.facebook.com/docs/messenger-platform/send-api-reference#request).

## Example POST payload

```js
{
  "item": {
    "sender": {
      "id": "USER_ID"
    },
    "recipient": {
      "id": "PAGE_ID"
    },
    "timestamp": 1500046868266,
    "message": {
      /* This is the same structure as the [Messenger Webhook reference](https://developers.facebook.com/docs/messenger-platform/webhook-reference/message) */
    }
  },
  "fbuser": {
    "fbid": "USER_ID",
    "first_name": "FIRST_NAME",
    "last_name": "LAST_NAME",
    "profile_pic": "PROFILE_PIC",
    "locale": "LOCALE",
    "timezone": "TIMEZONE",
    "gender": "GENDER",
    "message_count": 56,
    "last_message": 1500046868309,
    "opted_in": '0', // 0 or 1 if they've signed up for broadcasts
    "state: { // this is the state of the user as stored by The Bot Platform's brain
      "messages": {},
      "vars": {},
      "expect": null
    }
  }
}
```

## Example response

```js
{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "text": "Hello world"
  }
}
```

## Examples in action

- [Node JS Hello World](examples/node/helloworld/routes/index.js)
- [PHP Hello World](examples/php/helloworld/index.php)

To view other examples, please make sure you check out the [Messenger docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference#request)

## Troubleshooting

If you're experiencing any issues, or your not sure where to start, don't be afraid to [get in touch](mailto:support@thebotplatform.com).



