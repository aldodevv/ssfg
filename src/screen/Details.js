import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';

import {COLORS, SIZES, assets, SHADOWS, FONTS} from '../constants';
import {
  CircleButton,
  RectButton,
  SubInfo,
  DetailsDesc,
  DetailsBid,
  FocusedStatusBar,
} from '../components';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';
import RNRestart from 'react-native-restart';
import {BannerAds} from '../components/Ads';

const DetailsHeader = ({data, navigation}) => (
  <View style={{width: '100%', height: 373}}>
    <Image
      source={data.image}
      resizeMode="cover"
      style={{width: '100%', height: '100%'}}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);

const Details = ({route, navigation}) => {
  const {data} = route.params;
  const adUnitIdInterstitial = 'ca-app-pub-4341536909510521/7156915927';
  // const adUnitId = TestIds.INTERSTITIAL;

  const {isLoaded, isClosed, load, show, isShowing} = useInterstitialAd(
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
      RNRestart.Restart();
    }
  }, [isClosed, navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
          zIndex: 1,
        }}>
        <RectButton
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
          handlePress={() => {
            show();
          }}
        />
      </View>

      <FlatList
        data={data.bids}
        renderItem={({item}) => <DetailsBid bid={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo />
            <BannerAds />

            <View style={{padding: SIZES.font}}>
              <DetailsDesc data={data} />

              {data.bids.length > 0 && (
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}>
                  Current Bid
                </Text>
              )}
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;
