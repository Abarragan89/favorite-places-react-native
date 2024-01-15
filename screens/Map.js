import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton';

function Map({ navigation }) {

    const [selectedLocation, setSelectedLocation] = useState()

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude
        const long = event.nativeEvent.coordinate.longitude

        setSelectedLocation({ lat: lat, long: long })
    }

    const savedPickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No locatio picked!', 'You have to pick a location by clicking on the map first.');
            return;
        }
        navigation.navigate('AddPlaces', {
            pickedLat: selectedLocation.lat,
            pickedLong: selectedLocation.long
        })
    }, [navigation, selectedLocation])

    // set navigation options for header button
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton name='save' size={24} color={tintColor} onPress={savedPickedLocationHandler} />
        })
    }, [navigation, savedPickedLocationHandler])
    
    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            {selectedLocation &&
                <Marker
                    title='Picked Location'
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.long,
                    }}
                />
            }
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})