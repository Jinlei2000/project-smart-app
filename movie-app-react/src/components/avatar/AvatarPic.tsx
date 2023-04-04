import { Avatar, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { IUserdata } from '../../interfaces/IUserdata'
import { textProps } from '../../styles/props'

export default ({
  userDatas,
  size = 'sm',
}: {
  userDatas: IUserdata | null
  size?: string
}) => {
  const [userData, setUserData] = useState<IUserdata | null>(userDatas)

  useEffect(() => {
    setUserData(userDatas)
  }, [userDatas])

  const getSize = () => {
    if (size === 'sm') {
      return 10
    } else if (size === 'xxl') {
      return 128
    }
  }

  return (
    <Avatar
      size={getSize()}
      _dark={{ bg: 'brand.700' }}
      _light={{ bg: 'coolGray.200' }}
    >
      {/* show avatar image if exist else show signiture (letter) */}
      {userData?.avatarUrl ? (
        <Image
          source={{
            uri: userData?.avatarUrl || undefined,
          }}
          onError={() => {
            // console.log('no default avatar image on gravatar')
            setUserData({
              ...userData,
              avatarUrl: undefined,
            })
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
          }}
        />
      ) : (
        <Text {...textProps.primaryColor} fontSize={15} fontWeight={'bold'}>
          {userData?.firstLetter}
        </Text>
      )}
    </Avatar>
  )
}
