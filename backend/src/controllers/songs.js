const uuidv4 = require('uuid/v4');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();
const firestore = admin.firestore;
const songs = firestore().collection('songs');

module.exports.get = async (request, response) => {
    let snapshot = [];
    if (request.query.type === 'my') {
        if (request.uid) {
            snapshot = await songs.where('uploadBy', '==', request.uid).get();
        }
    } else {
        snapshot = await songs.get();
    }
    const sendBack = [];
    snapshot.forEach((doc) => sendBack.push({id: doc.id, ...doc.data()}));
    response.send(sendBack);
};

module.exports.getOne = async (request, response) => {
    const song = await songs.doc(request.params.id).get();
    response.send({id: song.id, ...song.data()});
};

module.exports.create = async (request, response) => {
    const songId = uuidv4();
    const path = `/${request.uid}/${songId}`;

    await bucket.upload(request.files.file.tempFilePath, {destination: `${path}`});

    await songs.doc(songId).set({
        ...request.body,
        uploadBy: request.uid,
        filePath: path
    });
    response.send({success: 'Song successfully uploaded'})
};

module.exports.update = async (request, response) => {
    await songs.doc(request.params.id).update({...request.body});
    response.send({success: 'Song information updated'});
};

module.exports.delete = async (request, response) => {
    const ref = await songs
            .where(firestore.FieldPath.documentId(), '==', request.params.id)
            .where('uploadBy', '==', request.uid)
            .get();

    if (ref.size) {
        ref.forEach(async song => await song.ref.delete());
        response.send({success: 'Song deleted'});
    } else {
        response.status(404).send({error: 'Song not found'});
    }
};
