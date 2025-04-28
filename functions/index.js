// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotification = functions.https.onCall(async (data, context) => {
  // Kiểm tra người dùng đã đăng nhập
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in",
    );
  }

  const {token, title, body, data: notificationData} = data;

  // Cấu trúc thông báo
  const message = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: notificationData,
    android: {
      priority: "high",
    },
  };

  try {
    // Gửi thông báo
    await admin.messaging().send(message);
    return {success: true};
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Error sending notification ",
    );
  }
});
