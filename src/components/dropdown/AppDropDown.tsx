import { View, Text } from 'react-native'
import React, { useState } from 'react'
// import DropDown from 'react-native-paper-dropdown'
import { Dropdown } from 'react-native-element-dropdown';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import { Color } from '../../constants/color/color';

type Props = {
    list: any[],
    value: string | any,
    setValue: any,
    showDropDown: boolean,
    setShowDropDown: any,
    placeholder: string,
    search?: boolean
}

const AppDropDown = ({
    list,
    value,
    setValue,
    showDropDown,
    setShowDropDown,
    placeholder,
    search = true
}: Props) => {
const [isFocus, setIsFocus] = useState(false);
  return (

    <Dropdown
            placeholder={placeholder}
            maxHeight={300}
            search={ (search != undefined) ? search : true}
            searchPlaceholder='Start typing to filter'
            activeColor={Color.PRIMARY}
            placeholderStyle={{ color: '#222' }}
            inputSearchStyle={{ 
              color: '#222',
            }}
            selectedTextStyle={{ color: '#222' }}
            itemTextStyle={{ 
              color: '#222'
            }}
            renderItem={(item)=> (
              <Text style={{ color: (item.value == value) ?  "white" : "black", padding: 12, fontWeight: (item.value == value) ?  "600" : "400" }}>{item.label}</Text>
            )}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            style={{ 
              height: 50,
              borderColor: 'gray',
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
            //   backgroundColor: 'rgba(234, 255, 240, 1)'
            marginVertical: 12
            }}
            labelField="label"
            valueField="value"
            searchField="value"
            autoScroll={false}
            value={value}
            onChange={(item)=>{
              setValue(item.value);
              setIsFocus(false)
            }}
            data={list || []}
            renderRightIcon={() => (
              <IconM
                color={'black'}
                name={isFocus ?  "chevron-up" : "chevron-down"}
                size={20}
              />
            )}
        /> 

    // <DropDown
    //     label={placeholder}
    //     mode={"outlined"}
    //     visible={showDropDown}
    //     showDropDown={() => setShowDropDown(true)}
    //     onDismiss={() => setShowDropDown(false)}
    //     value={value}
    //     setValue={setValue}
    //     list={list}
    // />
  )
}

export default AppDropDown