class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // {lat: 1.12, long: 0.3231}
        this.id = new Date().toString() + Math.random().toString();
    }
}