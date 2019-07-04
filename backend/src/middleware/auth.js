const admin = require('firebase-admin');

module.exports = async (request, response, next) => {
    const token = request.header('token');
    if (!token) {
        return response.status(401).send({ error: 'Access denied! No token provided.' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        request.uid = decodedToken.uid;
        next()
    } catch (e) {
        return response.status(422).send({error: 'Invalid token.'});
    }
};