import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { placeFetchDetails } from "../utils/database";

function PlaceDetails({ route, navigation }) {

    const [currentPlace, setCurrentPlace] = useState()

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: currentPlace.location.lat,
            initialLong: currentPlace.location.long
        })
    };

    const selectedPlaceId = route.params.placeId

    useEffect(() => {
        async function loadPlaceData() {
            const place = await placeFetchDetails(selectedPlaceId);
            setCurrentPlace(place)
            // we will set title after data has been fetched
            navigation.setOptions({
                title: place.title
            })
        }
        loadPlaceData();
    }, [selectedPlaceId])

    if (!currentPlace) {
        return (
            <View style={styles.fallbackText}>
                <Text>Loading place data...</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: currentPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View>
                    <Text style={styles.address}>{currentPlace.address}</Text>
                </View>
                <OutlinedButton name="map" onPress={showOnMapHandler} >View on Map</OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallbackText: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})