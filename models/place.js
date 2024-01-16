export class Place {
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = {lat: location.lat, long: location.long}; // {lat: 1.12, long: 0.3231}
        this.id = id
    }
}