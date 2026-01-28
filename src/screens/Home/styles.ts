import { StyleSheet } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { Fonts } from '../../utils/constants/UIConsts';

export default StyleSheet.create({
  container: {
    paddingTop: 120,
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headTitle: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    fontFamily: Fonts.CairoBold,
    fontSize: 25,
  },
  headLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  bodyCont: {
    marginTop: 50,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: Fonts.CairoBold,
    fontSize: 25,
    color: colors.darkText,
  },
  appName: {
    textAlign: 'center',
    fontFamily: Fonts.CairoBold,
    fontSize: 25,
    color: colors.primary,
  },
  desc: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: Fonts.Cairo,
    fontSize: 15,
    color: colors.subtitle,
  },
  ctaBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 40,
    width: '100%',
    left: 16,
  },
  ctaText: {
    fontFamily: Fonts.CairoBold,
    fontSize: 15,
    color: colors.bg,
  },
});
