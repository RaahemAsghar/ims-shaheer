import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import ClientUpdateModal from "./ClientUpdateModal";
import ClientPaymentModal from "./ClientPaymentModal"


const ClientDetailModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = React.useState(false);
  
  console.log('hete', Dimensions.get('window').width)
  useEffect(() => {
    setModalVisible(props.state);
  }, [props.state]);

  const handleCloseUpdate = ()=>{
    //props.handleClose()
    setUpdateModalVisible(false)
  }

  const handleClosePayment = ()=>{
    //props.handleClose()
    setPaymentModalVisible(!isPaymentModalVisible)
  }

  function handleClose() {
    setModalVisible(false);
  }

  


  return (
    
    <View style={styles.centeredView}>
        <ClientPaymentModal state={isPaymentModalVisible} initialModalClose={props.handleClose}  handleClose={handleClosePayment} title='Manage Payments' getClients={props.getClients} object={props.object} />
        <ClientUpdateModal state={isUpdateModalVisible} handleClose={handleCloseUpdate} title='Update Client Information' getClients={props.getClients} object={props.object} />
        <Modal
            animationType="slide"
            transparent={true}
            swipeDirection="left"
            visible={modalVisible}
            onSwipeComplete={() => props.handleClose()}
            onRequestClose={() => {
            props.handleClose();
            }}
        > 
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{props.title}</Text>
              <ScrollView>
                <View style={styles.modalBody}>
                  {props.object !== [] && (<View><Text style={styles.bodyText}>Client Name: {props.object.userName}</Text>
                    <Text style={styles.bodyText}>Balance: {props.object.balance}</Text>
                    <Text style={styles.bodyText}>Phone Number: {props.object.phone}</Text>
                    <Text style={styles.bodyText}>Date Added: {props.object.date}</Text>
                    </View>)}
                </View>
              </ScrollView>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems : 'center',}}>
                    <TouchableOpacity onPress = {() => {props.handleClose(), props.navigator.navigate({routeName: 'ClientSaleDetail', params: { clientID: props.object._id }})}}>
                            <View style={styles.backButtonModalContainer}>
                                <Text style={styles.buttonModalText}>Sales</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => {props.handleClose(), props.navigator.navigate({routeName: 'ClientPurchaseDetail', params: { clientID: props.object._id }})}}>
                            <View style={styles.backButtonModalContainer}>
                                <Text style={styles.buttonModalText}>Purchases</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => {setPaymentModalVisible(true)}}>
                            <View style={styles.backButtonModalContainer}>
                                <Text style={styles.buttonModalText}>Payments</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems : 'center'}}>
                        <TouchableOpacity onPress={() => props.handleClose()}>
                            <View style={styles.buttonModalContainer}>
                                <Text style={styles.buttonModalText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => {setUpdateModalVisible(true)}}>
                            <View style={styles.backButtonModalContainer}>
                                <Text style={styles.buttonModalText}>Update</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            
            </View>
        </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'Roboto',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 24 : 18): 14,
    paddingTop: Dimensions.get('window').height > 900 ? 25 : 16
  },  
  modalTitle : {
    color: '#006270',
    //fontSize: Dimensions.get('window').height > 900 ? 30 : 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 28 : 21): 24,
    top: 15,
  },
  //Dimensions.get('window').height < 900 ? Dimensions.get('window').height * 0.11 : Dimensions.get('window').height * 0.1
  buttonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 20,
    margin: 10,
    display: 'flex',

  },
  backButtonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 20,
    margin: 10,
    display: 'flex',
    
  },
  buttonModalContainer2 : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    margin: 10,
    display: 'flex',
    top: Dimensions.get('window').height > 900 ? 35 : 20,

  },
  backButtonModalContainer2 : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    margin: 10,
    display: 'flex',
    top: Dimensions.get('window').height > 900 ? 35 : 20,
    
  },
  deleteButtonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 15,
    margin: 20,
    display: 'flex',
    
  },
  buttonModalText :{
    color: '#ffffff',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 24 : 16): 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalBody:{
    paddingVertical:'30%',
    paddingHorizontal:10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').height > 900 ? '80%' : '95%',
    height: Dimensions.get('window').height > 900 ? '65%' : Dimensions.get('window').height * 0.60
  },
  
});

export default ClientDetailModal;