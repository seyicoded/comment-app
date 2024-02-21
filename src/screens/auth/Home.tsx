import { View, StyleSheet, StatusBar, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Color } from '../../constants/color/color'
import DashboardHeader from '../../components/headers/DashboardHeader'
import { Button, Card, DataTable, Icon, Text } from 'react-native-paper'
import { Image } from 'react-native-animatable'
import { route } from '../../constants/route/route'
import { NavigationProp } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { generateUUID } from '../../function/func'
import { updatePostToState } from '../../store/redux/action/action'
import Toast from 'react-native-toast-message'
// @ts-ignore
import MCI from "react-native-vector-icons/MaterialCommunityIcons"

type Props = {
    navigation: NavigationProp<any>
}

const Home = ({navigation}: Props) => {
    const {appPostCollections, userData}: any = useSelector(state => state)
    const dispatch = useDispatch();

    const toggleLike = (index: number, newBool: boolean) => {
        if(newBool){
            // add like
            let tempAppPostCollections = appPostCollections;
            tempAppPostCollections[index].likes.push({
                id: generateUUID(),
                userId: userData?.id,
                date: (new Date()).toISOString()
            });

            updatePostToState(tempAppPostCollections, dispatch);
        }else{
            // remove like
            let tempAppPostCollections = appPostCollections;
            tempAppPostCollections[index].likes = tempAppPostCollections[index].likes.filter((val: any) => val?.userId != userData?.id);

            updatePostToState(tempAppPostCollections, dispatch);
        }
    };
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={Color.PRIMARY} /> */}
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <DashboardHeader />
            <View style={{ marginTop: 20, flex: 1 }}>

                {
                    (appPostCollections.length == 0) &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}><Text>no post available yet</Text></View>
                }
                <FlatList 
                    data={appPostCollections.sort((a: any, b: any) => {
                        return ( (new Date(b.date)).getTime() - (new Date(a.date)).getTime() )
                    })}
                    renderItem={({index, item})=> (
                        <Card style={{ position: 'relative', marginBottom: 20, backgroundColor: 'white', padding: 4, margin: 3 }} key={index}>
                            <MCI onPress={()=>{
                                Alert.alert("Action Require", "Are you sure you want to delete this item", [
                                    {
                                        text: "Abort"
                                    },
                                    {
                                        text: "Proceed",
                                        style: "destructive",
                                        onPress: ()=>{ 
                                            let tempAppPostCollections = appPostCollections;
                                            tempAppPostCollections = tempAppPostCollections.filter((val: any, indexM: number) => indexM != index);

                                            updatePostToState(tempAppPostCollections, dispatch);
                                        }
                                    }
                                ])
                            }} size={24} color={'red'} style={{ position: 'absolute', right: 2 }} name="delete" />
                            <Card.Content>
                                <Text variant="titleLarge">{item?.postTitle}</Text>
                                <Card.Cover style={{ marginVertical: 6, marginTop: 12, height: 150 }} source={{ uri: 'https://picsum.photos/400' }} />
                                <Text style={{ textAlign: 'justify' }} numberOfLines={4} variant="bodyMedium">{item?.postContent}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <TouchableOpacity onPress={()=>{
                                        toggleLike(index, ((item?.likes || []).find((a: any) => a.userId == userData.id) == undefined) );
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon
                                                source={"heart"}
                                                color={ (item?.likes || []).find((a: any) => a.userId == userData.id) ? 'red' : 'black'}
                                                size={20}
                                            />
                                            <Text style={{ marginLeft: 3 }}>
                                                Likes ({item?.likes?.length || 0})
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        navigation.navigate(route.COMMENT, {
                                            index
                                        })
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon
                                                source="comment"
                                                color={'black'}
                                                size={20}
                                            />
                                            <Text style={{ marginLeft: 3 }}>
                                                Comments ({item?.comments?.length || 0})
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=> {
                                        Toast.show({
                                            type: "info",
                                            text1: "Coming Soon"
                                        })
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon
                                                source="share"
                                                color={'black'}
                                                size={20}
                                            />
                                            <Text style={{ marginLeft: 3 }}>
                                                Share
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Card.Actions>
                        </Card>
                    )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Color.PRIMARY,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 20
    }
})

export default Home