import { Box, FlatList, Flex, Skeleton, VStack } from 'native-base'

export default () => {
  return (
    <FlatList
      data={[1, 2, 3]}
      scrollEnabled={false}
      keyExtractor={index => index.toString()}
      contentContainerStyle={{
        paddingHorizontal: 24,
        marginTop: 56,
        paddingBottom: 142,
      }}
      ItemSeparatorComponent={() => <Flex h={6} />}
      renderItem={() => (
        <Flex position="relative" height={145} justify="flex-end" mt={3}>
          <Skeleton
            mx={3}
            mb={3}
            borderRadius={12.5}
            position="absolute"
            bottom={0}
            width={24}
            zIndex={10}
            height={145}
            _light={{
              startColor: 'coolGray.200',
              endColor: 'coolGray.300',
            }}
            _dark={{ startColor: 'brand.600', endColor: 'brand.700' }}
          />

          <Box
            _dark={{ bg: 'brand.750' }}
            _light={{ bg: 'coolGray.200' }}
            height={100}
            borderRadius={22}
            alignItems="center"
            flexDirection="row"
          />
        </Flex>
      )}
    />
  )
}
