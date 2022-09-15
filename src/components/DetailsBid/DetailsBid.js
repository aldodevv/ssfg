import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {EthPrice} from '../SubInfo/SubInfo';
import {COLORS, SIZES, FONTS} from '../../constants';
import MobileAds, {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';

// const adUnitId = TestIds.REWARDED;
const adUnitIdReward = 'ca-app-pub-4341536909510521/8957330177';

const rewarded = RewardedAd.createForAdRequest(adUnitIdReward, {
  requestNonPersonalizedAdsOnly: true,
});

const DetailsBid = ({bid, handlePress}) => {
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

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // // No advert ready to show yet
  // if (!played) {
  //   return null;
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        rewarded.show();
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.base,
        }}
        key={bid.id}>
        <Image
          source={bid.image}
          resizeMode="contain"
          style={{width: 48, height: 48}}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: SIZES.base,
          }}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.small,
              color: COLORS.primary,
            }}>
            Bid placed by {bid.name}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.small - 2,
              color: COLORS.secondary,
              marginTop: 3,
            }}>
            {bid.date}
          </Text>
        </View>

        <EthPrice price={bid.price} />
      </View>
    </TouchableOpacity>
  );
};

export default DetailsBid;
