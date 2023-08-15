const express = require("express");
const router = express.Router();
const {
  getHeroes,
  getHeroesLimit,
  getHeroesLimDesc,
  getHeroesBySubstring,
  getHeroesByName,
  getHeroById,
} = require("../queries/heroes");

const {
  checkSearch,
  checkNum,
  validateURL,
  checkId,
} = require("../validations/checkValidations");

router.get("/", async (req, res) => {
  const heroes = await getHeroes();
  if (heroes[0]) res.json(heroes);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/:num", checkNum, async (req, res) => {
  const heroes = await getHeroesLimit(req.params.num);
  if (heroes[0]) res.json(heroes);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/desc/:num", checkNum, async (req, res) => {
  const heroes = await getHeroesLimDesc(req.params.num);
  if (heroes[0]) res.json(heroes);
  else res.status(500).json({ err: "pg error" });
});

router.get("/search", checkSearch, async (req, res, next) => {
  if (req.query.name) {
    const heroes = await getHeroesBySubstring(req.query.name.trim());
    if (heroes[0]) res.json(heroes);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/", async (req, res, next) => {
  if (req.query.name) {
    const heroes = await getHeroesByName(req.query.name.trim());
    if (heroes[0]) res.json(heroes);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/:id", checkId, async (req, res) => {
  const heroes = await getHeroById(req.params.id);
  if (heroes[0]) {
    res.json({
      ...heroes[0],
      ["superpowers"]: JSON.parse(heroes[0].superpowers.replace(/'/g, '"')),
    });
  } else {
    res.status(500).json({ err: "pg error" });
  }
});

module.exports = router;
