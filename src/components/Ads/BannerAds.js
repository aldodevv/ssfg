import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const BannerAds = ({size = 'FULL_BANNER'}) => {
  //SIZE = "BANNER", "FULL_BANNER", "LARGE_BANNER", "ANCHORED_ADAPTIVE_BANNER",  "INLINE_ADAPTIVE_BANNER", "FLUID", "WIDE_SKYSCRAPER"
  // const adUnitId = TestIds.BANNER;
  const adUnitIdBanner = 'ca-app-pub-4341536909510521/8853140977';

  return <BannerAd unitId={adUnitIdBanner} size={size} />;
};

export default BannerAds;
