const uuidv4 = require('uuid/v4');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();
const songs = admin.firestore().collection('songs');

module.exports.get = async (request, response) => {
    if (request.query.popular) {
        console.log('popular')
    } else if (request.query.my) {
        console.log('my');
    }
    console.log(request.params, request.query);
    response.send('abc');
};

module.exports.getOne = async (request, response) => {
    // await db.get()
};

module.exports.create = async (request, response) => {
    const songId = uuidv4();
    const path = `/${request.uid}/${songId}`;

    await bucket.upload(request.files.file.tempFilePath, {
        destination: `${path}`
    });

    await songs.doc(songId).set({
        ...request.body,
        uploadBy: request.uid,
        filePath: path
    });

    response.send({success: 'Song successfully uploaded'})
};

module.exports.update = async (request, response) => {

};

module.exports.delete = async (request, response) => {

};

//
// router.get('/', async (request, response) => {
//     const bucket = admin.storage().bucket();
//     // console.log(bucket);
//     try {
//         const result = await bucket.upload('/usr/src/app/src/bin/www');
//     } catch (e) {
//         console.log('err', e);
//     }
//     response.send('123');
// });


