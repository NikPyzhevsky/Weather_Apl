import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import { Text } from "react-native";
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component {
	componentDidMount() {
		console.log("dsa");
		PushNotification.configure({
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function (token) {
				console.log("TOKEN:", token);
			},

			// (required) Called when a remote or local notification is opened or received
			onNotification: function (notification) {
				console.log("NOTIFICATION:", notification);

				// process the notification here

				// required on iOS only
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			// Android only
			senderID: "485533304264",
			// iOS only
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},
			popInitialNotification: true,
			requestPermissions: Platform.OS === "ios",
		});
	}

	render() {
		return <Text>1</Text>;
	}
}
