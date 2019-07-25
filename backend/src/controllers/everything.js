const {populate, dataFromSnapshot} = require("../utils/firestore-utils");
const admin = require('firebase-admin');
const firestore = admin.firestore;
const playlists = firestore().collection('playlists');
const songs = firestore().collection('songs');

module.exports.search = async (request, response) => {
    const {type, q: query} = request.query;

    if (type === 'playlist') {
        const playlistsData = await searchPlaylists(query);
        response.send(playlistsData)
    } else if (type === 'song') {
        const songsData = await searchSongs(query);
        response.send(songsData);
    } else {
        const playlistsData = await searchPlaylists(query);
        const songsData = await searchSongs(query);

        response.send([...playlistsData, ...songsData ])
    }
};

const searchPlaylists = async (query) => {
    const playlistsSnapshot = await playlists.where('name', '>=', query).get();

    const playlistsData = await populate(playlistsSnapshot, ['songs']);
    playlistsData.forEach(playlist => playlist.type = 'playlist');

    return playlistsData;
};

const searchSongs = async (query) => {
    const songsSnapshot = await songs.where('name', '>=', query).get();

    const songsData = dataFromSnapshot(songsSnapshot);

    const songsSnapshot1 = await songs.where('singer', '>=', query).get();

    const songsData1 = dataFromSnapshot(songsSnapshot1);

    const mergedSongs = [];
    for (let song of songsData) {
        const foundSong = mergedSongs.find(item => item.id === song.id);
        if (foundSong) {
            continue;
        }
        mergedSongs.push(song);
    }

    for (let song of songsData1) {
        const foundSong = mergedSongs.find(item => item.id === song.id);
        if (foundSong) {
            continue;
        }
        mergedSongs.push(song);
    }

    mergedSongs.forEach(song => song.type = 'song');
    return mergedSongs;
};
