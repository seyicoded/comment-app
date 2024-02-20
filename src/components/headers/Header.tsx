import { View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import M1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

type Props = {
    title: string,
    hasBack?: boolean,
    hasFilter?: boolean,
    onFilterClick?: any
}

const Header = ({hasBack = true, title, hasFilter = false, onFilterClick}: Props) => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <M1 color="black" name="chevron-left" size={24} onPress={()=>{
                if(hasBack){
                    navigation.goBack();
                }
            }} />
            <Text variant='bodyLarge' style={{ fontWeight: '700' }}>{title}</Text>
            {
                hasFilter ? 
                <M1 name="filter" size={24} color="black" onPress={()=> onFilterClick()}/>
                :
                <Text>{'          '}</Text>
            }
        </View>
    )
}

export default Header