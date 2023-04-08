import { Center, Image } from 'native-base'

export default ({
  width,
  height,
  size,
  boxStyle,
}: {
  width: number
  height: number
  size: number
  boxStyle?: any
}) => {
  return (
    <Center
      width={width}
      height={height}
      _dark={{ bg: 'brand.700' }}
      _light={{ bg: 'coolGray.300' }}
      {...boxStyle}
    >
      <Image
        source={require('../../assets/placeholder/movie-poster.png')}
        alt={"Movie poster doesn't exist placeholder"}
        size={size}
      />
    </Center>
  )
}
