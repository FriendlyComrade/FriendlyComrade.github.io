import { ApiResponse } from './../../types/ApiResponse';
import {BigApiResponse} from '../../types/BigApiResponse'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Movie } from '../../types/Movie';
import {API_KEY} from '../../api/apiConfig'
import {mapApiResponse, bigMapApiResponse} from '../../api/apiUtils';
import { MovieInfoType } from '../../types/MovieInfoType';

interface GetFound {
    page: number,
    title: string
}

export const moviesAPI = createApi({
    reducerPath: 'moviesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3'
    }),
    endpoints: (build) => ({
        getPopularMovies: build.query<Movie[], number | void>({
            query: (page = 1) => ({
                url: `/movie/popular`, //500
                params: {
                    api_key: API_KEY,
                    page: page
                },
            }),
            transformResponse: (response: {results: ApiResponse[]}) => 
                response.results.map(film => mapApiResponse(film))
        }),
        getMovieInfo: build.query<MovieInfoType, number | string>({
            query: (id: number | string) => ({
                url: `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
            }),
            transformResponse: (response: BigApiResponse) =>
                bigMapApiResponse(response)
        }),
        // getFoundMovies: build.query<Movie[], string>({
        //     query: (title: string) => ({
        //         url: '/search/movie',
        //         params: {
        //             api_key: API_KEY,
        //             query: title
        //         }
                
        //     }),
            getFoundMovies: build.query<Movie[], GetFound>({
                query: (arg) => {
                    console.log(arg)
                    const {page, title} = arg;
                    return {
                        url: '/search/movie',
                        params: {
                            api_key: API_KEY,
                            query: title,
                            page: page
                        }
                    }    
            },
            transformResponse: (response: {results: ApiResponse[]}) => 
                response.results.map(film => mapApiResponse(film))
        })

    })
})
export const {useGetPopularMoviesQuery, useGetMovieInfoQuery, useGetFoundMoviesQuery } = moviesAPI;
