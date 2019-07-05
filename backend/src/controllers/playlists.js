const admin = require('firebase-admin');
const firestore = admin.firestore;
const playlists = firestore().collection('playlists');

module.exports.get = async (request, response) => {
    let snapshot = [];
    if (request.query.type === 'my') {
        if (request.uid) {
            snapshot = await playlists.where('owner', '==', request.uid).get();
        }
    } else {
        snapshot = await playlists.get();
    }
    const sendBack = [];
    snapshot.forEach((doc) => sendBack.push({id: doc.id, ...doc.data()}));
    response.send(sendBack);
};

module.exports.getOne = async (request, response) => {
    const ref = await playlists
        .where(firestore.FieldPath.documentId(), '==', request.params.id)
        .where('owner', '==', request.uid)
        .get();
    if (ref.size) {
        ref.forEach(playlist => {
            response.send({id: playlist.id, ...playlist.data()});
        });
    } else {
        response.status(404).send({error: 'Playlist not found'})
    }
};

module.exports.create = async (request, response) => {
    await playlists.add({
        ...request.body,
        sharedWith: [],
        owner: request.uid
    });
    response.send({success: 'Playlist created'})
};

module.exports.update = async (request, response) => {
    await playlists.doc(request.params.id).update({...request.body});
    response.send({success: 'Playlist information updated'});
};

module.exports.delete = async (request, response) => {
    const ref = await playlists
        .where(firestore.FieldPath.documentId(), '==', request.params.id)
        .where('uploadBy', '==', request.uid)
        .get();

    if (ref.size) {
        ref.forEach(async playlist => await playlist.ref.delete());
        response.send({success: 'Playlist deleted'});
    } else {
        response.status(404).send({error: 'Playlist not found'});
    }
};
