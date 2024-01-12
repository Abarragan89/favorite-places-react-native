import { Button, View, Image, StyleSheet, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

function ImagePicker() {
    const [pickedImage, setPickedImage] = useState('')
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            // returns a boolean (either true or false depending on user choice)
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!',  'You need to grant camera permissions to use this app.')
            return false;
        }
        // otherwise, just return true. 
        return true
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            // camera configurations
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.assets[0].uri)
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage}} />
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton
                onPress={takeImageHandler}
                icon='camera'
            >Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 24
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
})