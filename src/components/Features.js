import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  scrollView: {
    height: hp(60),
  },
  featureContainer1: {
    backgroundColor: 'lightgreen',
    padding: hp(2),
    borderRadius: 30, 
    marginBottom: hp(2), 
  },
  featureContainer2: {
    backgroundColor: 'pink',
    padding: hp(2),
    borderRadius: 30, 
    marginBottom: hp(2), 
  },
  featureContainer3: {
    backgroundColor: 'lightblue',
    padding: hp(2),
    borderRadius: 30, 
    marginBottom: hp(2), 
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1), 
  },
  featureImage: {
    height: hp(4),
    width: hp(4),
    borderRadius: hp(4) / 2, 
    marginRight: hp(1), 
  },
  featureText: {
    fontSize: wp(4.8),
    fontWeight: 'bold',
    color: 'gray', // Example text color
  },
  featureDescription: {
    fontSize: wp(3.8),
    color: 'black', 
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: wp(6.5),
    fontWeight: 'bold',
    color: 'black', 
  },
});


export default function Features() {
  return (
    <ScrollView
      style={styles.scrollView}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Features</Text>
      <View style={styles.featureContainer1}>
        <View style={styles.featureRow}>
          <Image
            source={require('../../assets/images/chatgptIcon.png')}
            style={styles.featureImage}
          />
          <Text style={styles.featureText}>ChatGPT</Text>
        </View>
        <Text style={styles.featureDescription}>
          ChatGPT can provide you with instant and knowledgeable responses,
          assist you with creative ideas on a wide range of topics.
        </Text>
      </View>
      <View style={styles.featureContainer2}>
        <View style={styles.featureRow}>
          <Image
            source={require('../../assets/images/dalleIcon.png')}
            style={styles.featureImage}
          />
          <Text style={styles.featureText}>DALL-E</Text>
        </View>
        <Text style={styles.featureDescription}>
          DALL-E can generate imaginative and diverse images from textual
          descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      <View style={styles.featureContainer3}>
        <View style={styles.featureRow}>
          <Image
            source={require('../../assets/images/smartaiIcon.png')}
            style={styles.featureImage}
          />
          <Text style={styles.featureText}>Smart AI</Text>
        </View>
        <Text style={styles.featureDescription}>
          A powerful voice assistant with the abilities of ChatGPT and Dall-E,
          providing you the best of both worlds.
        </Text>
      </View>
    </ScrollView>
  );
}
