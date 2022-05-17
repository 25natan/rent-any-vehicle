import { db } from "./firebase-config";
import { geohashForLocation } from "geofire-common";
import { collection, doc, addDoc ,getDocs} from "firebase/firestore";
import { geohashQueryBounds, distanceBetween} from "geofire-common";
import { query, orderBy, startAt, endAt } from "firebase/firestore"; 


const searchByDistance = () => {
    // Find cities within 50km of London
    const center = [51.5074, 30.1278];
    const radiusInM = 50 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
    const q = query(collection(db, 'vehicles'), orderBy('geohash'), startAt(b[0]), endAt(b[1]));

    promises.push(getDocs(q));
    }

    // Collect all the query results together into a single list
    Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            const lat = doc.get('lat');
            const lng = doc.get('lng');

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
                matchingDocs.push(doc);
            }
        }
    }

    return matchingDocs;
    }).then((matchingDocs) => {
        matchingDocs.forEach(doc => console.log(doc.data()))
    });
}

const updateDoc = () => {
    const lat = 51.5074;
    const lng = 30.1278;
    const hash = geohashForLocation([lat, lng]);
    console.log('hash value: ', hash);
    const docRefRef = doc(db, 'vehicles', 'IvW3DCBwu43kWCg7aJZS');
    addDoc(docRefRef, {
        geohash: hash,
        lat: lat,
        lng: lng }, { merge: true })
    .then(e => console.log(e))
    .catch(e => console.log(e))
}

export { searchByDistance, updateDoc};