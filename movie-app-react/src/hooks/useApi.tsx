// file is temporarily
import { API_KEY } from '../../env'
import { BASE_URL } from '../constants'
import { enumMovieCategory } from '../enum/enumMovieCategory'
import { ICategory } from '../interfaces/ICategory'
import IMovie from '../interfaces/IMovie'
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

  const getMovies = (
    category: enumMovieCategory,
    page: number,
  ): Promise<IMovie[] | null> => {
    return new Promise((resolve, reject) => {
      fetch(
        `${BASE_URL}/${category}?api_key=${API_KEY}&language=en-BE&page=${page}`,
      )
        .then(response => response.json())
        .then(data => {
          // no results found
          if (data.results === undefined || data.results.length === 0) {
            resolve(null)
            return
          }
          // change the poster path to the full url
          const movies = data.results.map((movie: any) => {
            return {
              id: movie.id,
              title: movie.title,
              releaseDate: movie.release_date,
              rating:
                movie.vote_average * 10 === 0
                  ? 0
                  : Math.round(movie.vote_average * 10),
              posterUrl: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
              overview: movie.overview,
            } as IMovie
          })
          resolve(movies)
          // console.log('movies', data.results)
        })
        .catch(error => reject(error))
    })
  }

  const getWatchlist = (page: number): Promise<IMovie[] | null> => {
    return new Promise((resolve, reject) => {
      getSession()
        .then(sessionToken => {
          getUser().then(user => {
            fetch(
              `${BASE_URL}/account/${user.id}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionToken}&language=en-BE&page=${page}&sort_by=created_at.desc`,
            )
              .then(response => response.json())
              .then(data => {
                // no results found
                if (data.results === undefined || data.results.length === 0) {
                  resolve(null)
                  return
                }
                // change the poster path to the full url
                const movies = data.results.map((movie: any) => {
                  return {
                    id: movie.id,
                    title: movie.title,
                    releaseDate: movie.release_date,
                    rating:
                      movie.vote_average * 10 === 0
                        ? 0
                        : Math.round(movie.vote_average * 10),
                    posterUrl: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
                    overview: movie.overview,
                  } as IMovie
                })
                resolve(movies)
                // console.log('movies', data.results)
              })
              .catch(error => reject(error))
          })
        })
        .catch(error => reject(error))
    })
  }

  const deleteOrAddWatchlist = (movieId: number, watchlist: boolean) => {
    return new Promise((resolve, reject) => {
      getSession()
        .then(sessionToken => {
          getUser().then(user => {
            fetch(
              `${BASE_URL}/account/${user.id}/watchlist?api_key=${API_KEY}&session_id=${sessionToken}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  media_type: 'movie',
                  media_id: movieId,
                  watchlist: watchlist, // true = add to watchlist, false = remove from watchlist
                }),
              },
            )
              .then(response => response.json())
              .then(data => {
                resolve(true)
              })
              .catch(error => reject(error))
          })
        })
        .catch(error => reject(error))
    })
  }

  return {
    getMovies,
    // getMovie,
    getCategories,
    getUser,
    // getFavorites,
    getWatchlist,
    // getRated,
    // deleteOrAddFavorite,
    deleteOrAddWatchlist,
    // searchMovies,
    // postMovieRating,
    // deleteMovieRating,
  }
}
