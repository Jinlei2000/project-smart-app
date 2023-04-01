import {
  Box,
  Flex,
  Image,
  Pressable,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import NavHeader from '../../../components/header/NavHeader'
import IMovie from '../../../interfaces/IMovie'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import RatingBadge from '../../../components/badge/RatingBadge'
import { textProps } from '../../../styles/props'
import { BookmarkMinus } from 'lucide-react-native'

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { getWatchlist } = useApi()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()
  const [watchlist, setWatchlist] = useState<IMovie[] | null>(null)

  useEffect(() => {
    getWatchlist().then((data: IMovie[] | null) => {
      if (data) {
        setWatchlist(data)
      } else {
        setWatchlist([])
      }
    })
  }, [])

  return (
    <>
      <Main>
        <Box mt={12} mb={20} mx={6}>
          <VStack mt={2} space={4}>
            {/* <Flex position="relative" height={145} justify="flex-end" mt={3}>
              <Pressable
                onPress={() =>
                  navigate('Detail', {
                    movie: watchlist,
                  })
                }
                mx={3}
                mb={3}
                bg="blueGray.900"
                borderRadius={12.5}
                position="absolute"
                bottom={0}
                width={24}
                zIndex={10}
              >
                <Image
                  width={24}
                  height={145}
                  src={watchlist?.[0].posterUrl}
                  alt={watchlist?.[0].title}
                  resizeMode="cover"
                  borderRadius={12}
                />
                <RatingBadge rating={watchlist?.[0].rating} />
              </Pressable>

              <Pressable
                onPress={() =>
                  navigate('Detail', {
                    movie: watchlist,
                  })
                }
                _dark={{
                  bg: 'brand.800',
                }}
                _light={{
                  bg: 'coolGray.200',
                }}
                height={100}
                borderRadius={22}
                alignItems="center"
                flexDirection={'row'}
                pl={3}
                position="relative"
              >
                <Box width={24} height={'full'} />
                <VStack space={2} pl={3} flexBasis={0} flexGrow={1}>
                  <Text
                    numberOfLines={2}
                    fontWeight="semibold"
                    fontSize={14}
                    lineHeight={17}
                    {...textProps.primaryColor}
                  >
                    {watchlist?.[0].title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    fontSize={12}
                    fontWeight="regular"
                    lineHeight={15}
                    {...textProps.secondaryColor}
                  >
                    {watchlist?.[0].releaseDate}
                  </Text>
                </VStack>

                <Pressable
                  alignSelf="flex-start"
                  mr={2.5}
                  mt={2.5}
                  onPress={() => {
                    console.log('remove from watchlist')
                  }}
                >
                  <BookmarkMinus
                    size={24}
                    color={
                      colorMode === 'dark'
                        ? // @ts-ignore
                          colors.brand[200]
                        : colors.coolGray[700]
                    }
                  />
                </Pressable>
              </Pressable>
            </Flex> */}
          </VStack>
        </Box>
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Title',
          leftTitle: 'Watchlist',
          right: 'Search&Profile',
        }}
      />
    </>
  )
}
