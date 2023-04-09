import { FlatList, Flex, HStack, Skeleton } from 'native-base'
import { Dimensions } from 'react-native'

const ITEM_WIDTH = (Dimensions.get('window').width - 64) / 2
const ITEM_HEIGHT = ITEM_WIDTH * 1.5
const BORDER_RADIUS = ITEM_WIDTH * 0.11

export default () => {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={index => index.toString()}
      contentContainerStyle={{
        paddingTop: 56,
        paddingBottom: 40,
      }}
      renderItem={({ item, index }: { item: any; index: number }) => (
        <HStack space={4} key={index} mb={4} alignSelf="center">
          <Flex
            _dark={{
              bg: 'brand.600',
            }}
            _light={{
              bg: 'coolGray.300',
            }}
            borderRadius={BORDER_RADIUS + 0.5}
            justifyContent={'center'}
            alignItems={'center'}
            position="relative"
          >
            <Skeleton
              w={ITEM_WIDTH}
              h={ITEM_HEIGHT}
              borderRadius={BORDER_RADIUS}
            />
          </Flex>
          <Flex
            _dark={{
              bg: 'brand.600',
            }}
            _light={{
              bg: 'coolGray.300',
            }}
            borderRadius={BORDER_RADIUS + 0.5}
            justifyContent={'center'}
            alignItems={'center'}
            position="relative"
          >
            <Skeleton
              w={ITEM_WIDTH}
              h={ITEM_HEIGHT}
              borderRadius={BORDER_RADIUS}
            />
          </Flex>
        </HStack>
      )}
    />
  )
}
