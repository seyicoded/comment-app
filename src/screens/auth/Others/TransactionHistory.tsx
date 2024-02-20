import { View, StatusBar, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../constants/color/color'
import Header from '../../../components/headers/Header'
import { Avatar, Button, List, Modal, Portal, Text } from 'react-native-paper'
import AppDropDown from '../../../components/dropdown/AppDropDown'
import { DUMMY_TRANSACTION } from '../../../constants/data/transaction'
import moment from 'moment'

type Props = {}

const TransactionHistory = (props: Props) => {

    const [isFiltering, setIsFiltering] = React.useState(false);
    const [Refresh, setRefresh] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const [showDropDownOrder, setShowDropDownOrder] = useState(false);
    const [Order, setOrder] = useState("dsc");
    const [showDropDownSorter, setShowDropDownSorter] = useState(false);
    const [Sorter, setSorter] = useState("date");

    const [processedData, setProcessedData] = useState(DUMMY_TRANSACTION)

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(()=>{
        console.log(isFiltering)
        if(!isFiltering){
            setProcessedData(DUMMY_TRANSACTION)
        }else{
            if(Sorter == 'amount'){
                const r = DUMMY_TRANSACTION.sort( (a, b) =>{
                    if(Order == 'dsc'){
                        return (b.amount - a.amount)
                    }else{
                        return (a.amount - b.amount)
                    }
                } );

                console.log(r, Order, Sorter, "rrr");
                setProcessedData([])
                setTimeout(()=>{
                    setProcessedData(r)
                }, 100)
            }
            if(Sorter == 'date'){
                const r = DUMMY_TRANSACTION.sort( (a, b) =>{
                    if(Order == 'dsc'){
                        return ((new Date(b.date)).getTime() - (new Date(a.date)).getTime())
                    }else{
                        return ((new Date(a.date)).getTime() - (new Date(b.date)).getTime())
                    }
                } );

                console.log(r, Order, Sorter, "rrr");
                setProcessedData([])
                setTimeout(()=>{
                    setProcessedData(r)
                }, 100)
            }
            if(Sorter == 'type'){
                const r = DUMMY_TRANSACTION.sort( (a, b) =>{
                    if(Order == 'dsc'){
                        return (b.type > a.type) ? 1 : -1
                    }else{
                        return (a.type < b.type) ? -1 : 1
                    }
                } );

                console.log(r, Order, Sorter, "rrr");
                setProcessedData([])
                setTimeout(()=>{
                    setProcessedData(r)
                }, 100)
            }
        }
    }, [isFiltering, Refresh])
    
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
                <Header onFilterClick={()=> showModal()} hasFilter={true} title='Transaction History' />

                <View style={{ flex: 1, paddingTop: 20 }}>

                    <FlatList
                        data={processedData}
                        renderItem={({index, item})=> (
                            <List.Item
                                title={`${item?.title} #${item.id}`}
                                key={index}
                                descriptionStyle={{ fontSize: 11, marginTop: 3 }}
                                description={moment(item.date).calendar()}
                                // left={props => <List.Icon {...props} icon="folder" />}
                                left={props => <Avatar.Text size={54} label='SE' />}
                                right={props => <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: item.type == 'credit' ? 'green' : 'red', fontSize: 11, fontWeight: '700' }}>{`${item.type == 'credit' ? '+' : '-'}${item.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                                </View>}
                            />
                        )} />
                </View>

                {/* modal */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, marginHorizontal: 40, borderRadius: 9}}>
                        <Text variant='headlineMedium'>Filter By</Text>

                        <AppDropDown
                            placeholder='Direction'
                            list={[
                                {
                                    label: "Ascending Order",
                                    value: "asc",
                                  },
                                  {
                                    label: "Descending Order",
                                    value: "dsc",
                                  },
                            ]}
                            setShowDropDown={setShowDropDownOrder}
                            showDropDown={showDropDownOrder}
                            setValue={setOrder}
                            value={Order}
                             />
                        <AppDropDown
                            placeholder='Type'
                            list={[
                                {
                                    label: "Amount",
                                    value: "amount",
                                  },
                                  {
                                    label: "Date",
                                    value: "date",
                                  },
                                  {
                                    label: "Transaction Type",
                                    value: "type",
                                  },
                            ]}
                            setShowDropDown={setShowDropDownSorter}
                            showDropDown={showDropDownSorter}
                            setValue={setSorter}
                            value={Sorter}
                             />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button onPress={()=>{ setRefresh(!Refresh); setVisible(false); setIsFiltering(false)}}>Clear</Button>
                            <Button onPress={()=>{ setRefresh(!Refresh); setVisible(false); setIsFiltering(true)}}>Filter</Button>
                        </View>
                    </Modal>
                </Portal>
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

export default TransactionHistory