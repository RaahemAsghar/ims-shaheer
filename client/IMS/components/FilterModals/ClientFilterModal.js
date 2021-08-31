import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from 'react-redux'
import { setPurchaseClient, resetPurchaseClient, removePurchaseClient } from '../../actions/purchaseFilters'
import { setSaleClient, resetSaleClient, removeSaleClient} from "../../actions/saleFilters";
const ClientFilterModal = props => {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(props.state);

    }, [props.state]);


    const setFilterClient = (record, i) => {
        if(props.title === "purchase"){
            if (props.clientFilter.indexOf(record._id) === -1) {
                props.setPurchaseClient(record._id)
            }
            else {
                props.removePurchaseClient(record._id)
                
            }
        }
        else if(props.title === "sale"){
            if (props.saleClientFilter.indexOf(record._id) === -1) {
                props.setSaleClient(record._id)
            }
            else {
                props.removeSaleClient(record._id)
                
            }
        }
        
    }

    const clearFilterClient = () => {
        if(props.title === "purchase"){
            props.resetPurchaseClient()
        }
        else if(props.title === "sale"){
            props.resetSaleClient()
        }
    }

    function handleClose() {
        setModalVisible(false);
    }

    const showClients = () => {
        if (props.object !== [] && props.object !== undefined) {
            return (
                <View>
                    {props.object.map((record, i) => (
                        <View key = {i}>

                            <TouchableOpacity style={styles.TextBox} onPress={() => setFilterClient(record, i)}>
                                <View style={{ paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                {record.userName}
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <View style={styles.sideText}>
                                                {props.title === "purchase" && props.clientFilter.indexOf(record._id) !== -1 ? (<FontAwesome
                                                    name={"check"}
                                                    size={Dimensions.get('window').height > 900 ? 40 : 25}
                                                    color={"#008394"}
                                                />
                                                ) : (null)}
                                                {props.title === "sale" && props.saleClientFilter.indexOf(record._id) !== -1 ? (<FontAwesome
                                                    name={"check"}
                                                    size={Dimensions.get('window').height > 900 ? 40 : 25}
                                                    color={"#008394"}
                                                />
                                                ) : (null)}

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>



                        </View>
                    ))}
                </View>
            )
        }
    }


    return (

        <View style={styles.centeredView}>
            <Modal
                // animationType="fade"
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="left"
                presentationStyle="overFullScreen"
                transparent
                visible={modalVisible}>
                    <TouchableWithoutFeedback onPress={() => props.handleClose()}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalStyle}>

                        <View style={styles.topTextBox}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginTop: Dimensions.get('window').height * 0.03 }}>
                                <TouchableOpacity onPress={() => props.handleClose()} style={{  paddingLeft: '5%',marginTop: 5 }}>
                                    <FontAwesome
                                        name={"arrow-left"}
                                        size={Dimensions.get('window').height > 900 ? 40 : 25}
                                        color={"#008394"}
                                    />
                                </TouchableOpacity>

                                <View style={{ justifyContent: 'center', alignItems: 'flex-start',  }}>

                                    <Text style={styles.topText}>
                                        Clients
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                    <TouchableOpacity onPress={() => clearFilterClient()}>
                                        <View style={styles.clearButton}>
                                            <Text style={styles.clearButtonText}>
                                                Clear
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>

                        <ScrollView>
                            <View> 
                        {
                            showClients()
                        }
                            </View>
                        </ScrollView>


                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: "#fff",
        width: '80%',
        height: '100%',
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderColor: "#008394",
    },
    topText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height > 900 ? 36 : 24,
        color: "#008394",
    },
    normalText: {
        fontSize: Dimensions.get('window').height > 900 ? 26 : 18,
        fontWeight: '600',
        color: "#008394",

    },
    sideText: {
        textAlign: 'right',
        alignItems: 'flex-end',
        flexDirection: 'row',
        ///alignSelf: 'flex-end',
        //alignItems: 'flex-end',
        // marginLeft: '65%',
    },
    topTextBox: {
        width: '100%',
        height: '10%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 22,
        shadowRadius: 10,
        elevation: 10,
    },
    TextBox: {
        width: '100%',
        padding: 20,
        // height: '22%',
        shadowColor: '#000000',
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
        marginTop: 1,
    },
    bottomBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D3D3D3',
        alignItems: 'center',

    },
    bottomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00E0C7',
        width: '100%',
        // marginTop: '40%',
        height: Dimensions.get('window').height * 0.08,
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: "#008394"

    },
    footerText: {
        fontSize: Dimensions.get('window').height > 900 ? 36 : 22,
        fontWeight: 'bold',
        color: "#008394",

    },
    clearButtonText: {
        fontSize: Dimensions.get('window').height > 900 ? 26 : 16,
        fontWeight: 'bold',
        color: "#008394",
    },
    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00E0C7',
        width: Dimensions.get('window').height > 900 ? 100 : 70,
        height: Dimensions.get('window').height > 900 ? 50 : 30,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#008394",
        marginTop: Dimensions.get('window').height > 900 ? 30 : 0,
        // left: Dimensions.get('window').width * 0.4,

    },
    sliderDummy: {
        backgroundColor: '#d3d3d3',
        width: 300,
        height: 30,
        borderRadius: 50,
        position: 'absolute',
    },
    sliderReal: {
        backgroundColor: '#119EC2',
        // width: {(amountVal/50) * 300},
        height: 30,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

});


const mapStateToProps = (state) => {
    // console.log(state.purchaseFilters)
    return {
        clientFilter: state.purchaseFilters.client,
        saleClientFilter: state.saleFilters.client,
    }
}

export default connect(mapStateToProps, { setPurchaseClient, resetPurchaseClient, removePurchaseClient, setSaleClient, resetSaleClient, removeSaleClient })(ClientFilterModal);