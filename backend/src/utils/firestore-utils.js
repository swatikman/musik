const admin = require('firebase-admin');
const firestore = admin.firestore;

module.exports.populate = async (snapshot, refFields = []) => {
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

    const data = module.exports.dataFromSnapshot(snapshot);
    if (!refs.length) {
        return data;
    }
    const itemsSnapshot = await firestore().getAll(...refs);

    const itemsMap = new Map();
    itemsSnapshot.forEach(item => {
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

module.exports.getIds = (docRefs) => {
    return docRefs.map((ref) => ref.id)
};

module.exports.dataFromSnapshot = (snapshot) => {
    const items = [];
    snapshot.forEach(doc => items.push({id: doc.id, ...doc.data()}));
    return items;
};