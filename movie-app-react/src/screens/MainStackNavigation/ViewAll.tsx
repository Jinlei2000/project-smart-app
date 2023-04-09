import Main from '../../components/generic/Main'
import NavHeader from '../../components/header/NavHeader'
import { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import MovieListVertical from '../../components/list/MovieListVertical'
import IMovie from '../../interfaces/IMovie'
import SkeletonMovieListVertical from '../../components/skeleton/SkeletonMovieListVertical'
import { enumMovieCategory } from '../../enum/enumMovieCategory'

export default (props: any) => {
  // console.log(props)
  const { data } = props.route.params
  // console.log('data: ', data)

  const { getMovies, getMoviesByGenre } = useApi()
  const [list, setList] = useState<JSX.Element>()

  useEffect(() => {
    if (data.category === 'Categories') {
      setList(<SkeletonMovieListVertical />)
      // console.log('Categories: ', data.item.name, data.item.id)
      getMoviesByGenre(data.item.id, 1).then((movies: IMovie[] | null) => {
        // console.log('movies: ', movies)
        setList(<MovieListVertical data={movies} />)
      })
    } else if (data.category === 'Movies') {
      setList(<SkeletonMovieListVertical />)
      console.log('Movies: ', data.item.name)

      if (data.item.name === 'Popular') {
        getMovies(enumMovieCategory.POPULAR, 1).then(
          (movies: IMovie[] | null) => {
            // console.log('movies: ', movies)
            setList(<MovieListVertical data={movies} />)
          },
        )
      } else if (data.item.name === 'Trending Now') {
        getMovies(enumMovieCategory.TRENDING_NOW, 1).then(
          (movies: IMovie[] | null) => {
            // console.log('movies: ', movies)
            setList(<MovieListVertical data={movies} />)
          },
        )
      } else if (data.item.name === 'Top Rated') {
        getMovies(enumMovieCategory.TOP_RATED, 1).then(
          (movies: IMovie[] | null) => {
            // console.log('movies: ', movies)
            setList(<MovieListVertical data={movies} />)
          },
        )
      } else if (data.item.name === 'Upcoming') {
        getMovies(enumMovieCategory.UPCOMING, 1).then(
          (movies: IMovie[] | null) => {
            // console.log('movies: ', movies)
            setList(<MovieListVertical data={movies} />)
          },
        )
      } else if (data.item.name === 'Now Playing') {
        getMovies(enumMovieCategory.NOW_PLAYING, 1).then(
          (movies: IMovie[] | null) => {
            // console.log('movies: ', movies)
            setList(<MovieListVertical data={movies} />)
          },
        )
      }
    } else if (data.category === 'Casts') {
      console.log('Casts: ', data.item.id)
    } else if (data.category === 'Videos') {
      console.log('Videos: ', data.item.id)
    }
  }, [])

  return (
    <>
      <Main scroll={false}>{list}</Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: data.item.name,
        }}
      />
    </>
  )
}
