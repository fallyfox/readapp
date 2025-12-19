import { Link } from "expo-router";
import {  StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appTheme } from "../utilities/theme.colors";


export default function Index() {
  return (
    <SafeAreaView style={styles.wrapper}>
        <View>
          <Link href="/(tabs)/alphabets">
            <View  style={styles.link}>
                <Text style={{fontSize:27,color:"black",fontFamily:"Fontspring-DEMO-leyendo-bold",fontWeight:800}}>Get Started</Text>
                
            </View>
          </Link>
         
        </View>
         
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper:{
      flex: 1,
      justifyContent:"space-evenly",
      alignItems: "center",
      paddingBottom:20,
      backgroundColor:appTheme.siege
     
  },
  header:{
    fontFamily:"Chocolate Bar Demo",
    fontSize:30,
    color:appTheme.orange,

  },
  introText:{
    fontFamily:"Raleway-Regular",
    fontSize:24,
    color:appTheme.navy,
    marginHorizontal:13,
    textAlign:"center",
    letterSpacing:0.6,
  },
  img:{
    width:200,
    height:200,
    resizeMode:"contain",
    justifyContent:"center",
    alignItems:'center'

  },
  content:{
    justifyContent:"center",
    alignItems:"center"
  },
  link:{
    // padding:20,
    backgroundColor:appTheme.peach,
    borderRadius:10,
    width:290,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    

  }
})
