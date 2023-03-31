import { Text } from 'native-base'
import Main from '../../../components/generic/Main'
import IMovie from '../../../interfaces/IMovie'

export default ({ movie }: { movie: IMovie }) => {
  console.log(movie)

  return (
    <Main>
      <Text>
        {movie.title} {movie.id} {movie.overview} {movie.rating}
      </Text>
    </Main>
  )
}
