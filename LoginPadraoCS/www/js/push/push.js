function push()
var push = PushNotification.init({ "android": {"senderID": "788790867910"},
"ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

push.on('registration', function(data) {
    //console.log(data.registrationId);
    //$("#gcm_id").html(data.registrationId);
    var Token = data.registrationId;
});

push.on('notification', function(data) {
    console.log(data.message);
    alert(data.title+" Message: " +data.message);
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
});

push.on('error', function(e) {
    console.log(e.message);
});
}