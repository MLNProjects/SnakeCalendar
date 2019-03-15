import * as functions from "firebase-functions";

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
