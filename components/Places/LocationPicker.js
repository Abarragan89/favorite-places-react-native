import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { useState, useEffect } from 'react';
import OutlinedButton from "../UI/OutlinedButton"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../utils/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    const navigation = useNavigation();
    const route = useRoute();
    // true or false depending if a screen is currently focused
    // (screens simply stack with the navigation)
    // it will be true when we enter pick location map
    const isFocused = useIsFocused();

    // will only have route parameters when coming from pick location map
    
    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params && {
            lat: route.params.pickedLat,
            long: route.params.pickedLong
        };
        setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            // returns a boolean (either true or false depending on user choice)
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.')
            return false;
        }
        // otherwise, just return true. 
        return true
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet</Text>

    if (pickedLocation) {
        locationPreview = (
            <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.long) }} />
        )
    }

    return (
        <View style={styles.rootContainer}>

            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon="location">Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon="map">Pick on Map</OutlinedButton>
            </View>

        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 24
    },
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})