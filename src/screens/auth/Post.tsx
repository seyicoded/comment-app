import { View, StyleSheet, StatusBar, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, List, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { NavigationProp } from '@react-navigation/native'
import ROUTE from '../../constants/route/route'
import { generateUUID } from '../../function/func'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddNewPostToState } from '../../store/redux/action/action'

type Props = {
    navigation: NavigationProp<any>
}

const Post = ({navigation}: Props) => {
    const [postTitle, setPostTitle] = useState("");
    const [post, setPost] = useState("");
    const dispatch = useDispatch()
    const {appPostCollections, userData}: any = useSelector(state => state)

    const uploadPost = async ()=>{
        const postPayload = {
            id: generateUUID(),
            createdBy: {
                id: userData?.id,
                name: userData?.name,
            },
            postTitle: postTitle,
            postContent: post,
            comments: [],
            likes: [],
            date: (new Date()).toISOString()
        }

        // update async and redux using the dispatch
        await updateAddNewPostToState(postPayload, appPostCollections, dispatch);
        
        setPost("");
        setPostTitle("");
        Toast.show({
            type: 'success',
            text1: "Post Created Successfully"
        });
        navigation.navigate(ROUTE.HOME);
    }

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={Color.PRIMARY} /> */}
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <View  style={{ flex: 1 }}>
                <Text variant='headlineLarge'>Add New Post {'\r'}</Text>
                
                <TextInput label={"Post Title"} value={postTitle} onChangeText={val => setPostTitle(val)} style={{ marginTop: 15, backgroundColor: 'white' }} mode='outlined' placeholder='Enter Post Title' />

                <TextInput label={"Post Content"} value={post} onChangeText={val => setPost(val)} style={{ marginVertical: 15, minHeight: 300, paddingVertical: 12, backgroundColor: 'white' }} mode='outlined' multiline placeholder='Enter Post Content Here' />
                <Button onPress={()=> uploadPost()} theme={{ roundness: 2 }} mode='contained-tonal'>Post</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    }
})

export default Post