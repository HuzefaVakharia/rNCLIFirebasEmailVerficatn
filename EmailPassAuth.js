//import liraries
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

// create a component
const EmailPassAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggedInData, setUserLoggedInData] = useState(null);
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(
          'User account created & signed in!' + JSON.stringify(res.user.email),
        );
        Alert.alert(
          'User account created & signed in with ID!' +
            JSON.stringify(res.user.email),
        );
        setUserLoggedInData(res);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const signUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(JSON.stringify(res));
        Alert.alert('User Logged In Successfully');
        setUserLoggedInData(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signOutUser = () => {
    auth()
      .signOut()
      .then(res => {
        console.log('User signed out!');
        Alert.alert('User signed out!');
      });
    setUserLoggedInData(null);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={txt => setEmail(txt)}
        value={email}
        placeholder="Enter Email"
      />
      <TextInput
        style={[
          styles.input,
          {
            marginTop: 20,
          },
        ]}
        onChangeText={txt => setPassword(txt)}
        value={password}
        placeholder="Enter Password"
      />

      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 20,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
        onPress={() => createUser()}>
        <Text style={{color: '#fff'}}>Create Account</Text>
      </TouchableOpacity>
      {userLoggedInData != null ? (
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            borderRadius: 20,
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
          onPress={() => signOutUser()}>
          <Text style={{color: '#fff'}}>SIGN OUT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            borderRadius: 20,
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
          onPress={() => signUser()}>
          <Text style={{color: '#fff'}}>SIGN IN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 20,
  },
});

//make this component available to the EmailPassAuth
export default EmailPassAuth;
