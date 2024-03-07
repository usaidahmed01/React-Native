import { StyleSheet, Text, View, Button } from 'react-native';
import PickUp from './PickUp';
import { useNavigation } from '@react-navigation/native-stack'


export default function Dashboard({navigation}) {

    return (
        <View>
            <Text>Hello Dashboard</Text>
            <Button
                onPress={() => navigation.navigate('PickUp')}
                title="Pick Up"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}