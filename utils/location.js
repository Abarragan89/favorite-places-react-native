import { GOOGLE_MAP_API_KEY } from '@env'

export function getMapPreview(lat, long) {
    const imagePreviewUrl=`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_MAP_API_KEY}`
    return imagePreviewUrl;
} 

export async function getAddress(lat, long) {
    const getAddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_API_KEY}`
    const response = await fetch(getAddressUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch address');
    }
    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}