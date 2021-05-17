import { DefaultTheme} from '@react-navigation/native';
import { MyTheme } from '../Theme/Theme';
import { Dimensions} from 'react-native';
import { HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';




export const MyTransition = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: MyTheme.colors.background,
      primary:  MyTheme.colors.primary,
      card: MyTheme.colors.card,
      text: MyTheme.colors.text,
      border: MyTheme.colors.border,
      notification: MyTheme.colors.notification,
    },

  gestureDirection: 'horizontal',
  gestureResponseDistance: {
    horizontal: Dimensions.get('window').width
  },
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["45deg", "0deg"],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1],
                })
              : 1,
          },
        ],
      },
      containerStyle : {
        opacity: current.progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
        }),
      },
    };
  },
};

export const HourlyTabsTheme = 
    {
        // activeTintColor: MyTheme.colors.primary,
        labelStyle: {
            textTransform: "uppercase",
            // color:MyTheme.colors.backgroundColor,
            
        },
        inactiveTintColor: MyTheme.colors.background,
        // activeTintColor: MyTheme.colors.primary,
        indicatorStyle: {
            height: null,
            top: '10%',
            bottom: '10%',
            width: '45%',
            left: '2.5%',
            borderRadius: 100,
            backgroundColor: MyTheme.colors.background,
        },
        style: {
            alignSelf: "center",
            width: '55%',
            borderRadius: 100,
            borderColor: "blue",
            backgroundColor: MyTheme.colors.primary,
            elevation: 5, // shadow on Android
            shadowOpacity: .10, // shadow on iOS,
            shadowRadius: 4, // shadow blur on iOS
        },
        tabStyle: {
            borderRadius: 100,
            
        },
    }
