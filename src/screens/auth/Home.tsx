import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { Color } from '../../constants/color/color'
import DashboardHeader from '../../components/headers/DashboardHeader'
import { Button, Card, DataTable, Text } from 'react-native-paper'
import { Image } from 'react-native-animatable'
import { route } from '../../constants/route/route'
import { NavigationProp } from '@react-navigation/native'

type Props = {
    navigation: NavigationProp<any>
}

const Home = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={Color.PRIMARY} />
        <DashboardHeader />
        <View style={{ marginTop: 60, flex: 1 }}>
            <Card style={{ backgroundColor: Color.PRIMARY_BG, padding: 20 }}>
                <View style={{ backgroundColor: 'transparent' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image animation={"pulse"} easing="ease-out" iterationCount="infinite" duration={1000} source={require("../../assets/resources/head.png")} />

                        <Text style={{ color: 'rgba(255, 255, 255, 0.7)', marginVertical: 5 }}>Your available balance is</Text>
                        <Text variant='displayMedium' style={{ color: 'rgba(255, 255, 255, 1)', fontWeight: '700', marginVertical: 5 }}>₦20,000</Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 22, textAlign: 'center', marginVertical: 5 }}>By this time last year, you've spent slightly higher (₦22,192)</Text>
                    </View>
                    <DataTable>
                        <DataTable.Row>
                        <DataTable.Cell textStyle={{ color: 'white' }}>Kuda Bank</DataTable.Cell>
                            <DataTable.Cell textStyle={{ color: 'white' }} numeric>₦12,100.00</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{ color: 'white' }}>GTBank</DataTable.Cell>
                            <DataTable.Cell textStyle={{ color: 'white' }} numeric>₦6,100</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell textStyle={{ color: 'white' }}>PiggyVest</DataTable.Cell>
                            <DataTable.Cell textStyle={{ color: 'white' }} numeric>₦1,800</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Button labelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }} mode='outlined' onPress={()=> navigation.navigate(route.FUND_TRANSFER)}>Fund Transfer</Button>
                <Button labelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }} mode='outlined' onPress={()=> navigation.navigate(route.TRANSACTION_HISTORY)}>Billing History</Button>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY,
        padding: 20
    }
})

export default Home