const getCollection = require("../config/db");

// How many students in your database are currently taking at least a class (i.e. have a class with a course_status of “In Progress”)?
const getActiveCount = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.find({"courses.course_status": "In Progress"}).count();

    res.json({"count": result});
};

// Produce a grouping of the documents that contains the name of each home city and the number of students enrolled from that home city.
const getCountByCity = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $group: { _id: "$home_city", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]).toArray();

    res.json(result);
};

// What is the GPA (ignoring dropped classes and in progress classes) of the best student?
const getHighestGPAGrade = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$courses" },
        { $match: { "courses.course_status": "Complete" } },
        { $group: {
            _id: "$_id",
            first_name: { $first: "$first_name" },
            home_city: { $first: "$home_city" },
            avg_grade: { $avg: "$courses.grade" }
            }
        },
        { $sort: { avg_grade: -1 } },
        { $limit: 1 }
    ]).toArray();

    res.json(result);
};

// Which student has the largest number of grade 10’s?
const getMost10 = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$courses" },
        { $match: { "courses.grade": 10 } },
        { $group: {
            _id: "$_id",
            first_name: { $first: "$first_name" },
            count_tens: { $sum: 1 }
        }},
        { $sort: { count_tens: -1 } },
        { $limit: 1 }
    ]).toArray();

    res.json(result);
};

// Produce a transformation of the documents so that the documents now have an additional boolean field called “hobbyist” that is true when the student has more than 3 hobbies and false otherwise.
const getTransformedHobbyists = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([{
        $addFields: {
            hobbyist: {
            $cond: [{$gte: [{$size: "$hobbies"}, 3]}, true, false]
            }
        }
    }]).toArray();

    res.json(result);
};

// Produce a transformation of the documents so that the documents now have an additional field that contains the number of classes that the student has completed
const getTransformedNumCourses = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        {
            $addFields: {
            completedCourses: {
                $size: {
                $filter: {
                    input: "$courses",
                    as: "course",
                    cond: {$eq: ["$$course.course_status", "Complete"]}
                }
                }
            }
            }
        }
    ]).toArray();

    res.json(result);
};

// Produce a transformation of the documents in the collection so that they look like this:
// {
// "_id" :
// ObjectId("558d08925e083d8cdd7be831"),
// "first_name" : "Eirini",
// “GPA” : 8.5
// “classesInProgress” : 3
// “droppedClasses” : 0
// }
const getTransformedGPAInProgressDropped = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([{
        $project: {
            first_name: 1,
            classesInProgress: {
            $size: {
                $filter: {
                input:"$courses",
                as: "course",
                cond: {$eq: ["$$course.course_status", "In Progress"]}
                }
            }
            },
            droppedClasses: {
            $size: {
                $filter: {
                input: "$courses",
                as: "course",
                cond: {$eq: ["$$course.course_status", "Dropped"]}
                }
            }
            },
            GPA: {
            $avg: {
                $map: {
                input: {
                    $filter: {
                    input: "$courses",
                    as: "course",
                    cond: {$eq: ["$$course.course_status", "Complete"]}
                    }
                },
                as: "course",
                in: "$$course.grade"
                }
            }
            }
        }
    }]).toArray();

    res.json(result);
};

module.exports = {
    getActiveCount,
    getCountByCity,
    getHighestGPAGrade,
    getMost10,
    getTransformedHobbyists,
    getTransformedNumCourses,
    getTransformedGPAInProgressDropped
};
