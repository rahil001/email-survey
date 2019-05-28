const mongoose = require('mongoose');
const requireCredit = require('../middlewares/requireCredit');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/SurveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = function (app) {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for Voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
        const {
            title, body, recipients, subject
        } = req.body;
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
            res.redirect('/');

        } catch (err) {
            res.status(422).send(err);
        }

    });
}