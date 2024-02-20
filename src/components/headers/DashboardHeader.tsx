import { View } from 'react-native'
import React from 'react'
import { Avatar, Text } from 'react-native-paper'
import { Color } from '../../constants/color/color'

type Props = {}

const DashboardHeader = (props: Props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text variant='headlineMedium' style={{ color: '#fff', fontWeight: '700', }}>Hello Seyi</Text>
        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 10, fontWeight: '400', }}>Your finance are looking good</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Avatar.Icon size={48} color='white' style={{ backgroundColor: Color.PRIMARY_BG, marginRight: 8 }} icon={"bell"} />
        <Avatar.Icon size={48} color='white' style={{ backgroundColor: Color.PRIMARY_BG }} icon={"magnify"} />
      </View>
    </View>
  )
}

export default DashboardHeader