// file is temporarily
import { API_KEY } from '../../env'
import { BASE_URL } from '../constants'
import { enumMovieCategory } from '../enum/enumMovieCategory'
import { ICategory } from '../interfaces/ICategory'
import IMovie from '../interfaces/IMovie'
import IMovieDetail from '../interfaces/IMovieDetail'
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
                    ? `https://www.gravatar.com/avatar/${data.avatar.gravatar.hash}?d=404&s=128`
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

  const getRandomMovie = (): Promise<IMovie | null> => {
    const randomPage = Math.floor(Math.random() * 250) + 1

    return new Promise((resolve, reject) => {
      fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-BE&include_adult=false&page=${randomPage}&certification_country=US`,
      )
        .then(response => response.json())
        .then(data => {
          // no results found
          if (data.results === undefined || data.results.length === 0) {
            resolve(null)
            return
          }
          // get random movie
          let randomMovie =
            data.results[Math.floor(Math.random() * data.results.length)]

          // check if the movie has a poster
          if (randomMovie.poster_path === null) {
            resolve(null)
            return
          }

          resolve({
            id: randomMovie.id,
            title: randomMovie.title,
            releaseDate: randomMovie.release_date,
            rating:
              randomMovie.vote_average * 10 === 0
                ? 0
                : Math.round(randomMovie.vote_average * 10),
            posterUrl: `https://image.tmdb.org/t/p/w780${randomMovie.poster_path}`,
            overview: randomMovie.overview,
          } as IMovie)
        })
        .catch(error => reject(error))
    })
  }

  const getMovieById = (movieId: number): Promise<IMovieDetail | null> => {
    return new Promise((resolve, reject) => {
      getSession()
        .then(sessionToken => {
          fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&session_id=${sessionToken}&language=en-BE&append_to_response=videos,similar,reviews,external_ids,credits,account_states`,
          )
            .then(response => response.json())
            .then(data => {
              // no results found
              if (
                data === undefined ||
                data.length === 0 ||
                data.success === false
              ) {
                resolve(null)
                return
              }
              // change the poster path to the full url
              const movie = {
                id: data.id,
                title: data.title,
                releaseDate: data.release_date,
                rating:
                  data.vote_average * 10 === 0
                    ? 0
                    : Math.round(data.vote_average * 10),
                posterUrl:
                  data.poster_path === null
                    ? ''
                    : `https://image.tmdb.org/t/p/w780${data.poster_path}`,
                overview: data.overview,
                genres: data.genres,
                runtime: data.runtime,
                videos: data.videos.results,
                similar: data.similar.results,
                reviews: data.reviews.results,
                externalIds: data.external_ids,
                credits: data.credits,
                accountStates: data.account_states,
              } as IMovieDetail
              resolve(movie)
              // console.log('movie', data)
            })
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  }

  return {
    getMovies,
    getMovieById,
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
    getRandomMovie,
  }
}
