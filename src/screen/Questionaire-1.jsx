import React, { useState } from 'react';
import { Text, TouchableOpacity,View, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const options = [
  "Finding the best deal",
  "Comparing prices across stores",
  "Saving money"
];

 const QuestionnaireScreen1 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const navigation=useNavigation()

  const handleSelect = (index) => {
    setSelectedOption(index);
    setSelectedText(options[index])
  };

  const handleNext = async () => {

    if (!selectedText) {
      Alert.alert("Selection Required", "Please select an option before continuing.");
      return;
    }
    
    navigation.navigate('QuestionnaireScreen2', {reason:selectedText})
  };

  return (
    <ScrollView style={styles.container}  contentContainerStyle={{ paddingBottom: 20, display:'flex',
      justifyContent:'space-between',flex:1 }}>
      <View>

      <Text style={styles.question}>What brings you to Price Peeps?</Text>
      <Text style={styles.subtitle}>We’re excited to learn more about you! Help us personalize your experience.</Text>

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

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default QuestionnaireScreen1
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F9',
    paddingHorizontal: 20,
    paddingVertical: 80,
    flex:1
    // flexDirection:'row'
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
    backgroundColor:'#DB3022',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
