import { StyleSheet } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { Fonts } from '../../utils/constants/UIConsts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: '100%',
  },
  header: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.primary,
    paddingBottom: 10,
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: Fonts.CairoBold,
    fontSize: 25,
  },
  chatCont: {},
  welcomeCont: {
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily: Fonts.CairoBold,
    fontSize: 25,
  },
  welcomDesc: {
    textAlign: 'center',
    fontFamily: Fonts.Cairo,
    fontSize: 20,
    color: colors.subtitle,
  },
  userMsgCont: {},
  userMsgText: {},
  aiMsgCont: {},
  aiMsgText: {},
  inputCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    // backgroundColor: colors.card,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 20,
    borderTopWidth: 1,
    borderColor: colors.primary,
  },
  inputBox: {
    height: 60,
    flex: 5,
    backgroundColor: colors.bg,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontFamily: Fonts.Cairo,
    fontSize: 15,
    color: colors.darkText,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sendText: {
    color: colors.bg,
    fontFamily: Fonts.CairoBold,
    fontSize: 15,
  },
});
