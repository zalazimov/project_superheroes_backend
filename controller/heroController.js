const express = require("express");
const router = express.Router();
const {
  getHeroes,
  getHeroesLimit,
  getHeroesLimDesc,
  getHeroesBySubstring,
  getHeroesByName,
  getHeroById,
  addHero,
  deleteHero,
  updateHeroRow,
} = require("../queries/heroes");

const {
  checkSearch,
  checkNum,
  checkId,
  checkPost,
  checkBoolean,
  checkPut,
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

router.post("/", checkPost, checkBoolean, async (req, res) => {
  const newHero = await addHero(req.body);
  if (newHero[0]) res.status(201).json(newHero[0]);
  else res.status(500).json({ err: "pg error" });
});

router.delete("/:id", checkId, async (req, res) => {
  const id = req.params.id;
  const status = await deleteHero(id);
  if (status[0]) res.json(status[0]);
  else res.redirect("/notfound");
});

router.put("/:id", checkId, checkPut, checkBoolean, async (req, res) => {
  try {
    const updateHero = await updateHeroRow(req.body, req.params.id);
    if (updateHero.length === 0) {
      res.status(404).json("This hero was not found");
    } else {
      res.status(200).json(updateHero[0]);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
