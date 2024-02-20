import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { route } from '../constants/route/route';
import Setting from '../screens/auth/Setting';
import Home from '../screens/auth/Home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { Color } from '../constants/color/color';

const Tab = createMaterialBottomTabNavigator();

export function BottomStack() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: Color.PRIMARY }} activeColor={"white"} theme={{ colors: {primary: Color.PRIMARY} }}>
      <Tab.Screen options={{ 
        tabBarIcon: ({color})=> <FontAwesome5 size={24} name="home" color={color} />
       }} name={route.HOME} component={Home} />
      <Tab.Screen options={{ 
        tabBarIcon: ({color})=> <FontAwesome6 size={24} name="gear" color={color} />
       }} name={route.SETTING} component={Setting} />
    </Tab.Navigator>
  );
}