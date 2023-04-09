import React, { useEffect, useState } from 'react'
import NavHeader from '../../components/header/NavHeader'
import Main from '../../components/generic/Main'
import MovieListHorizontal from '../../components/list/MovieListHorizontal'
import useApi from '../../hooks/useApi'
import IMovie from '../../interfaces/IMovie'

export default () => {
  const { getRated } = useApi()
  const [ratedMovies, setRatedMovies] = useState<IMovie[] | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false) // add state for isRefreshing

  const onRefresh = () => {
    setIsRefreshing(true) // set isRefreshing to true when the user pulls to refresh
    getRated(1).then((data: IMovie[] | null) => {
      setIsRefreshing(false) // set isRefreshing to false after the data is fetched
      if (data) {
        setRatedMovies(data)
      } else {
        setRatedMovies([])
      }
    })
  }

  useEffect(() => {
    onRefresh() // call onRefresh on initial load
  }, [])

  return (
    <>
      <Main scroll={false}>
        <MovieListHorizontal
          movies={ratedMovies}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          category="Rated"
        />
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: 'Rated',
        }}
      />
    </>
  )
}
