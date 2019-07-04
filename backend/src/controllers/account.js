const admin = require('firebase-admin');
const db = admin.firestore();

const actionCodeSettings = {
    url: 'http://localhost:3000/',
};

module.exports.signUp = async (request, response) => {
    try {
        await admin.auth().createUser({
            email: request.body.email,
            password: request.body.password,
            displayName: request.body.name,
            emailVerified: false
        });
        response.send({success: 'User is registered'})
    } catch (e) {
        response.status(422).send({error: e.message})
    }
};

module.exports.get = async (request, response) => {
    console.log(123);
    try {
        const link = await admin.auth().generateEmailVerificationLink("swatikman@gmail.com", actionCodeSettings);
        console.log(link);
    } catch (e) {
        console.log(e);
    }
    response.send('123');
};

module.exports.update = async (request, response) => {

};


