import { useEffect, useState } from 'react'
import { IExternalLinks } from '../../interfaces/IExternalLinks'
import SectionHeader from '../title/SectionHeader'
import {
  HStack,
  Pressable,
  Skeleton,
  Spacer,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base'
import { Facebook, Instagram, Link, Twitter } from 'lucide-react-native'
import { btnProps } from '../../styles/props'
import { Linking } from 'react-native'

export default ({
  links,
  homepage,
}: {
  links: IExternalLinks | undefined
  homepage: string | null | undefined
}) => {
  // console.log(links)
  // console.log(homepage)
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  // if null than don't show
  if (links != undefined && homepage != undefined) {
    if (
      !links.facebook_id &&
      !links.twitter_id &&
      !links.instagram_id &&
      !links.imdb_id &&
      !homepage
    ) {
      return null
    }
  }

  return (
    <>
      <VStack space={2}>
        <SectionHeader title={'Social media'} viewAll={false} />
        {links || homepage ? (
          <HStack mx={6}>
            {/* homepage */}
            {homepage && (
              <Pressable
                mr={3}
                p={2}
                rounded={14}
                {...btnProps}
                onPress={() => {
                  // console.log('homepage', homepage)
                  Linking.openURL(homepage)
                }}
              >
                <Link
                  size={28}
                  color={
                    colorMode === 'dark'
                      ? colors.brand[200]
                      : colors.coolGray[800]
                  }
                />
              </Pressable>
            )}
            {/* facebook */}
            {links?.facebook_id && (
              <Pressable
                mr={3}
                p={2}
                rounded={14}
                {...btnProps}
                onPress={() => {
                  // console.log('facebook', links!.facebook_id)
                  Linking.openURL(
                    `https://www.facebook.com/${links!.facebook_id}`,
                  )
                }}
              >
                <Facebook
                  size={28}
                  color={
                    colorMode === 'dark'
                      ? colors.brand[200]
                      : colors.coolGray[800]
                  }
                />
              </Pressable>
            )}

            {/* twitter */}
            {links?.twitter_id && (
              <Pressable
                p={2}
                mr={3}
                rounded={14}
                {...btnProps}
                onPress={() => {
                  // console.log('twitter', links?.twitter_id)
                  Linking.openURL(`https://twitter.com/${links!.twitter_id}`)
                }}
              >
                <Twitter
                  size={28}
                  color={
                    colorMode === 'dark'
                      ? colors.brand[200]
                      : colors.coolGray[800]
                  }
                />
              </Pressable>
            )}

            {/* instagram */}
            {links?.instagram_id && (
              <Pressable
                p={2}
                mr={3}
                rounded={14}
                {...btnProps}
                onPress={() => {
                  // console.log('instagram', links?.instagram_id)
                  Linking.openURL(
                    `https://www.instagram.com/${links!.instagram_id}`,
                  )
                }}
              >
                <Instagram
                  size={28}
                  color={
                    colorMode === 'dark'
                      ? colors.brand[200]
                      : colors.coolGray[800]
                  }
                />
              </Pressable>
            )}

            {/* imdb */}
            {links?.imdb_id && (
              <Pressable
                mr={3}
                rounded={14}
                h={42}
                w={42}
                {...btnProps}
                justifyContent={'center'}
                alignItems={'center'}
                onPress={() => {
                  // console.log('imdb', links?.imdb_id)
                  Linking.openURL(
                    `https://www.imdb.com/title/${links!.imdb_id}`,
                  )
                }}
              >
                <Text
                  lineHeight={15}
                  fontSize={12}
                  fontWeight={'bold'}
                  color={
                    colorMode === 'dark'
                      ? colors.brand[200]
                      : colors.coolGray[800]
                  }
                >
                  IMDB
                </Text>
              </Pressable>
            )}
          </HStack>
        ) : (
          // show skeleton
          <HStack mx={6} space={3}>
            <Skeleton rounded={14} size={42} />
            <Skeleton rounded={14} size={42} />
            <Skeleton rounded={14} size={42} />
            <Skeleton rounded={14} size={42} />
            <Skeleton rounded={14} size={42} />
          </HStack>
        )}
      </VStack>
    </>
  )
}
