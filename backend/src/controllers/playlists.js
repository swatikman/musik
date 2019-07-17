const uuidv4 = require('uuid/v4');
const {populate} = require("../utils/firestore-utils");
const admin = require('firebase-admin');
const firestore = admin.firestore;
const { FieldPath, FieldValue } = firestore;
const documentId = FieldPath.documentId();
const playlists = firestore().collection('playlists');
const songs = firestore().collection('songs');

module.exports.get = async (request, response) => {
    let query = {};
    if (request.query.type === 'my') {
        query = {userId: request.uid};
    } else if (request.query.type === 'shared') {
        query = {sharedWith: request.uid};
    }
    const snapshot = await getPlaylistsSnapshot(query);

    const sendBack = await populate(snapshot, ['songs']);
    response.send(sendBack);
};

module.exports.getOne = async (request, response) => {
    const playlist = await getPlaylist(request.params.id, request.uid);
    const sendBack = await populate([playlist], ['songs']);

    if (playlist) {
        response.send(sendBack[0]);
    } else {
        response.status(404).send({error: 'Playlist not found'});
    }
};

module.exports.create = async (request, response) => {
    console.log(request.body)
    await playlists.add({
        ...request.body,
        owner: request.uid,
        sharedLink: '',
        songs: []
    });
    response.send({success: 'Playlist created'})
};

module.exports.update = async (request, response) => {
    const {params: {id}, body, uid: userId} = request;
    const playlist = await getFirstItemSnapshot({playlistId: id, userId});
    await playlist.ref.update({...body});

    const newPlaylist = await getFirstItemSnapshot({playlistId: id, userId});
    const sendBack = await populate([newPlaylist], ['songs']);
    response.send(sendBack[0]);
};

module.exports.delete = async (request, response) => {
    const snapshot = await getPlaylistsSnapshot({playlistId: request.params.id, userId: request.uid});

    if (snapshot) {
        snapshot.forEach(async playlist => await playlist.ref.delete());
        response.send({success: 'Playlist deleted'});
    } else {
        response.status(404).send({error: 'Playlist not found'});
    }
};

module.exports.createSharedLink = async (request, response) => {
    const sharedLink = uuidv4();

    await playlists.doc(request.params.id).update({
        sharedLink
    });

    response.send({sharedLink})
};

module.exports.getSharedLink = async (request, response) => {
    const playlist = await playlists.doc(request.params.id).get();
    const sharedLink = playlist.data().sharedLink;
    if (sharedLink) {
        response.send({sharedLink})
    } else {
        response.status(404).send({error: 'Link not found'})
    }
};

module.exports.toggleSong = async (request, response) => {
    const {params: {playlistId, songId}, uid: userId} = request;
    const playlist = await getFirstItemSnapshot({playlistId, userId});

    const isSongInPlaylist = playlist.data().songs.some(refs => refs.id === songId);

    const song = await songs.doc(songId).get();
    if (!song.data()) {
        return response.status(422).send({error: 'There is no such song'})
    }

    if (!isSongInPlaylist) {
        await playlist.ref.update({songs: FieldValue.arrayUnion(song.ref)});
    } else {
        await playlist.ref.update({songs: FieldValue.arrayRemove(song.ref)});
    }

    const newPlaylist = await getFirstItemSnapshot({playlistId, userId});
    const sendBack = await populate([newPlaylist], ['songs']);
    response.send(sendBack[0])
};

const getFirstItemSnapshot = async (args) => {
    const snapshot = await getPlaylistsSnapshot(args);
    let returnItem = undefined;
    snapshot.forEach(item => {
        if (!returnItem) {
            returnItem = item;
        }
    });
    return returnItem;
};

const getPlaylistsSnapshot = ({playlistId, userId, sharedWithAll, sharedWith}) => {
    let query = playlists;
    if (playlistId) {
        query = query.where(documentId, '==', playlistId)
    }
    if (userId) {
        query = query.where('owner', '==', userId);
    }
    if (sharedWithAll) {
        query = query.where('sharedWithAll', '==', true);
    }
    if (sharedWith) {
        query = query.where('sharedWith', '==', sharedWith);
    }
    return query.get();
};

const getPlaylist = async (playlistId, userId) => {
    const snapshot = await getFirstItemSnapshot({playlistId});

    const data = snapshot.data();
    if (data.sharedWithAll
        || data.owner === userId
        || data.sharedWith.find(sharedUserId => sharedUserId === userId)) {
        return snapshot;
    }
};


