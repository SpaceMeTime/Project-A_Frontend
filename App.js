import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Pressable, Text, View, TouchableOpacity, StatusBar,TextInput, ScrollView, AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { createStackNavigator } from '@react-navigation/stack';

// swiper import
import Swiper from 'react-native-swiper';
// checkbox import
import CheckBox from '@react-native-community/checkbox';
import { theme } from "./color";

import Alarm  from "./alarm";


// 홈화면
function HomeScreen() {

  const screenlist=[{
    title:'늦었을때가 정말 늦었다',
    des:'1'
  },{
    title:'just do it',
    des:'2'
  },{
    title:'호호',
    des:'3'
  },{
    title:'yes4',
    des:'123'
  },]

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
        justifyContent:"center"
      },
      
      modalLike: {
        // 글씨 가로 배열 css
        flexDirection: "row",
        textAlign:"center",
      },
    }
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Swiper style={styles.wrapper} showsButtons loop={false}>

      {/* 첫번째 슬라이드 페이지 */}
      {screenlist.map(e=>{
        return (
          <View testID="Hello" style={styles.slide1}>
          <View style={styles.centeredView}>
            <Modal
              animationType="none"
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
              <Text style={styles.text}>{e.title}{e.des}</Text>
            </Pressable>
          </View>
        </View>
        )
      })}
    </Swiper>



  );
}

// 찜한명언
function LikesScreen() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text === ""){
      return;
    } 
    const newToDos = {
      ...toDos,
      [Date.now()]: {text, working}, 
    } 
    setToDos(newToDos);
    setText("");
  };
  const deleteToDo = async(key) => {
    Alert.alert("명언 삭제", "명언을 삭제하시겠습니까?", [
      {text: "취소"},
      {text: "확인", 
      style: "destructive",
      onPress: async () => { const newToDos = {...toDos}
      delete newToDos[key]
      setToDos(newToDos);
      await saveToDos(newToDos);}
      }
    ]);

    
  }

  var styles={
    CheckBox: {
      flexDirection:"row",
      backgroundColor:"white",
      borderRadius:5,
      marginTop:"5%",
      marginLeft:"5%",
      width:"90%"
    },
    container: {
      flex: 1,
      backgroundColor:theme.bg,
      paddingHorizontal: 20,
    },
    header: {
      justifyContent:"space-between",
      flexDirection:"row",
      marginTop: 100
    },
    btnText: {
      fontSize:44,
      fontWeight:"600",
    },
    input : {
      backgroundColor: "white",
      paddingVertical: 15,
      paddingHorizontal:20,
      borderRadius: 30,
      marginVertical: 20,
      fontSize: 18,
    },
    toDo: {
      backgroundColor:theme.toDoBg,
      marginBottom:10,
      paddingVertical:20,
      paddingHorizontal:20,
      borderRadius:15,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"

    },
    toDoText:{
      color:"black",
      fontSize:16,
      fontWeight:"500",
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
        <Text style={{...styles.btnText, color: working ? "white": theme.grey}}>work</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnText, color: !working ? "white": theme.grey}}>travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text} 
        keyboardType="number-pad"
        placeholder={working ? "Add a To Do": "where do you want to go?"} style={styles.input}/>

        <ScrollView>
          {Object.keys(toDos).map((key) => (
            <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
            <TouchableOpacity onPress={() => deleteToDo(key)}>
            <Text>❌</Text>
            </TouchableOpacity>
 
          </View>
          )
          )}
        </ScrollView>

    </View>

    // <View style={styles.CheckBox}>
    //   <Text style={{fontWeight:"bold", marginRight:5}}>용기{"\n"}재산은 많이 잃은 사람은 많이 잃은 것이고,</Text>
      
    //   <CheckBox
    //   tintColor="yellow"
    //   onFillColor="yellow"
    //   onTintColor="yellow"
    //   onCheckColor="yellow"
    //   disabled={false}
    //   value={toggleCheckBox}
    //   onValueChange={(newValue) => setToggleCheckBox(newValue)}
    // />
    // </View>
    
  )
}

// 설정
function SettingsScreen({navigation}) {
  var styles = {
    buttonStyles: {
      borderRadius:10,
      backgroundColor:'white',
      marginTop:'5%',
      padding:'5%',
      margin:'5%',
    },

  }
  return (
    
    <View>
      <View style={styles.buttonStyles}>
        <TouchableOpacity onPress={()=> navigation.navigate("Alarm")}>
            <Text style={{fontSize:16}}>알람설정</Text>
        </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.buttonStyles}>
          <Text style={{fontSize:16}}>테마설정</Text>
    </TouchableOpacity>
    </View>
 
  );
}


// 하단바 선언
const Tab = createBottomTabNavigator();

// 화면전환 선언
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="찜한명언" component={LikesScreen} />
      <Tab.Screen name="설정" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="alarm"
          component={Alarm}
        />
      </Stack.Navigator>


  );
};


export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      
      <MyStack />
    </NavigationContainer>
  );
}