import { Alert, StyleSheet, View } from "react-native"
import OutlinedButton from "../UI/OutlinedButton"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { Colors } from "../../constants/colors";

function LocationPicker() {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            // returns a boolean (either true or false depending on user choice)
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!',  'You need to grant location permissions to use this app.')
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
        console.log(location)
    }

    function pickOnMapHandler() {

    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.mapPreview}></View>
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
})