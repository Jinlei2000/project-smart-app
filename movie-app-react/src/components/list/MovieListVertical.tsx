import { VStack, FlatList, HStack } from 'native-base'
import IMovie from '../../interfaces/IMovie'
import SectionHeader from '../title/SectionHeader'
import MovieCardResponsive from '../card/MovieCardResponsive'

export default ({
  title,
  data,
  navigateToSameScreen,
}: {
  title?: string
  data: IMovie[] | null
  navigateToSameScreen?: boolean
}) => {
  return (
    <VStack space={4} mx={6}>
      {title && <SectionHeader title={title} viewAll={false} />}
      {data !== null ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            paddingTop: 56,
            paddingBottom: 40,
          }}
          renderItem={({ item, index }: { item: IMovie; index: number }) => {
            // Check if the index is even
            const isEvenIndex = index % 2 === 0
            // If the index is odd, don't render anything
            if (!isEvenIndex) {
              return null
            }
            // If the index is even, render the current movie and the next movie (if it exists)
            return (
              <HStack space={4} key={index} mb={4}>
                <MovieCardResponsive movie={item} />
                {data[index + 1] && (
                  <MovieCardResponsive
                    navigateToSameScreen={navigateToSameScreen}
                    movie={data[index + 1]}
                  />
                )}
              </HStack>
            )
          }}
        />
      ) : null}
    </VStack>
  )
}
