import { db } from "./firebase-config";
import { geohashForLocation } from "geofire-common";
import { collection, doc, setDoc ,getDocs, where} from "firebase/firestore";
import { geohashQueryBounds, distanceBetween} from "geofire-common";
import { query, orderBy, startAt, endAt } from "firebase/firestore"; 


const search = async (types, minPrice, maxPrice, location) => {
    const radiusInM = 10 * 1000;

    const bounds = geohashQueryBounds(location, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = query(collection(db, 'vehicles'), where("type", "in", types), orderBy('geohash'), startAt(b[0]), endAt(b[1]));
        promises.push(getDocs(q));
    }

    return Promise.all(promises).then((snapshots) => {
        const matchingDocs = [];
        for (const snap of snapshots) {
            for (const doc of snap.docs) {
                const lat = doc.get('lat');
                const lng = doc.get('lng');

                const distanceInKm = distanceBetween([lat, lng], location);
                const distanceInM = distanceInKm * 1000;
                if (distanceInM <= radiusInM) {
                    matchingDocs.push(doc);
                }
            }
        }
        return matchingDocs;
    });
}

export { search};