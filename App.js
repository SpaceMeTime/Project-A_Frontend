import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Pressable, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// swiper import
import Swiper from 'react-native-swiper'

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // css값 설정
  var styles = {
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    // 글씨 가로 배열 css
    modalLike: {
      flexDirection: "row",
    }
  }

  return (
    <Swiper style={styles.wrapper} showsButtons loop={false}>

      {/* 첫번째 슬라이드 페이지 */}
      <View testID="Hello" style={styles.slide1}>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={styles.modalLike}>
                <Text style={styles.modalText}>공유 </Text>
                <Text style={styles.modalText}>복사 </Text>
                <Text style={styles.modalText}>좋아요 </Text>
              </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>닫기</Text>
                </Pressable>
            </View>
          </View>
        </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.text}>늦었을때가 제일 늦었다.</Text>
          </Pressable>
        </View>
      </View>

      <View testID="Beautiful" style={styles.slide2}>
        <Text style={styles.text}>Just do it.</Text>
      </View>
      <View testID="Simple" style={styles.slide3}>
        <Text style={styles.text}>나나나나나</Text>
      </View>
    </Swiper>
  );
}

function LikesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Likes!</Text>
    </View>
    
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}