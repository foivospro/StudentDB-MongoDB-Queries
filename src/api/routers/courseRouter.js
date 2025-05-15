const router = require("express").Router();

const {
    getHighestAverageGPA,
    getMostDropped,
    getCompletedCountByType
} = require("../controllers/courseController");

router.get("/highest-average-gpa", getHighestAverageGPA);
router.get("/most-dropped", getMostDropped);
router.get("/completed-count-by-type", getCompletedCountByType);

module.exports = router;
