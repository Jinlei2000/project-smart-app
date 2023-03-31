import { Box, Text } from 'native-base'

export default ({ rating }: { rating: number }) => {
  const getRatingBgColor = (rating: number) => {
    if (rating >= 70) {
      return 'extra.green'
    } else if (rating >= 50) {
      return 'extra.orange'
    } else if (rating > 0) {
      return 'extra.red'
    } else {
      return 'brand.800'
    }
  }

  const getRatingText = (rating: number) => {
    if (rating === 0) {
      return 'N/A'
    }
    return `${rating}%`
  }

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      opacity={0.95}
      borderRadius={8}
      px={1.5}
      py={0.5}
      m={1.5}
      bg={getRatingBgColor(rating)}
    >
      <Text fontSize={10} fontWeight="semibold" color="brand.50">
        {getRatingText(rating)}
      </Text>
    </Box>
  )
}
