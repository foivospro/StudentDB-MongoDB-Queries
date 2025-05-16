# Query Execution Documentation

## Overview

The queries are documented in [`queries.md`](queries.md), but are also available through REST endpoints. These endpoints provide programmatic access to the same data analysis functionality.

## Available Endpoints

The following REST endpoints are available for use:

### Students
----
- `GET students/active-count` - Returns the count of the users taking at least a class (i.e. have an "In Progress" class)
- `GET students/count-by-city` - Returns the count of users organized by city
- `GET students/highest-gpa` - Returns the highest scored GPA (along with the respective student)
- `GET students/most-tens` - Returns the student with the most 10s (along with the number of 10s achieved)
- `GET students/transformed-hobbyists` - Returns all the students, transformed to include a "hobbyist" boolean field
- `GET students/transformed-num-courses` - Returns all the students transformed to include a "completedCourses" count field
- `GET students/transformed-gpa-inprogress-dropped` - Returns all the students transformed to include "classesInProgress" & "droppedClasses" count fields, as well as a "GPA" field

* **Warning**: Be aware that the transformation endpoints should be used with caution as they return **the whole dataset** upon their execution.

### Courses
----
- `GET courses/highest-average-gpa` - Returns the course with the highest average GPA
- `GET courses/most-dropped` - Returns the course that is dropped the most
- `GET courses/completed-count-by-type` - Returns the counts of completed courses by class type

### Hobbies
----
- `GET hobbies/most-popular` - Returns the most popular hobbies (sorted by number of appearances)


All endpoints return the same json format visible in [queries.md](queries.md) so consult that file for execution examples.

## Usage

Provide Mongodb configurations (connection uri, database & collection name) in [`src/api/config/db.js`](src/api/config/db.js) (or parse them through a .env file) and a valid port in [`src/api/app.js`](src/api/app.js).

```bash
npm install # install the dependencies

npm start # start the service
```

And issue a GET request to the abovementioned endpoints.