CREATE TABLE questions (
    id SERIAL PRIMARY KEY, 
    quiz_id INTEGER,
    question VARCHAR(512),
    answer1 VARCHAR(128),
    answer2 VARCHAR(128),
    answer3 VARCHAR(128),
    answer4 VARCHAR(128),
    correctAnswer INTEGER,
    questionTime INTEGER
);

/*Sample Data*/
INSERT INTO questions
(quiz_id, question, answer1, answer2, answer3, answer4, correctAnswer, questionTime)
VALUES
(1, 'who am I?', 'god', 'grabbo-guy', '?', 'dill', 4,20),
(1, 'can dogs look up?', 'yes', 'no', 'in Australia', '?', 3, 20),
(2, 'where in the world is Carmen SanDiego?', 'here', 'there', 'Witness Protection', '...', 4,20)
