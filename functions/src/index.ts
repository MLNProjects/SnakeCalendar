import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const onSnakeCreate = functions.database
  .ref("/users/{userId}/snakes/{snakeId}")
  .onCreate((snapshot: any, context) => {
    const userId = context.params.userId;
    const snakeId = context.params.snakeId;
    console.log(`User ${userId} created snake ${snakeId}`);

    const snakeData = snapshot.val();
    const snakeName = addSnek(snakeData.snakeName);
    return snapshot.ref.update({ snakeName: snakeName });
  });

function addSnek(text: string): string {
  return text.replace(/snek/g, "🐍");
}

export const checkSnake = functions.https.onRequest((req, res) => {
  const currentTime = new Date();
  console.log(
    `This is a cron job, the time is now ${currentTime.getHours()}:${currentTime.getMinutes()}`
  );
  return res
    .status(200)
    .send(
      `The time is now ${currentTime.getHours()}:${currentTime.getMinutes()}`
    );
});
