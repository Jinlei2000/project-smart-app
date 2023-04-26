import Main from '../../components/generic/Main'
import NavHeader from '../../components/header/NavHeader'
import { useEffect, useState } from 'react'
import { HelpCircle, Search } from 'lucide-react-native'
import MovieListVertical from '../../components/list/MovieListVertical'
import EmptyList from '../../components/list/EmptyList'
import useApi from '../../hooks/useApi'
import IMovie from '../../interfaces/IMovie'
import SkeletonMovieListVertical from '../../components/skeleton/SkeletonMovieListVertical'

export default () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { searchMovies } = useApi()

  const [showMovieList, setShowMovieList] = useState<JSX.Element>()
  useEffect(() => {
    if (searchValue.length > 0) {
      setShowMovieList(<SkeletonMovieListVertical />)
      searchMovies(searchValue, 1).then((movies: IMovie[] | null) => {
        if (movies) {
          setShowMovieList(<MovieListVertical data={movies} />)
        } else {
          setShowMovieList(
            <EmptyList
              icon={HelpCircle}
              title="No movies found"
              description="Try to search for another movie"
              hasButton={false}
              bounces={false}
            />,
          )
        }
      })
    } else if (searchValue.length === 0) {
      setShowMovieList(
        <EmptyList
          icon={Search}
          title="Search"
          description="Search for a movie and find it here"
          hasButton={false}
          bounces={false}
        />,
      )
    }
  }, [searchValue])

  return (
    <>
      <Main scroll={false} safeAreaBottom={false}>
        {showMovieList}
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&SearchBar',
          searchValue,
          setSearchValue,
        }}
      />
    </>
  )
}
