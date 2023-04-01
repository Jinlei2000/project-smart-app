import { Text } from 'native-base'
import Main from '../../components/generic/Main'
import IMovie from '../../interfaces/IMovie'

export default (props: any) => {
  // console.log(props)
  // use IMovie interface to define movie
  const movie: IMovie = props.route.params.movie
  console.log(movie)

  return (
    <Main>
      <Text>
        {movie.title} {movie.id} {movie.overview} {movie.rating}{' '}
        {movie.posterUrl} {movie.releaseDate}
      </Text>
    </Main>
  )
}
