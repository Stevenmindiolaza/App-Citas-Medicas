import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Image } from 'react-native'
import { Block, Text, theme } from 'galio-framework'

import Images from '../constants/Images'
import { DrawerItem as DrawerCustomItem } from '../components'

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea()
  const screens = [
    'Home',
    'AppointmentCreate',
    'Profile',
    'ChangePassword',
    'Logout',
  ]
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            )
          })}
        </ScrollView>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
})

export default CustomDrawerContent