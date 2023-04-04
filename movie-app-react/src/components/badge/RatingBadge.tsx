import { Box, Text } from 'native-base'

export default ({ rating, size = 'sm' }: { rating: number; size: string }) => {
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

  const getSize = (): any => {
    if (size === 'sm') {
      return {
        text: { fontSize: 10 },
        box: { px: 1.5, py: 0.5, m: 1.5, borderRadius: 8 },
      }
    } else if (size === 'lg') {
      return {
        text: { fontSize: 14 },
        box: { px: 2.5, py: 1, m: 2, borderRadius: 12 },
      }
    }
  }

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      opacity={0.95}
      {...getSize().box}
      bg={getRatingBgColor(rating)}
    >
      <Text {...getSize().text} fontWeight="semibold" color="brand.50">
        {getRatingText(rating)}
      </Text>
    </Box>
  )
}
