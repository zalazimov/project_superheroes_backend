const checkSearch = (req, res, next) => {
  if (!req.query.name || req.query.name.length < 2) {
    res.status(400).json({ error: "Please enter a valid board game name" });
  } else next();
};

const checkNum = (req, res, next) => {
  if (Number.isNaN(+req.params.num)) {
    res.status(400).json({ error: "limit value must be a number" });
  } else next();
};

module.exports = {
  checkSearch,
  checkNum,
};
