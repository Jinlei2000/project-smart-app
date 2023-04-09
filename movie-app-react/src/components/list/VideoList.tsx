import { FlatList, Flex, HStack, Skeleton, VStack, View } from 'native-base'
import SectionHeader from '../title/SectionHeader'
import YoutubePlayer from 'react-native-youtube-iframe'
import IVideo from '../../interfaces/IVideo'
import { useState } from 'react'

export default ({
  videos,
  movieId,
}: {
  videos: IVideo[] | undefined
  movieId: number
}) => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)

  console.log('videos: ', videos)

  const filterVideos =
    videos &&
    videos?.filter(video => video.site === 'YouTube' && video.official)
  if (videos && filterVideos?.length === 0) {
    return null
  }

  const renderItem = ({ item }: { item: IVideo }) => {
    return (
      <View overflow={'hidden'} borderRadius={16}>
        <YoutubePlayer
          key={item.id}
          height={150}
          width={266}
          videoId={item.key}
          play={item.id === currentVideoId}
          onChangeState={state => {
            if (state === 'playing') {
              setCurrentVideoId(item.id)
            }
          }}
          webViewProps={{
            allowsFullscreenVideo: true,
            bounces: false,
            scrollEnabled: false,
          }}
        />
      </View>
    )
  }

  return (
    <VStack space={4} mb={6}>
      <SectionHeader
        category="Videos"
        id={movieId}
        title="Videos"
        viewAll={filterVideos && filterVideos.length > 4 ? true : false}
      />
      {videos ? (
        <FlatList
          // site: 'YouTube' && official: true
          data={filterVideos && filterVideos.slice(0, 4)} // only show 3 videos, more = Webview Process Terminated
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          ItemSeparatorComponent={() => <Flex w={3} />}
          renderItem={renderItem}
        />
      ) : (
        // make a skeleton with 2 videos
        <HStack mx={6} space={3}>
          <Skeleton w={266} h={150} borderRadius={16} />
          <Skeleton w={266} h={150} borderRadius={16} />
        </HStack>
      )}
    </VStack>
  )
}
