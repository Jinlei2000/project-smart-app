import { FlatList, Flex, HStack, Skeleton, VStack, View } from 'native-base'
import SectionHeader from '../title/SectionHeader'
import YoutubePlayer from 'react-native-youtube-iframe'
import IVideo from '../../interfaces/IVideo'
import { StyleSheet } from 'react-native'
import { useState } from 'react'

export default ({
  videos,
  movieId,
}: {
  videos: IVideo[] | undefined
  movieId: number
}) => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)

  if (videos && videos?.length === 0) {
    return null
  }

  return (
    <VStack space={1.5} mb={6}>
      <SectionHeader
        category="Videos"
        id={movieId}
        title="Videos"
        viewAll={videos && videos.length > 6}
      />
      {videos ? (
        <FlatList
          // site: 'YouTube' && official: true
          data={videos
            ?.filter(video => video.site === 'YouTube' && video.official)
            .slice(0, 6)}
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          ItemSeparatorComponent={() => <Flex w={3} />}
          renderItem={({ item }) => (
            <>
              <View overflow={'hidden'} borderRadius={16}>
                <YoutubePlayer
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
            </>
          )}
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
