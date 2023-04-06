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
  const [url, setUrl] = useState<string | undefined | null>(null)

  useEffect(() => {
    setUrl(userDatas?.avatarUrl)
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
      {url ? (
        <Image
          source={{
            uri: userDatas?.avatarUrl || undefined,
          }}
          onError={() => {
            // console.log('no default avatar image on gravatar')
            setUrl(undefined)
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
          }}
        />
      ) : (
        <Text {...textProps.primaryColor} fontSize={15} fontWeight={'bold'}>
          {userDatas?.firstLetter}
        </Text>
      )}
    </Avatar>
  )
}
