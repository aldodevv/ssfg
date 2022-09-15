import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import RNRestart from 'react-native-restart';
// const adUnitId = TestIds.INTERSTITIAL;
const adUnitIdInterstitial = 'ca-app-pub-4341536909510521/7156915927';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
  requestNonPersonalizedAdsOnly: true,
});

const InterstitialAds = () => {
  const [played, setPlayed] = useState(false);
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    adUnitIdInterstitial,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);
  useEffect(() => {
    if (isClosed) {
      setTimeout(() => {
        RNRestart.Restart();
      }, 2000);
    }
  }, [isClosed]);

  //   useEffect(() => {
  //     const unsubscribe = interstitial.addAdEventListener(
  //       AdEventType.LOADED,
  //       () => {
  //         setPlayed(true);
  //       },
  //     );
  //     interstitial.load();
  //     return unsubscribe;
  //   }, []);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        show();
      }}>
      <Text>Play interstitial</Text>
    </TouchableOpacity>
  );
};

export default InterstitialAds;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
