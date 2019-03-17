import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

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
  console.log(`CRON job ran at ${currentTime}`);
  const db = admin.database();
  const ref = db.ref("users");
  ref.on("value", gotData, errData);

  return res
    .status(200)
    .send(
      `The time is now ${currentTime.getHours()}:${currentTime.getMinutes()}`
    );
});
let listOfSnakeToDeprecate: Array<any> = [];

function gotData(data: any) {
  listOfSnakeToDeprecate = [];
  const users = data.val();
  const keys = Object.keys(users);
  const currentTime = Date.now();

  //We go throught every user
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]; // k = 6CdPFG5650U3X7HYjXrudyDTNLg2 which is a userId
    const snakes = users[k].snakes; // snakes is the snake object
    const keysSnake = Object.keys(snakes);

    //We now go through every snake
    for (let j = 0; j < keysSnake.length; j++) {
      const k2 = keysSnake[j];
      if (snakes[k2].dateLog) {
        const dateLog = snakes[k2].dateLog; // dateLog is the dateLog object
        const keysDateLog = Object.keys(dateLog);
        const dateLogArray = keysDateLog.map(Number);
        const latestLog = Math.max(...dateLogArray);
        const timeDifference = currentTime - latestLog;
        const shouldDelete = timeDifference > 86400000 ? true : false; // 86400000 is a day in milliseconds
        if (shouldDelete) {
          listOfSnakeToDeprecate.push([k, k2]);
        }
      }
    }
  }
  deprecateSnakes(listOfSnakeToDeprecate);
}

function errData(err: any) {
  console.log(`Error! \n ${err}`);
}

function deprecateSnakes(listOfSnakes: Array<any>) {
  console.log(`deprecatedSnakes is running 🐍🐍🐍🐍🐍🐍🐍🐍🐍`);
  const db = admin.database();
  for (let i = 0; i < listOfSnakes.length; i++) {
    const snakeRef = db.ref(
      `users/${listOfSnakes[i][0]}/snakes/${listOfSnakes[i][1]}`
    );
    snakeRef
      .update({ deprecated: true })
      .then(() => {
        console.log(
          `Deprecated snake ${listOfSnakes[i][1]} from user ${
            listOfSnakes[i][0]
          }`
        );
      })
      .catch((err: any) => console.log(err));
  }
}
