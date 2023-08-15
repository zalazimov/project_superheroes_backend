const checkSearch = (req, res, next) => {
  if (!req.query.name || req.query.name.length < 2) {
    res.status(400).json({ error: "Please enter a valid superhero name" });
  } else next();
};

const checkNum = (req, res, next) => {
  if (Number.isNaN(+req.params.num)) {
    res.status(400).json({ error: "limit value must be a number" });
  } else next();
};

const validateURL = (req, res, next) => {
  if (
    req.body.url.substring(0, 7) === "http://" ||
    req.body.url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .json({ error: `You forgot to start your url with http:// or https://` });
  }
};

const checkId = (req, res, next) => {
  if (Number.isNaN(+req.params.id)) {
    res.status(400).json({ error: "id must be a number" });
  } else next();
};

const checkBoolean = (req, res, next) => {
  if (typeof req.body.is_favorite !== "boolean") {
    res.status(400).json({ error: "is_favorite must be a boolean" });
  } else {
    next();
  }
};

const checkPost = (req, res, next) => {
  let count = 0;
  let arr = Object.keys(req.body);
  if ((arr.length && arr.length < 5) || arr.length == 0) {
    res.status(400).json({ err: "make new post body" });
  } else {
    ["name", "history_text", "superpowers", "creator", "is_favorite"].forEach(
      (item) => {
        if (item in req.body) count++;
      }
    );
    if (count < 5) {
      res.status(400).json({ err: "make new post body" });
    } else {
      next();
    }
  }
};

const checkPut = (req, res, next) => {
  let arr = Object.keys(req.body);

  if (arr.length == 0) {
    res.status(400).json({ err: "make new update body" });
  } else {
    for (let n of arr) {
      if (
        ![
          "name",
          "real_name",
          "history_text",
          "powers_text",
          "intelligence_score",
          "speed_score",
          "power_score",
          "combat_score",
          "superpowers",
          "aliases",
          "place_of_birth",
          "first_appearance",
          "creator",
          "occupation",
          "relatives",
          "gender",
          "type_race",
          "height",
          "weight",
          "img",
          "is_favorite",
          "rating",
        ].includes(n)
      ) {
        res.status(400).json({ err: "make new update body" });
      }
    }
    next();
  }
};

module.exports = {
  checkSearch,
  checkNum,
  validateURL,
  checkId,
  checkPost,
  checkBoolean,
  checkPut,
};
