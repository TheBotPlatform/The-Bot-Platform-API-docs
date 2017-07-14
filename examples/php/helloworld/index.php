<?php

$rawData = file_get_contents("php://input");
$data = json_decode($rawData);

if (isset($data->item)) {

  $response = array(
    "recipient" => array(
      "id" => $data->fbuser->fbid
    ),
    // construct the message using [Messenger's send API structure](https://developers.facebook.com/docs/messenger-platform/send-api-reference#request)
    "message" => array(
      "text" => "You said " . $data->item->message->text
    )
  );
}
else {
  // this is probably just the check The Bot Platform does on the URL
  $response = array();
}

// display the response in json format
echo json_encode($response);
