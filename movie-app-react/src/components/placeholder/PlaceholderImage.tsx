import { Center, Image } from 'native-base'

export default ({
  width,
  height,
  size,
  imageStyle,
}: {
  width: number
  height: number
  size: number
  imageStyle?: any
}) => {
  return (
    <Center
      width={width}
      height={height}
      _dark={{ bg: 'brand.800' }}
      _light={{ bg: 'coolGray.100' }}
    >
      <Image
        source={require('../../assets/placeholder/movie-poster.png')}
        alt={"Movie poster doesn't exist placeholder"}
        size={size}
        {...imageStyle}
      />
    </Center>
  )
}
