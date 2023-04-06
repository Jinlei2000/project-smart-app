import ICast from './ICast'
import IMovie from './IMovie'

// use IMovie interface as base and IMovie can be null
export default interface IMovieDetail extends IMovie {
  // add new properties
  genres?: Array<{ id: number; name: string }> | null
  imdb_id?: string | null
  runtime?: number | null
  status?: string | null
  videos?: {
    results?: Array<{
      id?: string
      key?: string
      name?: string
      type?: string
      published_at?: string
    }>
  } | null
  similar?: { results: Array<IMovie> } | null
  reviews?: {
    results: Array<{
      id: string
      created_at: string
      content: string
      author: string
      author_details: {
        name: string
        username: string
        avatar_path: string
        rating: number
      }
    }>
  } | null
  externalIds?: {
    imdb_id: string | null
    facebook_id: string | null
    instagram_id: string | null
    twitter_id: string | null
  } | null
  credits?: {
    cast: Array<ICast> | null
  }
  accountStates?: {
    id: number
    favorite: boolean
    rated: {
      value: number
    }
    watchlist?: boolean
  } | null
}
