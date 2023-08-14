const express = require("express");
const router = express.Router();
const {
  getGames,
  getGamesLimit,
  getGamesLimDesc,
  getGamesBySubstring,
} = require("../queries/games");

const { checkSearch, checkNum } = require("../validations/crudValidations");

router.get("/", async (req, res) => {
  const games = await getGames();
  if (games[0]) res.json(games);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/:num", checkNum, async (req, res) => {
  const games = await getGamesLimit(req.params.num);
  if (games[0]) res.json(games);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/desc/:num", checkNum, async (req, res) => {
  const games = await getGamesLimDesc(req.params.num);
  if (games[0]) res.json(games);
  else res.status(500).json({ err: "pg error" });
});

router.get("/search", checkSearch, async (req, res, next) => {
  if (req.query.name) {
    const games = await getGamesBySubstring(req.query.name.trim());
    if (games[0]) res.json(games);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

module.exports = router;
