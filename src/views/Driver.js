
import { View, Button, StyleSheet, } from 'react-native';

export default function Driver({ route }) {

    const { pickupLoc, destination } = route.params
    const fares = {
        bike: 100,
        rickshaw: 150,
        car: 200,
        sCar: 300
    }

    const fareCalculation = (vehicle) => {

        const { latitude: pickupLat, longitude: pickupLong } = pickupLoc.geocodes.main
        const { latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main
        const distance = calculateDistance(pickupLat, pickupLong, destinationLat, destinationLong)
        const totalFare = fares[vehicle] * distance
        alert(totalFare.toFixed(2)  + 'RS')
    }


    function calculateDistance(lattitude1, longittude1, lattitude2, longittude2) {

        const toRadian = n => (n * Math.PI) / 180

        let lat2 = lattitude2
        let lon2 = longittude2
        let lat1 = lattitude1
        let lon1 = longittude1

        console.log(lat1, lon1 + "===" + lat2, lon2)
        let R = 6371  // km
        let x1 = lat2 - lat1
        let dLat = toRadian(x1)
        let x2 = lon2 - lon1
        let dLon = toRadian(x2)
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let d = R * c
        console.log("distance==?", d)
        return d;
    }

    return <View style={styles.container}>
        <Button
            onPress={() => fareCalculation('bike')}
            title={`Bike | ${fares.bike} RS`}
            color="#841584" />
        <Button
            onPress={() => fareCalculation('rickshaw')}
            title={`Rickshaw (Auto) | ${fares.rickshaw} RS`}
            color="#841584" />
        <Button
            onPress={() => fareCalculation('car')}
            title={`Car | ${fares.car} RS`}
            color="#841584" />
        <Button
            onPress={() => fareCalculation('sCar')}
            title={`Car (More than 4 persons) | ${fares.sCar} RS`}
            color="#841584" />
    </View>







}
const styles = StyleSheet.create({

    container: {

        flex: 1,

    },



});