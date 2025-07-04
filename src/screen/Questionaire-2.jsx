import React, { useState } from 'react';
import {  Text, View, TouchableOpacity, Alert,ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { request } = useApi();

const options = [
  "Social media (Facebook, Instagram, etc.)",
  "Word of mouth (friends, family, etc.)",
  "Online ads (Google, banners, etc.)",
  "Blog or review site",
  "Search engine (Google, Bing, etc.)",
];

const QuestionnaireScreen2 = () => {

  const route = useRoute();
  const { reason } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const navigation=useNavigation()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelect = (index) => {
    setSelectedOption(index);
    setSelectedText(options[index])
  };

  
    const handleNext = async () => {
  
      if (!selectedText) {
        Alert.alert("Selection Required", "Please select an option before continuing.");
        return;
      }
      
      setLoading(true); 

      try {
        const userId = await AsyncStorage.getItem('user_id');
        const { status, data } = await request('/onboarding', 'POST', { user_id:userId, reason_for_using: reason, how_heard_about: selectedText });
        console.log(status);
        console.log(data);
        if (status === 201) {
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          navigation.replace('Home')
        }else{
          setError(data.error || 'questionnire failed');
        }
      }catch(err){
        setError('Something went wrong');
      }finally{
        setLoading(false); 
      }
    };
  
  return (
    
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20, display:'flex',
      justifyContent:'space-between',flex:1 }}>
        <View>

          <Text style={styles.question}>How did you hear about us?</Text>
          <Text style={styles.subtitle}>We’d love to know how you found Price Peeps!</Text>
          
            {error && <Text style={{
                  color:'red',
                  textAlign:'center'
                }}>{error}</Text>}

          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === index && styles.optionSelected
              ]}
              onPress={() => handleSelect(index)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === index && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      {/* <TouchableOpacity
        style={[
          styles.option,
          selectedOption === options.length && styles.optionSelected
        ]}
        onPress={() => handleSelect(options.length)}
      >
        <Text style={[
          styles.optionText,
          selectedOption === options.length && styles.optionTextSelected
        ]}>
          Other
        </Text>
      </TouchableOpacity> */}

      {/* {selectedOption === options.length && (
        <TextInput
          placeholder="Please specify..."
          placeholderTextColor="#999"
          style={styles.input}
          value={otherText}
          onChangeText={setOtherText}
        />
      )} */}
      {loading ? (
        <ActivityIndicator color="#DB3022" size={30} style={{marginTop:'auto'}}/> 
            ) : (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

export default QuestionnaireScreen2

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF9F9',
        paddingHorizontal: 20,
        paddingTop: 80,
        flex:1
        },
        question: {
            fontSize: 30,
            fontWeight: '900',
            color: '#1E1E1E',
            marginBottom: 10,
          },
          subtitle: {
            fontSize: 16,
            color: '#1E1E1E',
            marginBottom: 50,
          },
          option: {
            borderWidth: 1,
            borderColor: '#1E1E1E',
            borderRadius: 10,
            padding: 15,
            marginBottom: 12,
          },
          optionSelected: {
            backgroundColor: '#1E1E1E',
          },
          optionText: {
            color: '#1E1E1E',
            fontSize: 16,
          },
          optionTextSelected: {
            color: '#FFFFFF',
          },
          input: {
            borderColor: '#1E1E1E',
            borderWidth: 1,
            borderRadius: 10,
            padding: 12,
            fontSize: 16,
            color: '#1E1E1E',
            marginTop: 10,
            marginBottom: 20,
          },
          nextButton: {
            padding:15,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20,
            marginTop:'auto',
            backgroundColor:'#DB3022',
            marginBottom: 30,  
          },
          nextButtonText: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
        });
        