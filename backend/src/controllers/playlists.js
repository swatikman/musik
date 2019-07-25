const uuidv4 = require('uuid/v4');
const {populate} = require("../utils/firestore-utils");
const admin = require('firebase-admin');
const firestore = admin.firestore;
const { FieldPath, FieldValue } = firestore;
const documentId = FieldPath.documentId();
const playlists = firestore().collection('playlists');
const songs = firestore().collection('songs');

module.exports.get = async (request, response) => {
    const {type, q} = request.query;
    let query = {};
    if (type === 'my') {
        query = {userId: request.uid};
    } else if (type === 'popular') {
        query = {sharedWithAll: 'true'};
    } else if (q) {
        query = {name: q}
    } else {
        query = {sharedWithAll: 'true'};
    }
    const snapshot = await getPlaylistsSnapshot(query);
    
    const sendBack = await populate(snapshot, ['songs', 'owner']);

    response.send(sendBack);
};

module.exports.getOne = async (request, response) => {
    const {params: {id}, uid: userId} = request;

    const playlist = await getAccessiblePlaylist(id, userId);

    if (playlist) {
        return response.send(playlist);
    } else {
        const playlists = await getAndPopulate({sharedLink: id});
        if (playlists) {
            return response.send(playlists[0]);
        }
    }
    response.status(404).send({error: 'Playlist not found'});
};

module.exports.create = async (request, response) => {
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
    const snapshot = await getFirstItemSnapshot({playlistId: id, userId});
    await snapshot.ref.update({...body});

    const newPlaylist = await getAndPopulate({playlistId: id, userId});
    response.send(newPlaylist[0]);
};

module.exports.delete = async (request, response) => {
    const {params: {id}, uid: userId} = request;
    const snapshot = await getFirstItemSnapshot({playlistId: id, userId});

    if (snapshot) {
        snapshot.ref.delete();
        response.send({success: 'Playlist deleted'});
    } else {
        response.status(404).send({error: 'Playlist not found'});
    }
};

module.exports.createSharedLink = async (request, response) => {
    const {params: {id}, uid: userId} = request;
    const snapshot = await getFirstItemSnapshot({playlistId: id, userId});
    const sharedLinkId = uuidv4();
    const sharedLink = `http://localhost:8080/#/playlist/${sharedLinkId}`;

    await snapshot.ref.update({sharedLink: sharedLinkId});

    response.send({sharedLink})
};

module.exports.getSharedLink = async (request, response) => {
    const {params: {id}, uid: userId} = request;
    const playlist = await getFirstItemSnapshot({playlistId: id, userId});
    const sharedLink = playlist.data().sharedLink;
    const sendBack = `http://localhost:8080/#/playlist/${sharedLink}`;

    if (sharedLink) {
        response.send({sharedLink: sendBack})
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

    const newPlaylist = await getAndPopulate({playlistId, userId});
    response.send(newPlaylist[0])
};


const getAndPopulate = async (args) => {
    const playlist = await getFirstItemSnapshot(args);
    if (!playlist) {
        return;
    }
    return populate([playlist], ['songs', 'owner']);
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

const getPlaylistsSnapshot = ({playlistId, userId, sharedWithAll, sharedWith, name, sharedLink}) => {
    let query = playlists;
    if (playlistId) {
        query = query.where(documentId, '==', playlistId)
    }
    if (userId) {
        const userRef = firestore().doc(`users/${userId}`);
        query = query.where('owner', '==', userRef);
    }
    if (sharedWithAll) {
        query = query.where('sharedWithAll', '==', sharedWithAll);
    }
    if (sharedWith) {
        query = query.where('sharedWith', '==', sharedWith);
    }
    if (name) {
        query = query.where('name', '==', name);
    }
    if (sharedLink) {
        query = query.where('sharedLink', '==', sharedLink);
    }
    return query.get();
};

const getAccessiblePlaylist = async (playlistId, userId) => {
    const snapshot = await getFirstItemSnapshot({playlistId});

    if (!snapshot) {
        return;
    }

    const data = snapshot.data();
    if (data.sharedWithAll === 'true'
        || data.owner === userId) {
        const playlist = await populate([snapshot], ['songs', 'owner']);
        return playlist[0]
    }
};


