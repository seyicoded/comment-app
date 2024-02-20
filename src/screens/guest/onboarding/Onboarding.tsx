import { View, StyleSheet, StatusBar, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Color } from '../../../constants/color/color'
import { Button, Card, Text } from 'react-native-paper'
import { Image } from 'react-native-animatable'
import { NavigationProp } from '@react-navigation/native'
import ROUTE from '../../../constants/route/route'
import { setSeenOnBoarind } from '../../../store/local/storage'

type Props = {
    navigation: NavigationProp<any>
}

const {height, width} = Dimensions.get("screen");

const Onboarding = ({navigation}: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrollRef: any = useRef(null);

    const skip = ()=>{
        // navigation.navigate(ROUTE.SIGNIN)

        setSeenOnBoarind("yes");

        navigation.reset({
            index: 0,
            routes: [{name: ROUTE.SIGNIN}]
        })
    }

    const next = ()=>{
        try {
            if(currentPage == 2){
                // next page
                skip();
                return ;
            }
            scrollRef?.current?.scrollToIndex({
                index: currentPage + 1
            });

            setCurrentPage(currentPage + 1);
        } catch (error) {
            
        }
    }
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={Color.PRIMARY} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button onPress={()=> skip()} theme={{ colors: {primary: Color.PRIMARY_LIGHT} }} mode='contained'>Skip</Button>
        </View>

        <View style={{ justifyContent: 'space-between', marginVertical: 20, flex: 1 }}>

            <FlatList
                horizontal
                ref={ref => {
                    scrollRef.current = ref;
                    // ref?.scrollToIndex({
                    //     index: 1
                    // })
                }}
                pagingEnabled
                scrollEnabled={false}
                style={{ width }}
                data={[
                    require("../../../assets/onboarding/i1.png"),
                    require("../../../assets/onboarding/i2.png"),
                    require("../../../assets/onboarding/i3.png"),
                ]}
                renderItem={({index, item})=> <Image key={index} source={item} style={styles.floater} /> }
            />
            <Card style={{ height: '40%', }}>
                <View style={{ alignItems: 'center', padding: 12, position: 'relative' }}>

                    {
                        currentPage == 0 && 
                        <View style={{ height: '80%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700' }} variant='titleLarge'>You ought to know where your money goes</Text>
                            <Text style={{ textAlign: 'center', marginVertical: 10 }} variant='bodyMedium'>Get an overview of how you are performing and motivate yourself to achieve even more.</Text>
                        </View>
                    }

                    {
                        currentPage == 1 && 
                        <View style={{ height: '80%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700' }} variant='titleLarge'>Gain total control of your money</Text>
                            <Text style={{ textAlign: 'center', marginVertical: 10 }} variant='bodyMedium'>Track your transaction easily, with categories and financial report</Text>
                        </View>
                    }

                    {
                        currentPage == 2 && 
                        <View style={{ height: '80%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700' }} variant='titleLarge'>Plan ahead and manage your money better</Text>
                            <Text style={{ textAlign: 'center', marginVertical: 10 }} variant='bodyMedium'>Setup your budget for each category so you in control. Track categories you spend the most money on</Text>
                        </View>
                    }

                    <Button onPress={()=> next()} style={{  }} theme={{ colors: {primary: Color.PRIMARY_LIGHT} }} mode='contained'>
                        {
                            currentPage == 2 ? "Proceed" : "Next"
                        }
                    </Button>
                </View>
            </Card>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY,
        padding: 20
    },
    floater: {
        width: width * 0.96,
        height: 500,
        resizeMode: 'contain'
    }
})

export default Onboarding