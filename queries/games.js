const db = require("../db/dbConfig");

//get all games
async function getGames() {
  try {
    const someGame = await db.any("select * from games ORDER BY id");
    return someGame;
  } catch (e) {
    return e;
  }
}

//get games with num limit
async function getGamesLimit(args) {
  try {
    const someGame = await db.any(
      `select * from games ORDER BY id limit ${args}`
    );
    return someGame;
  } catch (e) {
    return e;
  }
}

// get games with num limit in desc order
async function getGamesLimDesc(args) {
  try {
    const someGame = await db.any(
      `select * from games ORDER BY id desc limit ${args}`
    );
    return someGame;
  } catch (e) {
    return e;
  }
}

//get games by name that contains substring entered
async function getGamesBySubstring(name) {
  try {
    const someGame = await db.any(
      `select * from games where name ILIKE '%${name}%' ORDER BY id DESC`,
      [name]
    );
    return someGame;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getGames,
  getGamesLimit,
  getGamesLimDesc,
  getGamesBySubstring,
};
