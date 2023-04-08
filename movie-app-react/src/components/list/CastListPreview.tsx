import { Box, HStack, Image, Skeleton, Text, VStack } from 'native-base'
import ICast from '../../interfaces/ICast'
import SectionHeader from '../title/SectionHeader'
import { textProps } from '../../styles/props'

export default ({
  casts,
  movieId,
}: {
  casts: ICast[] | undefined
  movieId: number
}) => {
  //   console.log(casts)

  if (casts && casts?.length === 0) {
    return null
  }

  return (
    <VStack space={1.5} mb={6}>
      <SectionHeader
        category="Casts"
        id={movieId}
        title="Cast"
        viewAll={casts && casts.length > 6}
      />
      <HStack mx={6}>
        {casts?.slice(0, 6).map((cast, index) =>
          cast.profile_path ? (
            <Image
              key={index}
              source={{
                uri: `https://image.tmdb.org/t/p/w185${cast.profile_path}`,
              }}
              alt={cast.name}
              size={12}
              rounded="full"
              ml={index === 0 ? 0 : -2}
            />
          ) : (
            <Box
              size={12}
              rounded="full"
              _dark={{
                bg: 'brand.700',
              }}
              _light={{
                bg: 'coolGray.200',
              }}
              ml={index === 0 ? 0 : -2}
            >
              <Text
                fontSize={14}
                fontWeight="medium"
                {...textProps.primaryColor}
              >
                {cast.name.charAt(0)}
              </Text>
            </Box>
          ),
        )}
        {casts && casts.length > 6 && (
          <>
            <Box
              size={12}
              bg="black"
              rounded="full"
              _dark={{
                opacity: 0.5,
              }}
              _light={{
                opacity: 0.3,
              }}
              ml={-12}
            />
            <Box
              bg="transparent"
              ml={-12}
              size={12}
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize={14}
                fontWeight="medium"
                _dark={{
                  color: 'brand.200',
                }}
                _light={{
                  color: 'coolGray.50',
                }}
              >
                +{casts.length - 6}
              </Text>
            </Box>
          </>
        )}
        {!casts &&
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <Skeleton
              rounded={'full'}
              key={index}
              size={12}
              ml={index === 0 ? 0 : -2}
            />
          ))}
      </HStack>
    </VStack>
  )
}
