const router = require("express").Router();

const getMostPopular = require("../controllers/hobbyController");

router.get("/most-popular", getMostPopular);

module.exports = router;
