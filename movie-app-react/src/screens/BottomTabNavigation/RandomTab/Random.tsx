import {
  Box,
  Button,
  Flex,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import RatingBadge from '../../../components/badge/RatingBadge'
import { buttonProps, textProps } from '../../../styles/props'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import IMovie from '../../../interfaces/IMovie'
import { Dimensions } from 'react-native'

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { getRandomMovie } = useApi()
  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRandom()
  }, [])

  const getRandom = () => {
    setLoading(true)

    getRandomMovie().then((data: IMovie | null) => {
      if (data) {
        setRandomMovie(data)
        setLoading(false)
      } else {
        getRandom()
      }
    })
  }

  return (
    <Main scroll={false}>
      <VStack pt={6} mx={6} height={'100%'}>
        {randomMovie ? (
          <Flex flex={1} justifyContent="center" mb={32}>
            <Pressable
              onPress={() =>
                navigate('Detail', {
                  movie: randomMovie,
                })
              }
            >
              <Flex
                alignSelf="center"
                _dark={{
                  bg: 'brand.600',
                }}
                _light={{
                  bg: 'coolGray.300',
                }}
                borderRadius={16.5}
                justifyContent={'center'}
                alignItems={'center'}
                position="relative"
                width={Dimensions.get('window').width * 0.7}
                height={Dimensions.get('window').width * 0.7 * 1.5}
              >
                <Image
                  width={Dimensions.get('window').width * 0.7}
                  height={Dimensions.get('window').width * 0.7 * 1.5}
                  src={randomMovie?.posterUrl}
                  alt={randomMovie?.title}
                  resizeMode="cover"
                  borderRadius={16}
                />
                <RatingBadge rating={randomMovie?.rating} size="lg" />
              </Flex>
            </Pressable>
            <Pressable
              onPress={() =>
                navigate('Detail', {
                  movie: randomMovie,
                })
              }
            >
              <Text
                alignSelf="center"
                maxW={Dimensions.get('window').width * 0.7}
                pt={6}
                {...textProps.primaryColor}
                fontWeight={'semibold'}
                fontSize={20}
                lineHeight={24}
                numberOfLines={2}
                textAlign="center"
              >
                {randomMovie?.title}
              </Text>
            </Pressable>
          </Flex>
        ) : (
          <Text>Loading...</Text>
        )}

        <Button
          {...buttonProps}
          onPress={() => getRandom()}
          position="absolute"
          width="100%"
          bottom={20}
          disabled={loading}
        >
          {loading ? <Spinner color="white" /> : 'Random'}
        </Button>
      </VStack>
    </Main>
  )
}
