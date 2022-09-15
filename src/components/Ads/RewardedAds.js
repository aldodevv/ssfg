import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

// const adUnitId = TestIds.REWARDED;
const adUnitIdReward = 'ca-app-pub-4341536909510521/8957330177';

const rewarded = RewardedAd.createForAdRequest(adUnitIdReward, {
  requestNonPersonalizedAdsOnly: true,
});

const RewardedAds = ({rewardEarn}) => {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setPlayed(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  if (!played) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        rewarded.show();
      }}>
      <Text>Play Rewarded</Text>
    </TouchableOpacity>
  );
};

export default RewardedAds;

const styles = StyleSheet.create({});
