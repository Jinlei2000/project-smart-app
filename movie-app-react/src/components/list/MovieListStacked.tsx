import { Box, FlatList, Flex, HStack, VStack } from 'native-base'
import React, { useRef, useState } from 'react'
import IMovie from '../../interfaces/IMovie'
import MovieCard from '../card/MovieCard'
import SectionHeader from '../title/SectionHeader'
import SkeletonMovieList from '../skeleton/SkeletonMovieList'
import { Animated, PanResponder } from 'react-native'

export default ({
  title,
  data,
  viewAll,
  mb,
}: {
  title: string
  data: IMovie[] | null
  navigateToSameScreen?: boolean
  viewAll?: boolean
  mb?: number
}) => {
  if (data && data.length === 0) {
    return null
  }

  const pan = useRef(new Animated.ValueXY()).current

  const [zIndexArr, setZIndexArr] = useState<number[]>([7, 8, 9, 10, 9, 8, 7])
  const [translateX, setTranslateX] = useState<number[]>([
    -96, -64, -32, 0, 32, 64, 96,
  ])
  const [opacity, setOpacity] = useState<number[]>([
    0.5, 0.8, 0.9, 1, 0.9, 0.8, 0.5,
  ])

  const shiftArrayValues = (arr: number[], direction: 'left' | 'right') => {
    let newArr = [...arr]
    const lastItem = newArr[newArr.length - 1]
    const firstItem = newArr[0]
    if (direction === 'left') {
      // shift array to the left
      newArr.pop()
      newArr.unshift(lastItem)
    } else {
      // shift array to the right
      newArr.shift()
      newArr.push(firstItem)
    }
    return newArr
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: 0 })
        // console.log(gestureState.dx)
        if (gestureState.dx > 30) {
          // shift array to the right
          // setZIndexArr([8, 9, 10, 9, 8, 7, 7])
          // console.log('right')

          setZIndexArr(prev => {
            const newZIndexArr = [...prev]
            const temp = newZIndexArr[0]
            newZIndexArr.shift()
            newZIndexArr.push(temp)
            return newZIndexArr
          })

          setTranslateX(prev => {
            const newTranslateX = [...prev]
            const temp = newTranslateX[0]
            newTranslateX.shift()
            newTranslateX.push(temp)
            return newTranslateX
          })

          setOpacity(prev => {
            const newOpacity = [...prev]
            const temp = newOpacity[0]
            newOpacity.shift()
            newOpacity.push(temp)
            return newOpacity
          })
        } else if (gestureState.dx < -30) {
          // shift array to the left
          // setZIndexArr([7, 7, 8, 9, 10, 9, 8])
          // console.log('left')

          setZIndexArr(prev => {
            const newZIndexArr = [...prev]
            const temp = newZIndexArr[newZIndexArr.length - 1]
            newZIndexArr.pop()
            newZIndexArr.unshift(temp)
            return newZIndexArr
          })

          setTranslateX(prev => {
            const newTranslateX = [...prev]
            const temp = newTranslateX[newTranslateX.length - 1]
            newTranslateX.pop()
            newTranslateX.unshift(temp)
            return newTranslateX
          })

          setOpacity(prev => {
            const newOpacity = [...prev]
            const temp = newOpacity[newOpacity.length - 1]
            newOpacity.pop()
            newOpacity.unshift(temp)
            return newOpacity
          })
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        // use animation to move back to original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start()
      },
    }),
  ).current

  return (
    <VStack space={4} mb={mb}>
      <SectionHeader
        title={title}
        category="Movies"
        viewAll={
          viewAll != undefined
            ? viewAll
            : data && data.length > 10
            ? true
            : false
        }
      />

      {data !== null ? (
        <>
          <Animated.View
            style={{
              backgroundColor: 'blue',
              transform: [{ translateX: pan.x }],
              position: 'relative',
            }}
            {...panResponder.panHandlers}
          >
            <HStack>
              <Box
                zIndex={zIndexArr[0]}
                opacity={opacity[0]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[0] }] }}
              >
                <MovieCard key={data[6].id} movie={data[6]} />
              </Box>
              <Box
                zIndex={zIndexArr[1]}
                opacity={opacity[1]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[1] }] }}
              >
                <MovieCard key={data[4].id} movie={data[4]} />
              </Box>
              {/* left */}
              <Box
                zIndex={zIndexArr[2]}
                opacity={opacity[2]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[2] }] }}
              >
                <MovieCard key={data[2].id} movie={data[2]} />
              </Box>
              {/* middle */}
              <Box
                zIndex={zIndexArr[3]}
                opacity={opacity[3]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[3] }] }}
              >
                <MovieCard key={data[0].id} movie={data[0]} />
              </Box>
              {/* right */}
              <Box
                zIndex={zIndexArr[4]}
                opacity={opacity[4]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[4] }] }}
              >
                <MovieCard key={data[1].id} movie={data[1]} />
              </Box>
              <Box
                zIndex={zIndexArr[5]}
                opacity={opacity[5]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[5] }] }}
              >
                <MovieCard key={data[3].id} movie={data[3]} />
              </Box>
              <Box
                zIndex={zIndexArr[6]}
                opacity={opacity[6]}
                position="absolute"
                w={'full'}
                flex={1}
                alignItems="center"
                style={{ transform: [{ translateX: translateX[6] }] }}
              >
                <MovieCard key={data[5].id} movie={data[5]} />
              </Box>
            </HStack>
          </Animated.View>
        </>
      ) : (
        <SkeletonMovieList />
      )}
    </VStack>
  )
}
