const admin = require('firebase-admin');
const db = admin.firestore();

const actionCodeSettings = {
    url: 'http://localhost:3000/',
};

module.exports.signUp = async (request, response) => {
    const user = await admin.auth().createUser({
        email: request.body.email,
        password: request.body.password,
        displayName: request.body.name,
        emailVerified: false
    });
    await db.collection('users').doc(user.uid).set({
        displayName: user.displayName || '',
    });
    response.send({success: 'User is registered'})
};

module.exports.get = async (request, response) => {
    try {
        const link = await admin.auth().generateEmailVerificationLink("swatikman@gmail.com", actionCodeSettings);
        console.log(link);
    } catch (e) {
        console.log(e);
    }
    response.send('123');
};

module.exports.update = async (request, response) => {
    const user = await admin.auth().getUser(uid);

    await db.collection('users').doc(user.uid).set({
        displayName: user.displayName || '',
    });
    response.send({success: 'User is registered'})
};


