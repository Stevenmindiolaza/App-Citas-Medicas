import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  Text,
} from 'react-native'
import { Block, theme, Card } from 'galio-framework'
import { Search, Icon } from '../../components'
import { Images } from '../../constants'
import { HeaderHeight } from '../../constants/utils'
import { appointmentNotificationDelete } from '../../services/admin'
import { useDispatch, useSelector } from 'react-redux'
import { ADMIN_APPOINTMENT_DELETED } from '../../state/actions'

const { width, height } = Dimensions.get('screen')

const thumbMeasure = (width - 48 - 32) / 3
const NotificationAdmin = ({ navigation }) => {
  /*State*/
  const dispatch = useDispatch()
  const adminAppointmentDeleted = useSelector(
    (state) => state.adminAppointmentDeleted
  )

  /*Component initial*/
  useEffect(() => {
    let mounted = true
    if (mounted) {
      getNotifications()
    }
    return () => (mounted = false)
  }, [dispatch])

  /*Get notifications*/
  const getNotifications = async () => {
    try {
      const response = await appointmentNotificationDelete()
      dispatch({
        type: ADMIN_APPOINTMENT_DELETED,
        payload: response,
      })
    } catch (error) {}
  }

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '25%' }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle>
                <Text size={17} color="#8898AA">
                  Panel de notificaciones de citas rechazadas.
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block flex>
                {adminAppointmentDeleted.length == 0 && (
                  <Card title="No exiten citas médicas rechazadas aún." />
                )}
                {adminAppointmentDeleted &&
                  adminAppointmentDeleted.map((element) => (
                    <Card
                      key={element.id}
                      style={styles.space}
                      title={element.specialty.title}
                      caption={element.date}
                      location={
                        <Block flex>
                          <Block
                            row
                            middle
                            style={{ marginHorizontal: theme.SIZES.BASE }}
                          >
                            <Icon
                              name="calendar"
                              family="entypo"
                              color={theme.COLORS.MUTED}
                              size={20}
                            />
                            <Text
                              color={theme.COLORS.MUTED}
                              size={theme.SIZES.FONT * 0.875}
                              style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                            >
                              {element.time}
                            </Text>
                          </Block>
                        </Block>
                      }
                      borderless
                      shadowColor={theme.COLORS.BLACK}
                    />
                  ))}
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  createButton: {
    width: width * 0.7,
    marginTop: 25,
  },
  space: {
    marginBottom: 10,
    flex: 1,
  },
  container: {
    height: 90,
  },
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    //marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    //position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
})

export default NotificationAdmin
