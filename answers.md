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
      avg_grade: { $avg: "$courses.grade" }
    }
  },
  { $sort: { avg_grade: -1 } },
  { $limit: 1 }
])
```

**Answer**

```bash
[ { _id: ObjectId('68108245be3ee6fc5dd87942'), avg_grade: 10 } ]
```

```bash
{ _id: ObjectId('68108245be3ee6fc5dd87942'), first_name: 'Clio' }
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

```

**Answer**

```bash

```
## 9. Add "hobbyist" field based on hobby count

**Query**
```bash

```

**Answer**

```bash

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
