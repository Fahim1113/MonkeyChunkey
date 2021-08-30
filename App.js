import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb.js';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <SafeAreaView
            style={{
              marginTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
          />
          <Header
            backgroundColor={'#9c8210'}
            centerComponent={{
              text: 'Monkey Chunky',
              style: { color: '#fff', fontSize: 20 },
            }}
          />
          <Image
            style={styles.imageIcon}
            source={{
              uri:
                'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Type the word here it does not matter how long it is"
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim()
            db[word] ? (
              this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones })
            ):
            Alert.alert('The word does not exist in the database.')
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
          <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    height: 40,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    borderRadius: 20
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
});
