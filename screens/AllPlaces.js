import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { getPlaces } from "../utils/database";

function AllPlaces() {
    
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([])

    useEffect(() => {
        async function loadPlaces() {
            const places = await getPlaces();
            setLoadedPlaces(places)
        }
        if (isFocused) {
            loadPlaces();
        }
    }, [isFocused])
    console.log('loaded places', loadedPlaces)


    return (
        <PlacesList 
            places={loadedPlaces}
        />
    )
}

export default AllPlaces;