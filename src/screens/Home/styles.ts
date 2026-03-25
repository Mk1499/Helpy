import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '../../utils/constants/UIConsts';

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    flex: 1,
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  bodyCont: {
    marginTop: 50,
  },
  banner: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 5,
    color: '#14bb49',
    fontFamily: Fonts.Bold,
  },
  desc: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
    fontFamily: Fonts.Primary,
  },
  ctaBtn: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    width: '100%',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
  },
  btnGredient: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
});
