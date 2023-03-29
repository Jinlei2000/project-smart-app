// file is temporarily
import { API_KEY } from '../../env'
import { BASE_URL } from '../constants'
import useSessionToken from './useSessionToken'

export default () => {
  const { getSession } = useSessionToken()

  const getUser = () => {
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
                    ? `https://www.gravatar.com/avatar/${data.avatar.gravatar.hash}`
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

  return {
    // getMovies,
    // getMovie,
    // getCategories,
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
