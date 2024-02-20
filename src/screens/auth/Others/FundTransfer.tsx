import { View, StatusBar, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Color } from '../../../constants/color/color'
import Header from '../../../components/headers/Header'
import { Button, DataTable, Text, TextInput } from 'react-native-paper'
import AppDropDown from '../../../components/dropdown/AppDropDown'
import { object, string } from 'yup'
import Toast from 'react-native-toast-message'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { updateLoaderCoverState } from '../../../store/redux/action/action'
import { useDispatch } from 'react-redux'

type Props = {}

const {height: deviceHeight} = Dimensions.get('screen');

const FundTransfer = (props: Props) => {
    const [showDropDownMyAccount, setShowDropDownMyAccount] = useState(false);
    const [MyAccount, setMyAccount] = useState();

    const [showDropDownGuestAccount, setShowDropDownGuestAccount] = useState(false);
    const [GuestAccount, setGuestAccount] = useState();
    const [visible, setVisible] = useState(false);
    const RBSheetRef = useRef(null);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        account_number: "",
        account_name: "",
        amount: "",
        narration: "",
        pin: "",
    })

    useEffect(()=>{
        if(input?.account_number.length == 10){
            setInput({...input, account_name: "Opadonu Emmanuel Oluwaseyi"});
        }else{
            setInput({...input, account_name: ""});
        }
    }, [input?.account_number])

    const processT1 =async ()=>{
        try {
            let userSchema = object({
                account_name: string().min(2).required(),
                amount: string().min(2).required(),
                pin: string().min(4).required(),
                narration: string().optional(),
                account_number: string().min(9).max(10).required(),
                MyAccount: string().min(1).required(),
                GuestAccount: string().min(1).required(),
            });
            
            // parse and assert validity
            const user = await userSchema.validate({
                ...input,
                MyAccount,
                GuestAccount
            });
            
        } catch (error: any) {
            console.log(error)
            Toast.show({
                type: "error",
                text1: "Input validation",
                text2: error?.message
            });
            return ;
        }


        // show confirmation button sheet
        setVisible(true)
    }

    const showSuccessMessage = ()=>{
        setVisible(false);
        updateLoaderCoverState(true, dispatch)

        setTimeout(()=>{
            updateLoaderCoverState(false, dispatch)
            Toast.show({
                type: "success",
                text1: "Transaction Successful"
            });

            setInput({
                account_name: "",
                amount: "",
                narration: "",
                pin: "",
                account_number: "",
            });
            
            setGuestAccount(undefined);
            setMyAccount(undefined);
        }, 3500);
    }

    const showFailedeMessage = ()=>{
        setVisible(false);
        updateLoaderCoverState(true, dispatch)

        setTimeout(()=>{
            updateLoaderCoverState(false, dispatch)
            Toast.show({
                type: "error",
                text1: "Transaction Failed",
                text2: "Please try again later"
            });

            setInput({
                account_name: "",
                amount: "",
                narration: "",
                pin: "",
                account_number: "",
            });
            
            setGuestAccount(undefined);
            setMyAccount(undefined);
        }, 3500);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
            <Header title='Fund Transfer' />
            <Text>{'\n'}</Text>

            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView>

                    
                    <AppDropDown
                        placeholder='Select My Account To Debit'
                        list={[
                            {
                                label: "GTBANK",
                                value: "gtbank",
                                },
                                {
                                label: "KUDA BANK",
                                value: "kuda",
                                },
                                {
                                label: "PiggyVest",
                                value: "piggyvest",
                                },
                        ]}
                        setShowDropDown={setShowDropDownMyAccount}
                        showDropDown={showDropDownMyAccount}
                        setValue={setMyAccount}
                        value={MyAccount}
                        />

                    <AppDropDown
                        placeholder='Select User Account To Credit Bank'
                        list={[
                            {
                                label: "GTBANK",
                                value: "gtbank",
                                },
                                {
                                label: "KUDA BANK",
                                value: "kuda",
                                },
                                {
                                label: "PiggyVest",
                                value: "piggyvest",
                                },
                        ]}
                        setShowDropDown={setShowDropDownGuestAccount}
                        showDropDown={showDropDownGuestAccount}
                        setValue={setGuestAccount}
                        value={GuestAccount}
                        />

                    <TextInput maxLength={10} value={input.account_number} onChangeText={val => setInput({...input, account_number: val})} style={{ backgroundColor: 'white' }} placeholder='Enter Amount' keyboardType='number-pad' label={"Account Number"} mode='outlined' />
                    <Text>{' '}</Text>
                    <TextInput disabled value={input.account_name} style={{ backgroundColor: 'white' }} placeholder='Enter Amount' keyboardType='number-pad' label={"Account Holder Name"} mode='outlined' />
                    <Text>{' '}</Text>
                    <TextInput value={input.amount} onChangeText={val => setInput({...input, amount: (val.replace(",", "").replace(",", "")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})} style={{ backgroundColor: 'white' }} placeholder='Enter Amount' keyboardType='number-pad' label={"Amount"} mode='outlined' />
                    <Text>{' '}</Text>
                    <TextInput value={input.narration} onChangeText={val => setInput({...input, narration: val})} style={{ backgroundColor: 'white' }} placeholder='Enter Narration' label={"Narration"} mode='outlined' />
                    <Text>{' '}</Text>
                    <TextInput maxLength={4} secureTextEntry value={input.pin} onChangeText={val => setInput({...input, pin: val})} style={{ backgroundColor: 'white' }} placeholder='Enter Pin' keyboardType='number-pad' label={"Pin"} mode='outlined' />
                    <Text>{' '}</Text>


                    <Button onPress={()=> processT1()}>Proceed Transaction</Button>
                </KeyboardAvoidingView>
            </ScrollView>

            {/* confirmation modal */}

            {
                visible && 
                <BottomSheet
                    ref={(ref: any) => {
                        RBSheetRef.current = ref;
                    }}
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                //   snapPoints={['92%', '60%']}
                    snapPoints={[deviceHeight * 0.60]}
                    enableOverDrag
                    enablePanDownToClose
                    onClose={()=> setVisible(false)}
                >
                    <View style={{ flex: 1, position: 'relative' }}>
                        <Text variant='headlineLarge' style={{ textAlign: 'center' }}>Confirmation</Text>

                        <DataTable>
                            <DataTable.Row>
                                <DataTable.Cell>FROM </DataTable.Cell>
                                <DataTable.Cell numeric>My {MyAccount}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>To </DataTable.Cell>
                                <DataTable.Cell numeric>{GuestAccount}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>Receiving Account </DataTable.Cell>
                                <DataTable.Cell numeric>{input.account_number}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>Receiver  </DataTable.Cell>
                                <DataTable.Cell numeric>{input.account_name}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>Amount </DataTable.Cell>
                                <DataTable.Cell numeric>₦ {input.amount}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>Narration </DataTable.Cell>
                                <DataTable.Cell numeric>{input.narration}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        <View style={{ flexDirection: 'row',justifyContent: 'space-evenly', marginTop: 14, alignItems: 'center' }}>
                            <Button onPress={()=> showSuccessMessage()} mode='outlined'>Proceed-Success</Button>
                            <Button onPress={()=> showFailedeMessage()} mode='outlined'>Proceed-Failure</Button>
                        </View>
                    </View>

                </BottomSheet>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    }
})

export default FundTransfer