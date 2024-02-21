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
        <StatusBar barStyle={'light-content'} backgroundColor={Color.PRIMARY} />
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
                    require("../../../assets/onboarding/i4.png"),
                    require("../../../assets/onboarding/i5.png"),
                    require("../../../assets/onboarding/i6.png"),
                ]}
                renderItem={({index, item})=> <Image key={index} source={item} style={styles.floater} /> }
            />
            <Card style={{ height: '40%', }}>
                <View style={{ alignItems: 'center', padding: 12, position: 'relative' }}>

                    {
                        currentPage == 0 && 
                        <View style={{ height: '80%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700' }} variant='titleLarge'>Interactive Platform Borderless</Text>
                            <Text style={{ textAlign: 'center', marginVertical: 10 }} variant='bodyMedium'>With the ability to create an account, create post, comment on post and like post.</Text>
                        </View>
                    }

                    {
                        currentPage == 1 && 
                        <View style={{ height: '80%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700' }} variant='titleLarge'>Need to drop your opinion on any Post</Text>
                            <Text style={{ textAlign: 'center', marginVertical: 10 }} variant='bodyMedium'>You can easily comment on any post with the interactive design made ease for interaction</Text>
                        </View>
                    }

                    {
                        currentPage == 2 && 
                        <View style={{ height: '80%' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '700' }} variant='titleLarge'>Need to add your feeling to a post</Text>
                            <Text style={{ textAlign: 'center', marginVertical: 10 }} variant='bodyMedium'>You can easily add your feeling by simply liking any post</Text>
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