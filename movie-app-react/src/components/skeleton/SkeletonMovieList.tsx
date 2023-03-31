import { FlatList, Flex, Skeleton } from 'native-base'

export default () => {
  return (
    <FlatList
      data={[1, 2, 3]}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => (
        <Flex
          _dark={{
            bg: 'brand.600',
          }}
          _light={{
            bg: 'coolGray.300',
          }}
          borderRadius={16.5}
          mr={4}
          justifyContent={'center'}
          alignItems={'center'}
          position="relative"
        >
          <Skeleton w={120} h={180} borderRadius={16} />
        </Flex>
      )}
    />
  )
}
