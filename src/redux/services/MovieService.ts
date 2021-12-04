import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_KEY = `api_key=0dcd550c1ae54344d3263ec58df4a494`;

interface Film {
    poster_path: string | null,
    adult: boolean,
    overview: string,
    release_date: string,
    genre_ids: number[],
    id: number,
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string | null,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}

// type Popular = Array<Film>

interface Popular {results: Array<Film>}




export const moviesAPI = createApi({
    reducerPath: 'moviesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/movie'
    }),
    endpoints: (build) => ({
        fetchAllMovies: build.query<Popular, string>({
            query: () => ({
                url: `/popular?${API_KEY}&language=en-US&page=1`,
            })
        })
    })
})