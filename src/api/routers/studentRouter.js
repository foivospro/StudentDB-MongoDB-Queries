const router = require("express").Router();

const {
    getActiveCount,
    getCountByCity,
    getHighestGPAGrade,
    getMost10,
    getTransformedHobbyists,
    getTransformedNumCourses,
    getTransformedGPAInProgressDropped
} = require("../controllers/studentController");

router.get("/active-count", getActiveCount);
router.get("/count-by-city", getCountByCity);
router.get("/highest-gpa", getHighestGPAGrade);
router.get("/most-tens", getMost10);
router.get("/transformed-hobbyists", getTransformedHobbyists);
router.get("/transformed-num-courses", getTransformedNumCourses);
router.get("/transformed-gpa-inprogress-dropped", getTransformedGPAInProgressDropped);

module.exports = router;
