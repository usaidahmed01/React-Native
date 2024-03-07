import React, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Destination({ navigation , route }) {
    const { pickupLoc } = route.params
    const [location, setLocation] = useState(null)
    const [currentPlace, setCurrentPlace] = useState([])
    const [destination, setDestination] = useState()

    useEffect(() => {

        //Anonymous Function

        (async () => {



            Location.watchPositionAsync({
                accuracy: 6,

                distanceInterval: 1,

                timeInterval: 1000

            }, (location) => {


                // console.log('Location', location)

                setLocation(location)

            })

            // let location = await Location.getCurrentPositionAsync({}); 
            // console.log('location', location)
            // setLocation(location);

        })();
    }, []);


    const searchLoc = (text) => {
        setDestination()


        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3wYfC9SxubNpT+Mi8mSnwGAWeyu2q1n8b/5bF5+gs31g='
            }
        };

        // console.log(location.coords.latitude);
        fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${location.coords.latitude},${location.coords.longitude}&radius=5000`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response.results);
                setCurrentPlace(response.results)
            })
            .catch(err => console.error(err));


    }

    const onPlaceSelect = (item) => {
        setDestination(item)
    }
    // console.log(pickupLoc , 'picupppppp');



    //early return



    if (!location) {
        return <Text>Loading...</Text>

    }



    return <View style={styles.container} >

        <TextInput
            style={{
                padding: 16,
                marginTop: 50,
            }}
            onChangeText={searchLoc}
            placeholder='Search'
        />
        {!destination ? <View>
            {currentPlace.map((item) => {
                return <TouchableOpacity style={styles.button} onPress={() => onPlaceSelect(item)}>
                    <Text>{item.name} , {item.location.address}</Text>
                </TouchableOpacity>


            })}
        </View>
            : <View>
                <Text>Your Selected Pickup location is : {pickupLoc.name} , {pickupLoc.location.address}</Text>
                <Text>Your Selected Destination is : {destination.name} , {destination.location.address}</Text>
            </View>}

        <MapView

            initialRegion={{


                latitude: location.coords.latitude,
                longitude: location.coords.longitude,


                latitudeDelta: 0.0001,
                longitudeDelta: 0.0001,
            }}

            style={styles.map} >

            <Marker

                coordinate={{

                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}




                title={"Your Location"}

                description={destination?.name}
            />



        </MapView >

        { destination && <Button title="Select Car" color="#841584" onPress={() => navigation.navigate('Driver', { pickupLoc , destination})} />}

    </View>

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

    },

    map: {

        width: '100%',

        height: '50%',

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        height: '2'
    },

});


