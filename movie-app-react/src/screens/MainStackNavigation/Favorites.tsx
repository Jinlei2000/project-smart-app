import React, { useEffect, useState } from 'react'
import NavHeader from '../../components/header/NavHeader'
import Main from '../../components/generic/Main'
import MovieListHorizontal from '../../components/list/MovieListHorizontal'
import useApi from '../../hooks/useApi'
import IMovie from '../../interfaces/IMovie'

export default () => {
  const { getFavorites, deleteOrAddFavorite } = useApi()
  const [favorites, setFavorites] = useState<IMovie[] | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false) // add state for isRefreshing

  const onRefresh = () => {
    setIsRefreshing(true) // set isRefreshing to true when the user pulls to refresh
    getFavorites(1).then((data: IMovie[] | null) => {
      setIsRefreshing(false) // set isRefreshing to false after the data is fetched
      if (data) {
        setFavorites(data)
      } else {
        setFavorites([])
      }
    })
  }

  useEffect(() => {
    onRefresh() // call onRefresh on initial load
  }, [])

  const deleteMovieFromFavorites = (movieId: number) => {
    deleteOrAddFavorite(
      movieId,
      false, // false = delete from favorites
    ).then(() => {
      onRefresh()
    })
  }

  return (
    <>
      <Main scroll={false}>
        <MovieListHorizontal
          handleRemove={deleteMovieFromFavorites}
          movies={favorites}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          category="Favorites"
        />
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: 'Favorites',
        }}
      />
    </>
  )
}
