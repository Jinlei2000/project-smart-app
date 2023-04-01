// import { Box, FlatList, Flex, Text, VStack } from 'native-base'
// import React, { useEffect, useState } from 'react'
// import Main from '../../../components/generic/Main'
// import useApi from '../../../hooks/useApi'
// import NavHeader from '../../../components/header/NavHeader'
// import IMovie from '../../../interfaces/IMovie'
// import MovieCardHorizontal from '../../../components/card/MovieCardHorizontal'
// import SkeletonMovieListHorizontal from '../../../components/skeleton/SkeletonMovieListHorizontal'

// export default () => {
//   const { getWatchlist } = useApi()
//   const [watchlist, setWatchlist] = useState<IMovie[] | null>(null)

//   useEffect(() => {
//     getWatchlist(1).then((data: IMovie[] | null) => {
//       if (data) {
//         setWatchlist(data)
//       } else {
//         setWatchlist([])
//       }
//     })
//   }, [])

//   return (
//     <>
//       <Main>
//         <Box mt={12} mb={20} mx={6}>
//           <VStack mt={2}>
//             {watchlist ? (
//               watchlist.length > 0 ? (
//                 <FlatList
//                   data={watchlist}
//                   scrollEnabled={false}
//                   keyExtractor={item => item?.id.toString()}
//                   ItemSeparatorComponent={() => <Flex h={6} />}
//                   renderItem={({ item }: { item: IMovie }) => (
//                     <MovieCardHorizontal movie={item} />
//                   )}
//                 />
//               ) : (
//                 <Text color="gray.500" fontSize="lg" textAlign="center">
//                   You don't have any movies in your watchlist
//                 </Text>
//               )
//             ) : (
//               <SkeletonMovieListHorizontal />
//             )}
//           </VStack>
//         </Box>
//       </Main>

//       {/* NavHeader have to be the last component, because else the BlurView don't work */}
//       <NavHeader
//         navBarOptions={{
//           left: 'Title',
//           leftTitle: 'Watchlist',
//           right: 'Search&Profile',
//         }}
//       />
//     </>
//   )
// }

import { Box, FlatList, Flex, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native' // import RefreshControl component
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import NavHeader from '../../../components/header/NavHeader'
import IMovie from '../../../interfaces/IMovie'
import MovieCardHorizontal from '../../../components/card/MovieCardHorizontal'
import SkeletonMovieListHorizontal from '../../../components/skeleton/SkeletonMovieListHorizontal'
import MovieListHorizontal from '../../../components/list/MovieListHorizontal'

export default () => {
  const { getWatchlist } = useApi()
  const [watchlist, setWatchlist] = useState<IMovie[] | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false) // add state for isRefreshing

  const onRefresh = () => {
    setIsRefreshing(true) // set isRefreshing to true when the user pulls to refresh
    getWatchlist(1).then((data: IMovie[] | null) => {
      if (data) {
        setWatchlist(data)
      } else {
        setWatchlist([])
      }
      setIsRefreshing(false) // set isRefreshing to false after the data is fetched
    })
  }

  useEffect(() => {
    onRefresh() // call onRefresh on initial load
  }, [])

  return (
    <>
      <Main scroll={false}>
        <MovieListHorizontal
          movies={watchlist}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Title',
          leftTitle: 'Watchlist',
          right: 'Search&Profile',
        }}
      />
    </>
  )
}
