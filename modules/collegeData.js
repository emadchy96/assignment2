const fs = require('fs');
const path = require('path');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8', (err, studentData) => {
            if (err) {
                return reject("unable to read students.json");
            }

            let students;
            try {
                students = JSON.parse(studentData);
            } catch (e) {
                return reject("unable to parse students.json");
            }

            fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8', (err, courseData) => {
                if (err) {
                    return reject("unable to read courses.json");
                }

                let courses;
                try {
                    courses = JSON.parse(courseData);
                } catch (e) {
                    return reject("unable to parse courses.json");
                }

                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned");
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection.students.filter(student => student.TA);
        if (TAs.length > 0) {
            resolve(TAs);
        } else {
            reject("no results returned");
        }
    });
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned");
        }
    });
}

module.exports = { initialize, getAllStudents, getTAs, getCourses };




