import { createStackNavigator } from '@react-navigation/stack';
import PickUp from '../views/PickUp';
import Dashboard from '../views/Dashboard';
import Destination from '../views/Destination';
import Driver from '../views/Driver';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="PickUp" component={PickUp} />
      <Stack.Screen name="Destination" component={Destination} />
      <Stack.Screen name="Driver" component={Driver} />


    </Stack.Navigator>
  );
}