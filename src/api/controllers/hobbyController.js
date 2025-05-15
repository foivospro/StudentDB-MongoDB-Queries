const getCollection = require("../config/db.js");

// Which hobby or hobbies are the most popular?
const getMostPopular = async (req, res) => {
    let collection = await getCollection();

    let result = await collection.aggregate([
        { $unwind: "$hobbies" },
        { $group: { _id: "$hobbies", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]).toArray();

    res.json(result);
};

module.exports = getMostPopular;
