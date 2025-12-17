import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appTheme } from "../utilities/theme.colors";


export default function Index() {
  return (
    <SafeAreaView style={styles.wrapper}>
        <View><Link href="/(tabs)/alphabets"><Text style={styles.header}>READ APP</Text></Link></View>
        <View style={styles.content}>
          <Link href="/(tabs)/alphabets">
            <Image
              source={require("../assets/images/game.png")}
              style={styles.img}
            
            />
          </Link>
          <Text style={styles.introText}>Ready to learn? Read App makes essential learning simple and fun. Designed for kids, it’s a complete curriculum that covers the alphabet, numbers, and quick mastery of first words and sentences. Give your child the perfect start to their academic adventure!</Text>
        </View>
        <View>
          <Link href="/(tabs)/alphabets">
            <View  style={styles.link}>
                <Text style={{fontSize:27,color:appTheme.navy,fontFamily:"Chocolate Bar Demo",fontWeight:800}}>Get Started</Text>
                
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
    backgroundColor:appTheme.orange,
    borderRadius:10,
    width:290,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    

  }
})
