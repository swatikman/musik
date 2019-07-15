const admin = require('firebase-admin');
const firestore = admin.firestore;
const documentId = firestore.FieldPath.documentId();
const playlists = firestore().collection('playlists');
const songs = firestore().collection('songs');

module.exports.get = async (request, response) => {
    let snapshot = [];
    if (request.query.type === 'my') {
        snapshot = await getPlaylistsSnapshot({userId: request.uid});
    } else if (request.query.type === 'shared') {
        snapshot = await getPlaylistsSnapshot({sharedWith: request.uid})
    } else {
        snapshot = await getPlaylistsSnapshot({});
    }

    const sendBack = await populate(snapshot, ['songs']);
    response.send(sendBack);
};

module.exports.getOne = async (request, response) => {
    const playlist = await getPlaylist(request.params.id, request.uid);
    if (playlist) {
        response.send(playlist);
    } else {
        response.status(404).send({error: 'Playlist not found'});
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
    const snapshot = getPlaylistsSnapshot({ playlistId: request.params.id});
    snapshot.forEach(async playlist => await playlist.update({...request.body}));
    response.send({success: 'Playlist information updated'});
};

module.exports.delete = async (request, response) => {
    const snapshot = await getPlaylistsSnapshot({ playlistId: request.params.id, userId: request.uid});

    if (snapshot) {
        snapshot.forEach(async playlist => await playlist.ref.delete());
        response.send({success: 'Playlist deleted'});
    } else {
        response.status(404).send({error: 'Playlist not found'});
    }
};

module.exports.addSong = async (request, response) => {
    const { params: { playlistId, songId }, uid} = request;
    const playlist = await getFirstItemSnapshot({ playlistId: playlistId, userId: uid});

    const song = await songs.doc(songId).get();

    if (!song.data()) {
        return response.status(422).send({error: 'There is no such song'})
    }
    await playlist.ref.update({
        songs: firestore.FieldValue.arrayUnion(song.ref)
    });
    response.send({success: 'Song added to playlist'})
};

module.exports.removeSong = async (request, response) => {
    const { params: { playlistId, songId }, uid} = request;
    const playlist = await getFirstItemSnapshot({ playlistId: playlistId, userId: uid});

    const song = await songs.doc(songId).get();

    if (!song.data()) {
        return response.status(422).send({error: 'There is no such song'})
    }
    await playlist.ref.update({
        songs: firestore.FieldValue.arrayRemove(song.ref)
    });
    response.send({success: 'Song removed from playlist'})
};

const getFirstItemSnapshot = async (...args) => {
    const snapshot = await getPlaylistsSnapshot(args);
    let returnItem = undefined;
    snapshot.forEach(item => {
        if (!returnItem) {
            returnItem = item;
        }
    });
    return returnItem;
};

const getPlaylistsSnapshot = ({ playlistId, userId, sharedWithAll, sharedWith }) => {
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
    const snapshot = await getPlaylistsSnapshot({ playlistId });

    const playlist = dataFromSnapshot(snapshot)[0];
    if (playlist.sharedWithAll
            || playlist.owner === userId
            || playlist.sharedWith.find(sharedUserId => sharedUserId === userId)) {
        return playlist;
    }
};

const dataFromSnapshot = (snapshot) => {
    const items = [];
    snapshot.forEach(doc => items.push({id: doc.id, ...doc.data()}));
    return items;
};

const populate = async (snapshot, refFields) => {
    const refs = [];
    snapshot.forEach(doc => {
        const docData = doc.data();

        for (let field of refFields) {
            const value = docData[field];
            if (!value) {
                continue;
            }
            if (Array.isArray(value)) {
                value.forEach(item => refs.push(item));
            } else {
                refs.push(value)
            }
        }
    });

    const data = dataFromSnapshot(snapshot);
    const songsSnapshot = await firestore().getAll(...refs);

    const itemsMap = new Map();
    songsSnapshot.forEach(item => {
        itemsMap.set(item.id, { id: item.id, ...item.data()});
    });

    data.forEach(item => {
        for (let field of refFields) {
            const value = item[field];
            if (!value) {
                continue;
            }
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    value[i] = itemsMap.get(value[i].id);
                }
            } else {
                item[field] = itemsMap.get(value.id);
            }

        }
    });
    return data
};
