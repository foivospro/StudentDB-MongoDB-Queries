const getCollection = require("../config/db");

// Which class has the highest average GPA?
const getHighestAverageGPA = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$courses" },
        { $match: { "courses.course_status": "Complete" } },
        { $group: {
            _id: {
                code: "$courses.course_code",
                title: "$courses.course_title"
            },
            avg_grade: { $avg: "$courses.grade" }
            }
        },
        { $sort: { avg_grade: -1 } },
        { $limit: 1 }
    ]).toArray();

    res.json(result);
};

// Which class has been dropped the most number of times?
const getMostDropped = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$courses" },
        { $match: { "courses.course_status": "Dropped" } },
        { $group: {
            _id: {
                code: "$courses.course_code",
                title: "$courses.course_title"
            },
            drop_count: { $sum: 1 }
            }
        },
        { $sort: { drop_count: -1 } },
        { $limit: 1 }
    ]).toArray();

    res.json(result);
};

// Produce of a count of classes that have been COMPLETED by class type. The class type is found by taking the first letter of the course code so that M102 has type M. So I basically want how many courses have been completed in type M, how many of type S, how many of type P etc… (HINT: check out the $substr function here: http://docs.mongodb.org/manual/reference/operator/aggregation/substr/)
const getCompletedCountByType = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$courses" },
        { $match: {"courses.course_status": "Complete"} },
        { $group: { _id: { $substr: ["$courses.course_code", 0, 1] }, count: { $sum: 1 } } }
    ]).toArray();

    res.json(result);
};

module.exports = {getHighestAverageGPA, getMostDropped, getCompletedCountByType};
