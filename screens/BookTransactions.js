import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        scannedBookId: '',
        scannedStudentId: '',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state
    if (buttonState === "BookId") { 
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal'
      });
    }
    else if (buttonState === "StudentId") {
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal'
      });
    }
      
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>

            <Image source={ require('../assets/booklogo.jpg')}
              style={{width: 400, height: 400}} />
              <Text> Willy App </Text>
              
            </View>
            



             
            <View  style={styles.InputView}>
              <TextInput
              style = { styles.InputBox}
              placeholder = "Book ID"
              value={this.state.scannedBookId}
                />
              <TouchableOpacity style={styles.scanButton}
                onPress={() => { 
                this.getCameraPermissions("BookId")
              }}
              >
                <Text style={styles.buttonText}>SCAN</Text>
              </TouchableOpacity>
            
               </View>

               <View  style={styles.InputView}>
              <TextInput
              style = { styles.InputBox}
              placeholder = "Student ID"
              value={this.state.scannedStudentId}
                />
              <TouchableOpacity style={styles.scanButton}
               onPress={() => { 
                this.getCameraPermissions("StudentId")
              }}
              >
                <Text style={styles.buttonText}>SCAN</Text>
              </TouchableOpacity>
            
               </View>


        
         
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
     
    },
    buttonText:{
      fontSize: 20,
    },
    InputView: {
      flexDirection : 'row'
    },
    InputBox: {
      borderWidth: 1.5,
      width: 200,
      height: 40,
fontSize: 20
    }
  });