import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('places.db');
import { Place } from '../models/place';

export function init() {
    const promise = new Promise((resolve, reject) => {
        db.transaction((txObj) => {
            txObj.executeSql(`CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                long REAL NOT NULL
            )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    })
    return promise;
}

export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
        db.transaction((txObj) => {
            txObj.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, long) VALUES(?,?,?,?,?)`,
                [place.title, place.imageUri, place.address, place.location.lat, place.location.long],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error)
                }
            );
        })
    })
    return promise;
};

export function getPlaces() {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    let places = [];

                    for (const dp of result.rows._array) {
                        places.push(new Place(
                            dp.title,
                            dp.imageUri,
                            { address: dp.address, lat: dp.lat, long: dp.long },
                            dp.id
                        )
                        )
                        console.log('places ',)
                    }
                    resolve(places)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise;
}

export function placeFetchDetails(id) {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ?`,
                [id],
                (_, result) => {
                    const dbPlace = result.rows._array[0]
                    const place = new Place(
                        dbPlace.title, 
                        dbPlace.imageUri, 
                        { lat: dbPlace.lat, long: dbPlace.long, address: dbPlace.address }
                        )
                    resolve(place)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })

    });

    return promise;
}
