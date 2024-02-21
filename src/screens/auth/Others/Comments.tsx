import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Appbar, Avatar, Card, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { generateUUID } from '../../../function/func'
import { updatePostToState } from '../../../store/redux/action/action'
import moment from 'moment'

type Props = {
    navigation: NavigationProp<any>,
    route: {
        params: {
            index: number
        }
    }
}

const Comments = ({navigation, route: {params: {index}}}: Props) => {
    const {appPostCollections, userData}: any = useSelector(state => state)
    const dispatch = useDispatch();

    const [item, setCurrentPost]: any = useState({});
    const [comment, setComment]: any = useState("");

    useEffect(()=>{
        setCurrentPost( (appPostCollections[index] || {}) );
    }, [appPostCollections, index]);

    const sendComment = async ()=>{
        let tempAppPostCollections = appPostCollections;
        tempAppPostCollections[index].comments.push({
            id: generateUUID(),
            userId: userData?.id,
            userName: userData?.name,
            userIcon: userData?.photo,
            comment: comment,
            date: (new Date()).toISOString()
        });

        updatePostToState(tempAppPostCollections, dispatch);

        setComment('');
        Keyboard.dismiss();
    }

    console.log(item.comments)
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigation.goBack()}} />
                <Appbar.Content title="Comments" />
                <Appbar.Action icon="magnify" onPress={() => {
                    Toast.show({
                        type: "info",
                        text1: "Coming Soon"
                    })
                }} />
            </Appbar.Header>
            

            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>

                <Card style={{ marginBottom: 20, backgroundColor: 'white', padding: 4, margin: 3 }} key={index}>
                    <Card.Content>
                        <Text variant="titleLarge">{item?.postTitle}</Text>
                        <Card.Cover style={{ marginVertical: 6, height: 150 }} source={{ uri: 'https://picsum.photos/400' }} />
                        <Text style={{ textAlign: 'justify' }} variant="bodyMedium">{item?.postContent}</Text>
                    </Card.Content>
                </Card>

                <Text>comment list:</Text>
                {
                    item?.comments?.map((comment: any)=>(
                        <View>
                            <Card.Title
                                title={comment?.comment}
                                subtitleNumberOfLines={5}
                                subtitleStyle={{ fontSize: 10 }}
                                subtitle={`by ${comment?.userName} on ${moment(comment.date).fromNow()}`}
                                left={(props) => <Avatar.Image {...props} source={{ uri: comment?.userIcon }} />}
                            />
                        </View>
                    ))
                }

                </KeyboardAvoidingView>
            </ScrollView>
            <TextInput multiline value={comment} onChangeText={(val)=> setComment(val)} right={<TextInput.Icon style={{ zIndex: 99 }} onPress={()=>{
                // console.log('reached');
                sendComment()
            }} icon="send" />} label={"Comment"} mode='flat' placeholder='Enter Comment' style={{ marginBottom: 10, backgroundColor: 'white' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20
    }
})

export default Comments