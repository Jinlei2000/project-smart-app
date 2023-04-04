import React, { useEffect, useState } from 'react'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import NavHeader from '../../../components/header/NavHeader'
import IMovie from '../../../interfaces/IMovie'
import MovieListHorizontal from '../../../components/list/MovieListHorizontal'
import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'
import { vibrationModeAtom } from '../../../stores/vibrationMode'
import { useAtom } from 'jotai'

export default () => {
  const { getWatchlist, deleteOrAddWatchlist } = useApi()
  const [watchlist, setWatchlist] = useState<IMovie[] | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false) // add state for isRefreshing
  const [vibrationMode] = useAtom(vibrationModeAtom)

  const onRefresh = () => {
    setIsRefreshing(true) // set isRefreshing to true when the user pulls to refresh
    getWatchlist(1).then((data: IMovie[] | null) => {
      setIsRefreshing(false) // set isRefreshing to false after the data is fetched
      if (data) {
        setWatchlist(data)
      } else {
        setWatchlist([])
      }
    })
  }

  useEffect(() => {
    onRefresh() // call onRefresh on initial load
  }, [])

  const deleteMovieFromWatchlist = (movieId: number) => {
    deleteOrAddWatchlist(
      movieId,
      false, // false = delete from watchlist
    ).then(() => {
      if (vibrationMode) {
        // if vibrationMode is true, add haptic feedback
        notificationAsync(NotificationFeedbackType.Success)
      }
      onRefresh()
    })
  }

  return (
    <>
      <Main scroll={false}>
        <MovieListHorizontal
          handleRemove={deleteMovieFromWatchlist}
          movies={watchlist}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          category="Watchlist"
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
