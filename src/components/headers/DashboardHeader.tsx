import { View } from 'react-native'
import React from 'react'
import { Avatar, Text } from 'react-native-paper'
import { Color } from '../../constants/color/color'
import { useSelector } from 'react-redux'
import {View as AnimatableView} from 'react-native-animatable'

type Props = {}

const DashboardHeader = (props: Props) => {
  const {userData}: any = useSelector(state => state);

  // console.log(userData)
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text variant='headlineMedium' style={{ color: '#000', fontWeight: '700', }}>Hello {userData?.familyName}</Text>
        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 10, fontWeight: '400', }}>Exciting post available velow</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Avatar.Icon size={48} color='black' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', marginRight: 8 }} icon={"bell"} />
        <AnimatableView animation={"pulse"} easing="ease-out" iterationCount="infinite" duration={1000}>
          <Avatar.Image size={48} style={{ backgroundColor: Color.PRIMARY_BG }} source={{ uri: userData?.photo }} />
        </AnimatableView>
      </View>
    </View>
  )
}

export default DashboardHeader