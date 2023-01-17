import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ProgressCircle from './RecordButton';

const App = () => {
  const [photoClicked, setPhotoClicked] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoStopped, setVideoStopped] = useState(false);

  return (
    <SafeAreaView style={styles.safeareaStyle}>
      <Text style={styles.textStyle}>Image Captured {photoClicked && '✔'}</Text>
      <Text style={styles.textStyle}>
        Video Recording Started {videoStarted && '✔'}
      </Text>
      <Text style={styles.textStyle}>
        Video Recording Stopped after user released {videoStopped && '✔'}
      </Text>
      <ProgressCircle
        size={120}
        duration={5000}
        customStyles={{innerStyle: {}, outerStyle: {}}}
        onImageClick={() => {
          setPhotoClicked(true);
          console.log('image clicked');
        }}
        onVideoStart={() => {
          setVideoStarted(true);
          console.log('video started');
        }}
        onVideoStop={() => {
          setVideoStopped(true);
          console.log('video stopped');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  textStyle: {textAlign: 'center', marginBottom: hp(3)},
});

export default App;
