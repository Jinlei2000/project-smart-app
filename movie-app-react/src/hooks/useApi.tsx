// file is temporarily
import { API_KEY } from '../../env'
import { BASE_URL } from '../constants'
import { ICategory } from '../interfaces/ICategory'
import { IUserdata } from '../interfaces/IUserdata'
import useSessionToken from './useSessionToken'

export default () => {
  const { getSession } = useSessionToken()

  const getUser = (): Promise<IUserdata> => {
    return new Promise((resolve, reject) => {
      getSession()
        .then(sessionToken => {
          fetch(
            `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionToken}`,
          )
            .then(response => response.json())
            .then(data => {
              resolve({
                userName: data.username,
                avatarUrl:
                  data.avatar.gravatar.hash != ''
                    ? `https://www.gravatar.com/avatar/${data.avatar.gravatar.hash}?d=404`
                    : null,
                name: data.name,
                id: data.id,
                firstLetter: data.username.charAt(0).toUpperCase(),
              })
              // console.log('user data', data)
            })
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  }

  const getCategories = (): Promise<ICategory[]> => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          resolve(data.genres)
          // console.log('categories', data.genres)
        })
        .catch(error => reject(error))
    })
  }

  return {
    // getMovies,
    // getMovie,
    getCategories,
    getUser,
    // getFavorites,
    // getWatchlist,
    // getRated,
    // postFavorite,
    // postWatchlist,
    // deleteFavorite,
    // deleteWatchlist,
    // searchMovies,
    // postMovieRating,
    // deleteMovieRating,
  }
}
