import {Dimensions, PixelRatio} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const normalize = size => {
  const scale = screenWidth / 411; // Based on Nexus 5X scale
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const isStringEmpty = str => {
  return !str || str.length === 0;
};

const isObjectEmpty = obj => {
  if (obj == null) {
    return true;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }

  return false;
};

const Truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const TruncatePhoneNumber = (str, n) => {
  let privateText = str.substring(n, 0);
  let phoneNumber = str.substring(5 + 1);

  const resultText = privateText.replace(privateText, '********') + phoneNumber;
  return resultText;
};

export {normalize, isStringEmpty, isObjectEmpty, Truncate, TruncatePhoneNumber};
