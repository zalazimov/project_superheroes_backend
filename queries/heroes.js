const db = require("../db/dbConfig");

//get all superheroes
async function getHeroes() {
  try {
    const someHero = await db.any("select * from superheroes ORDER BY id");
    return someHero;
  } catch (e) {
    return e;
  }
}

//get superheroes with num limit
async function getHeroesLimit(args) {
  try {
    const someHero = await db.any(
      `select * from superheroes ORDER BY id limit ${args}`
    );
    return someHero;
  } catch (e) {
    return e;
  }
}

// get superheroes with num limit in desc order
async function getHeroesLimDesc(args) {
  try {
    const someHero = await db.any(
      `select * from superheroes ORDER BY id desc limit ${args}`
    );
    return someHero;
  } catch (e) {
    return e;
  }
}

//get superheroes by name that contains substring entered
async function getHeroesBySubstring(name) {
  try {
    const someHero = await db.any(
      `select * from superheroes where name ILIKE '%${name}%' ORDER BY id DESC`,
      [name]
    );
    return someHero;
  } catch (e) {
    return e;
  }
}

//get superheroes by name
async function getHeroesByName(name) {
  try {
    const someHero = await db.any(
      "select * from superheroes where name ILIKE $1 ORDER BY id DESC",
      [name]
    );
    return someHero;
  } catch (e) {
    return e;
  }
}

//get superhero by id
async function getHeroById(id) {
  try {
    const hero = await db.any("select * from superheroes where id = $1", id);

    return hero;
  } catch (e) {
    return e;
  }
}

//create a new hero entry
async function addHero(args) {
  let vals = Object.values(args);
  try {
    const newHero = await db.any(
      `INSERT INTO superheroes (${Object.keys(args).join(",")}) 
        VALUES (${vals
          .map((item, i) => {
            return `$${i + 1}`;
          })
          .join(",")}) RETURNING *`,
      vals
    );
    return newHero;
  } catch (e) {
    return e;
  }
}

//deleting a hero entry
async function deleteHero(args) {
  try {
    const deleted = await db.any(
      `DELETE FROM superheroes where id = ${args} RETURNING *`
    );
    return deleted;
  } catch (e) {
    return e;
  }
}

//update a hero entry
async function updateHeroRow(args, id) {
  let arr = Object.keys(args);
  let vals = [...Object.values(args), id];
  try {
    const updateHero = await db.any(
      `UPDATE superheroes SET ${arr
        .map((item, i) => {
          return `${item} = $${i + 1}`;
        })
        .join(", ")} where
        id = $${vals.length} RETURNING *`,
      vals
    );
    return updateHero;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getHeroes,
  getHeroesLimit,
  getHeroesLimDesc,
  getHeroesBySubstring,
  getHeroesByName,
  getHeroById,
  addHero,
  deleteHero,
  updateHeroRow,
};
