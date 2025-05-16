const getCollection = require("../config/db.js");

// Which hobby or hobbies are the most popular?
const getMostPopular = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$hobbies" },
        { $group: { _id: "$hobbies", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $group: {
            _id: null,
            maxCount: { $first: "$count" },
            hobbies: { $push: { name: "$_id", count: "$count" } }
          }
        },
        { $project: {
            _id: 0,
            mostPopularHobbies: {
              $filter: {
                input: "$hobbies",
                as: "hobby",
                cond: { $eq: ["$$hobby.count", "$maxCount"] }
              }
            }
          }
        }
      ]).toArray();

    res.json(result);
};

module.exports = getMostPopular;
