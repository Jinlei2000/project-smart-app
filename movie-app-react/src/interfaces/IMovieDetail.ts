import ICast from './ICast'
import IMovie from './IMovie'
import IVideo from './IVideo'

// use IMovie interface as base and IMovie can be null
export default interface IMovieDetail extends IMovie {
  // add new properties
  genres?: Array<{ id: number; name: string }>
  imdb_id?: string | null
  runtime?: number | null
  status?: string
  videos?: Array<IVideo>
  similar?: Array<IMovie>
  reviews?: Array<{
    id: string
    created_at: string
    content: string
    author: string
    author_details: {
      name: string
      username: string
      avatar_path: string | null
      rating: number | null
    }
  }>

  externalIds?: {
    imdb_id: string | null
    facebook_id: string | null
    instagram_id: string | null
    twitter_id: string | null
  }
  credits?: {
    cast: Array<ICast>
  }
  accountStates?: {
    id: number
    favorite: boolean
    rated:
      | {
          value: number
        }
      | boolean
    watchlist: boolean
  }
}
