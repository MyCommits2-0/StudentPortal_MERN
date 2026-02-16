-- Database: sunbeam1
CREATE DATABASE IF NOT EXISTS int_courses;
USE int_courses;

-- ---------------------------------------------------------
-- 1. Table Structure for `users`
-- ---------------------------------------------------------
CREATE TABLE users (
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);

-- ---------------------------------------------------------
-- 2. Table Structure for `Course`
-- ---------------------------------------------------------
CREATE TABLE courses(
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    fees INT,
    start_date DATE,
    end_date DATE,
    video_expire_days INT
);

-- ---------------------------------------------------------
-- 3. Table Structure for `student`
-- ---------------------------------------------------------
CREATE TABLE students (
    reg_no INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    course_id INT,
    mobile_no VARCHAR(20),
    profile_pic BLOB,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
    FOREIGN KEY (email) REFERENCES users(email)

);

-- ---------------------------------------------------------
-- 4. Table Structure for `videos`
-- ---------------------------------------------------------
CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(100),
    description VARCHAR(255),
    youtube_url VARCHAR(255),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- ---------------------------------------------------------
-- Data Insertion
-- ---------------------------------------------------------
 mysql> select * from users;
+-------------------+----------+---------+
| email             | password | role    |
+-------------------+----------+---------+
| 123@gmail.com     | 123      | student |
| 124@gmail.com     | 124      | student |
| 125@gmail.com     | 126      | student |
| 129@gmail.com     | 126      | student |
| admin@gmail.com   | admin    | admin   |
| navnath@gmail.com | sunbeam  | student |
+-------------------+----------+---------+


mysql> select * from students;
+--------+----------+-------------------+-----------+------------+--------------------------+
| reg_no | name     | email             | course_id | mobile_no  | profile_pic              |
+--------+----------+-------------------+-----------+------------+--------------------------+
|      1 | Digvijay | 123@gmail.com     |         1 | 1234567891 | NULL                     |
|      2 | Vrushabh | 124@gmail.com     |         2 | 1234567892 | NULL                     |
|      3 | Dikshant | 125@gmail.com     |         3 | 1234567893 | NULL                     |
|      4 | Suresh   | 129@gmail.com     |         3 | 1235467895 | NULL                     |
|     29 | Vrushabh | 124@gmail.com     |         6 | 1234567890 | NULL                     |
|     30 | Navnath  | navnath@gmail.com |         3 |        123 | NULL                     |
|     31 | Navnath  | navnath@gmail.com |         2 |        123 | NULL                     |
+--------+----------+-------------------+-----------+------------+--------------------------+

mysql> select * from courses;
+-----------+-------------------------+---------------------------------------------+------+------------+------------+-------------------+
| course_id | course_name             | description                                 | fees | start_date | end_date   | video_expire_days |
+-----------+-------------------------+---------------------------------------------+------+------------+------------+-------------------+
|         1 | MERN                    | Mangodb, Express.js , react.js,node.js      | 4000 | 2025-12-29 | 2026-01-05 |                30 |
|         2 | Artificial Intellegence | Mega projects using Artificial Intellegence | 4000 | 2025-12-29 | 2026-01-05 |                30 |
|         3 | Android Development     | Android Development                         | 4000 | 2025-12-29 | 2026-01-05 |                30 |
|         4 | Python Programming      | python Programming                          | 4000 | 2025-12-29 | 2026-01-05 |                30 |
|         5 | Java Programming        | Development using Java Programming          | 4000 | 2025-12-29 | 2026-01-05 |                30 |
|         6 | Web Development         | Development using Python Programming        | 4000 | 2025-12-29 | 2026-01-05 |                30 |
|        10 | DEMO UPDATED            | this is updated course                      | 4000 | 2026-01-01 | 2026-02-01 |                30 |
+-----------+-------------------------+---------------------------------------------+------+------------+------------+-------------------+

mysql> select * from videos;
+----------+-----------+----------------------------+---------------------------------------------+---------------------------------------------+------------+
| video_id | course_id | title                      | description                                 | youtube_url                                 | added_at   |
+----------+-----------+----------------------------+---------------------------------------------+---------------------------------------------+------------+
|        1 |         1 | MERN Stack Roadmap         | Complete guide to becoming a MERN developer | https://www.youtube.com/watch?v=Ea9rrRj9e0Y | 2025-12-31 |
|        2 |         1 | React Hooks Tutorial       | Deep dive into useState and useEffect       | https://www.youtube.com/watch?v=lI7IIOWM0Mo | 2025-12-31 |
|        3 |         2 | Intro to Neural Networks   | Understanding how AI models learn           | https://www.youtube.com/watch?v=EYeF2e2IKEo | 2025-12-31 |
|        4 |         2 | Generative AI Basics       | Introduction to LLMs and Prompt Engineering | https://www.youtube.com/watch?v=d4yCWBGFCEs | 2025-12-31 |
|        5 |         3 | Kotlin vs Java for Android | Choosing the right language for mobile      | https://www.youtube.com/watch?v=X3S2Ihh5KBc | 2025-12-31 |
|        6 |         4 | Python Data Structures     | Lists, Dictionaries, and Tuples explained   | https://www.youtube.com/watch?v=pkYVOmU3MgA | 2025-12-31 |
|        7 |         5 | Java Collections Framework | Comprehensive guide to List, Set, and Map   | https://www.youtube.com/watch?v=rzA7UJ-hQn4 | 2025-12-31 |
|        8 |         5 | Multithreading in Java     | How to handle concurrent processes          | https://www.youtube.com/watch?v=YDH7f9dTXAs | 2025-12-31 |
|        9 |         6 | CSS Flexbox & Grid         | Mastering modern web layouts                | http://youtube.com/watch?v=DWk2mndNTHY      | 2025-12-31 |
|       11 |         6 | postman demo testing       | his is testing of video updting             | https://www.youtube.com/watch?v=wyCMCMtOJc0 | 2026-01-01 |
+----------+-----------+----------------------------+---------------------------------------------+---------------------------------------------+------------+

