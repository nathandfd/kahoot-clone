const {decode} = require('html-entities');

module.exports = {
    getQuizzes: (req, res) => {
        let { id } = req.session.user;
        const db = req.app.get('db');

        db.query(`SELECT * FROM quizes WHERE user_id = ${id};`,(err,results)=>{
            if (!err){
                let newResult = results.map((result)=>{
                    return {
                        id: result.id,
                        user_id: result.user_id,
                        quiz_name: decode(result.quiz_name),
                        info: decode(result.info),
                    }
                })
                res.status(200).send(newResult)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    newQuiz: (req, res) => {
        let { id } = req.session.user;
        let { name, info } = req.body;
        const db = req.app.get('db');

        db.query(`INSERT INTO quizes (user_id, quiz_name, info) VALUES (${id}, '${name}', '${info}');`,(err,results)=>{
            if (!err){
                db.query(`select * from quizes where quiz_name = '${name}'`,(error,results2)=>{
                    if (!error){
                        res.status(200).send(results2)
                    }
                    else{
                        res.status(500).send(err)
                    }
                })
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    getQuestions: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');

        db.query(`SELECT * FROM questions WHERE quiz_id = ${id};`,(err,results)=>{
            if (!err){
                let newResult = results.map((result)=>{
                    return {
                        id: result.id,
                        quiz_id: result.quiz_id,
                        correctAnswer: result.correctAnswer,
                        questionTime: result.questionTime,
                        question: decode(result.question),
                        answer1: decode(result.answer1),
                        answer2: decode(result.answer2),
                        answer3: decode(result.answer3),
                        answer4: decode(result.answer4),
                    }
                })
                res.status(200).send(newResult)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    deleteQuiz: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');

        db.query(`DELETE FROM quizes WHERE id = ${id};`,(err,results)=>{
            if (!err){
                res.status(200).send(results)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    addQuestion: (req, res) => {
        let { id, question, answer1, answer2, answer3, answer4, correctAnswer, questionTime} = req.body;
        const db = req.app.get('db');
        db.query(`INSERT INTO questions
                      (quiz_id, question, answer1, answer2, answer3, answer4, correctAnswer, questionTime)
                  VALUES
                      (${id}, '${question}', '${answer1}', '${answer2}', '${answer3}', '${answer4}', ${correctAnswer}, ${questionTime});`,(err,results)=>{
            if (!err){
                res.status(200).send(results)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    deleteQuestion: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.query(`DELETE FROM questions WHERE id = ${id};`,(err,results)=>{
            if (!err){
                res.status(200).send()
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    getQuestion: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.query(`SELECT * FROM questions WHERE id = ${id}`,(err,results)=>{
            if (!err){
                let newResult = results.map((result)=>{
                    return {
                        id: result.id,
                        quiz_id: result.quiz_id,
                        correctAnswer: result.correctAnswer,
                        questionTime: result.questionTime,
                        question: decode(result.question),
                        answer1: decode(result.answer1),
                        answer2: decode(result.answer2),
                        answer3: decode(result.answer3),
                        answer4: decode(result.answer4),
                    }
                })
                res.status(200).send(newResult)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    updateQuestion: (req, res) => {
        let { id, question, answer1, answer2, answer3, answer4, correctAnswer, questionTime } = req.body;
        const db = req.app.get('db');
        db.query(`update questions
            set question = '${question}', answer1 = '${answer1}', answer2 = '${answer2}', answer3 = '${answer3}', answer4 = '${answer4}', correctAnswer = ${correctAnswer}, questionTime = ${questionTime}
            where id = ${id}`,(err,results)=>{
            if (!err){
                res.status(200).send(results)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    updateQuiz: (req, res) => {
        let { id, newName, newInfo } = req.body;
        const db = req.app.get('db');
        db.query(`update quizes
                  set quiz_name = '${newName}', info = '${newInfo}'
                  where id = ${id}
        `,(err,results)=>{
            if (!err){
                res.status(200).send(results)
            }
            else{
                res.status(500).send(err)
            }
        })
    },
    getQuiz: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.query(`select * from quizes
                  where id = ${id}`,(err,results)=>{
            if (!err){
                let newResult = results.map((result)=>{
                    return {
                        id: result.id,
                        user_id: result.user_id,
                        quiz_name: decode(result.quiz_name),
                        info: decode(result.info),
                    }
                })
                res.status(200).send(newResult)
            }
            else{
                res.status(500).send(err)
            }
        })
    }
}