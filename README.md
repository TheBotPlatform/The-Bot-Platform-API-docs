# The Bot Platform API Documentation

## Getting started

To use this, you need a [The Bot Platform](http://thebotplatform.com) account and make sure your Account Manager has granted you API permissions.

## Webhook message parts

Our platform utilises [webhooks](https://zapier.com/blog/what-are-webhooks/).

When a webhook message part is triggered to a user, the webhook gets called with a POST payload containing all the information present about the user and the message

### Add a webhook message part

You can add a [webhook message part](https://help.thebotplatform.com/en/articles/2625858-webhook-message-part) into a message wherever you want within your bot.

Simply add the URL of your webhook into the option within the message builder.

[Watch a webinar](https://youtu.be/tw9KQEZ_Ivk) on how to connect to 3rd party tools from The Bot Platform.

You can only add one webhook part to any given message.

## Example POST payload

```json
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
    },
    "entities" {
      /* This splits out the message into various NLP entities */
      "datetime": [
        {
          "confidence": 0.97249440664957,
          "values": ["..."],
          "value": "2017-05-10T14:00:00.000-07:00",
          "grain": "hour","type": "value"
        }
      ],
      "greetings": [
        {
          "confidence": 1,
          "value": "true"
        }
      ]
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
    "opted_in": '0', // 0 or 1 if they have signed up for broadcasts
    "state": { // this is the state of the user as stored by The Bot Platform's brain
      "messages": {},
      "vars": {
          "$Experience": "testing"
      },
      "expect": null
    }
  }
}
```

## Example responses

We use the same [Messenger Send API structure](https://developers.facebook.com/docs/messenger-platform/send-api-reference#request) as Facebook.

### Simple text

```json
{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "text": "Hello world"
  }
}
```

### Simple text and set variables for the user

```json
{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "text": "Hello world"
  },
  "set": {
    "$VARIABLE_NAME1": "VARIABLE_VALUE1",
    "$VARIABLE_NAMEn": "VARIABLE_VALUEn"
  }
}
```

### Send a predefined message on the platform

```json
{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "id": "@BP:MESSAGE:4182"
  }
}
```

### Send a custom response

```json
{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "raw": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "The Bot Platform",
            "subtitle": "Bots bots bots",
            "image_url": "https://thebotplatform.com/assets/img/brand-logo-@2x.png",
            "buttons": [{
              "type": "web_url",
              "url": "https://thebotplatform.com",
              "title": "Website"
            }]
          }]
        }
      }
    }
  }
}
```

### Send a multipart response
```json
{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "raw": {
      "multipart": [{
        "text": "one"
      }, { 
        "text": "two"
      }, {
        "text": "three"
      }]
    }
  }
}
```


## Examples in action

- [Node JS Hello World](examples/node/helloworld/routes/index.js)
- [PHP Hello World](examples/php/helloworld/index.php)

To view other examples, please make sure you check out the [Messenger docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference#request)

## NLP

By default, Messenger's built-in NLP detects the following entities in English only:

- Greetings (English only)
- Thanks (English only)
- Bye (English only)
- Date/Time
- Amount of money
- Phone number
- Email address
- Date and time are automatically localized based on the locale sent in the user's profile.

For example, if someone sends the message, “tomorrow at 2pm” or “2 days before Xmas,” you will get the actual timestamp with the message.

## Troubleshooting

If you're experiencing any issues, or your not sure where to start, don't be afraid to [get in touch](mailto:support@thebotplatform.com).
