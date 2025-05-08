# MongoDB Project

## 1. Students currently taking at least one class

**Query**
```bash
db.students.find({"courses.course_status": "In Progress"}).count()
```

**Answer**

```bash
 8805
```

## 2. Grouping by home city with student count

**Query**
```bash
db.students.aggregate([
  { $group: { _id: "$home_city", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

**Answer**

```bash
[
  { _id: 'Agrinio', count: 547 },
  { _id: 'Athina', count: 528 },
  { _id: 'Rethymno', count: 509 },
  { _id: 'Kavala', count: 509 },
  { _id: 'Kalamata', count: 506 },
  { _id: 'Thessaloniki', count: 506 },
  { _id: 'Mytilini', count: 505 },
  { _id: 'Thyra', count: 504 },
  { _id: 'Messolongi', count: 501 },
  { _id: 'Chania', count: 500 },
  { _id: 'Preveza', count: 498 },
  { _id: 'Ioannina', count: 497 },
  { _id: 'Larissa', count: 495 },
  { _id: 'Irakleio', count: 493 },
  { _id: 'Halkida', count: 492 },
  { _id: 'Patra', count: 490 },
  { _id: 'Katerini', count: 488 },
  { _id: 'Arta', count: 487 },
  { _id: 'Florina', count: 474 },
  { _id: 'Pyrgos', count: 471 }
]
```
## 3. Most popular hobby or hobbies

**Query**
```bash
db.students.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: "$hobbies", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

**Answer**

```bash
[
  { _id: 'watercolour painting', count: 1321 },
  { _id: 'piano', count: 1293 },
  { _id: 'gardening', count: 1274 },
  { _id: 'skydiving', count: 1273 },
  { _id: 'guitar', count: 1269 },
  { _id: 'ventriloquism', count: 1264 },
  { _id: 'poetry', count: 1261 },
  { _id: 'coin collecting', count: 1258 },
  { _id: 'snooker', count: 1254 },
  { _id: 'cinema', count: 1254 },
  { _id: 'archaeology', count: 1251 },
  { _id: 'model cars', count: 1248 },
  { _id: 'World of Warcraft', count: 1244 },
  { _id: 'swimming', count: 1235 },
  { _id: 'paintball', count: 1234 },
  { _id: 'hiking', count: 1233 },
  { _id: 'skiing', count: 1223 },
  { _id: 'philately', count: 1215 },
  { _id: 'AD&D', count: 1195 },
  { _id: 'board games', count: 1163 }
]
```
##  4. GPA of the best student

**Query**

```bash
db.students.aggregate([
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
])
```

**Answer with limit 1**

```bash
[
  {
    _id: ObjectId('68108241be3ee6fc5dd86f40'),
    first_name: 'Nikos',
    home_city: 'Katerini',
    avg_grade: 10
  }
]
```

**Answer without limit**

```bash
[
  {
    _id: ObjectId('68108241be3ee6fc5dd86f40'),
    first_name: 'Nikos',
    home_city: 'Katerini',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108244be3ee6fc5dd8770d'),
    first_name: 'Thanos',
    home_city: 'Agrinio',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108247be3ee6fc5dd87d9b'),
    first_name: 'Giannis',
    home_city: 'Kalamata',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108243be3ee6fc5dd8735f'),
    first_name: 'Eleni',
    home_city: 'Halkida',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108244be3ee6fc5dd87566'),
    first_name: 'Kostas',
    home_city: 'Arta',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108244be3ee6fc5dd87701'),
    first_name: 'Maria',
    home_city: 'Preveza',
    avg_grade: 10
  },
  {
    _id: ObjectId('6810823fbe3ee6fc5dd8687b'),
    first_name: 'Alexandra',
    home_city: 'Mytilini',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108245be3ee6fc5dd878db'),
    first_name: 'Nikos',
    home_city: 'Chania',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108244be3ee6fc5dd87473'),
    first_name: 'Giorgos',
    home_city: 'Larissa',
    avg_grade: 10
  },
  {
    _id: ObjectId('6810823ebe3ee6fc5dd8644e'),
    first_name: 'Danae',
    home_city: 'Mytilini',
    avg_grade: 10
  },
  {
    _id: ObjectId('6810824abe3ee6fc5dd88678'),
    first_name: 'Thanos',
    home_city: 'Agrinio',
    avg_grade: 10
  },
  {
    _id: ObjectId('6810823dbe3ee6fc5dd86316'),
    first_name: 'Georgia',
    home_city: 'Kalamata',
    avg_grade: 10
  },
  {
    _id: ObjectId('6810823ebe3ee6fc5dd865ce'),
    first_name: 'Danae',
    home_city: 'Arta',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108247be3ee6fc5dd87d89'),
    first_name: 'Georgia',
    home_city: 'Athina',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108244be3ee6fc5dd875ec'),
    first_name: 'Sokratis',
    home_city: 'Patra',
    avg_grade: 10
  },
  {
    _id: ObjectId('6810823dbe3ee6fc5dd861fa'),
    first_name: 'Anna',
    home_city: 'Chania',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108249be3ee6fc5dd884e0'),
    first_name: 'Anna',
    home_city: 'Mytilini',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108243be3ee6fc5dd8738d'),
    first_name: 'Iris',
    home_city: 'Preveza',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108246be3ee6fc5dd87cda'),
    first_name: 'Vangelis',
    home_city: 'Thyra',
    avg_grade: 10
  },
  {
    _id: ObjectId('68108246be3ee6fc5dd87b7d'),
    first_name: 'Vangelis',
    home_city: 'Athina',
    avg_grade: 10
  }
]
```

## 5. Student with largest number of grade 10's


**Query**
```bash
db.students.aggregate([
  { $unwind: "$courses" },
  { $match: { "courses.grade": 10 } },
  { $group: {
      _id: "$first_name",
      count_tens: { $sum: 1 }
    }
  },
  { $sort: { count_tens: -1 } },
  { $limit: 1 }
])
```

**Answer**

```bash
[ { _id: 'Kostas', count_tens: 304 } ]
```


##  6. Class with highest average GPA


**Query**
```bash
db.students.aggregate([
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
])
```

**Answer**

```bash

[
  {
    _id: { code: 'S202', title: 'Graph Theory' },
    avg_grade: 7.7853159851301115
  }
]
```

## 7. Most dropped class

**Query**
```bash
db.students.aggregate([
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
])
```

**Answer**

```bash
[
  {
    _id: { code: 'P101', title: 'Object Oriented Programming in Java' },
    drop_count: 259
  }
]
```

## 8. Count of completed classes by class type

**Query**
```bash

db.students.aggregate([

	{ $unwind: "$courses" }, # flatten the courses outside the arrays

	{ $match: {"courses.course_status": "Complete"} }, # filter by complete status

    # group by course type (first letter of course_code) and count the occurancies
	{ $group: { _id: { $substr: ["$courses.course_code", 0, 1] }, count: { $sum: 1 } } }

])
```

**Answer**

```bash
[
  { _id: 'M', count: 4590 },
  { _id: 'D', count: 3405 },
  { _id: 'P', count: 6774 },
  { _id: 'S', count: 4426 },
  { _id: 'V', count: 2138 },
  { _id: 'B', count: 1100 }
]
```
## 9. Add "hobbyist" field based on hobby count

### 1. Add field only on result, without modifying the saved documents

**Query**
```bash
db.students.aggregate([{$addFields: {hobbyist: {$cond: [{$gte: [{$size: "$hobbies"}, 3]}, true, false] }}}])
```

**Answer (Random Document)**

```bash
[
  {
    _id: ObjectId('681c8beaa5a01c0ade6c72e0'),
    home_city: 'Larissa',
    first_name: 'Eleni',
    hobbies: [ 'piano', 'hiking', 'board games' ],
    favourite_os: 'linux',
    laptop_cost: 1480,
    courses: [
      {
        course_code: 'S101',
        course_title: 'Fundamentals of Probability',
        course_status: 'In Progress'
      },
      {
        course_code: 'M201',
        course_title: 'Natural Language Porcessing',
        course_status: 'In Progress'
      },
      {
        course_code: 'M102',
        course_title: 'Data Mining',
        course_status: 'In Progress'
      }
    ],
    hobbyist: true
  },
  # rest of the documents...
]
```

### 2. Modify the documents on disc

**Query**
```bash
db.students.updateMany({}, [{$set: {hobbyist: {$cond: [{$gte: [{$size: "$hobbies"}, 3]}, true, false]}}}])
```

**Answer**

```bash
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 10000,
  modifiedCount: 10000,
  upsertedCount: 0
}
```
## 10. Add field with number of completed classes

**Query**
```bash

```

**Answer**

```bash

```
##  11. Transform documents to include GPA and class counts
**Query**
```bash

```

**Answer**

```bash

```
