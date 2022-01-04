import { Movie } from './../types/Movie';
import { ApiResponse } from './../types/ApiResponse';
import { BigApiResponse } from '../types/BigApiResponse';
import { MovieInfoType } from '../types/MovieInfoType';

export const mapApiResponse = ({
    poster_path,
    overview,
    release_date,
    id,
    original_title,
    title,
    backdrop_path,
    vote_average
}: ApiResponse): Movie => ({
    posterPath: poster_path,
    overview: overview,
    releaseDate: release_date ? release_date.slice(0, 4) : release_date,
    id: id,
    originalTitle: original_title,
    title: title,
    backdropPath: backdrop_path,
    voteAverage: vote_average
});


export const bigMapApiResponse = ({
    poster_path,
    overview,
    release_date,
    id,
    original_title,
    title,
    backdrop_path,
    vote_average,
    production_countries,
    videos,
    credits
}: BigApiResponse): MovieInfoType => ({
    posterPath: poster_path,
    overview: overview,
    releaseDate: release_date ? release_date.slice(0, 4) : release_date,
    id: id,
    originalTitle: original_title,
    title: title,
    backdropPath: backdrop_path,
    voteAverage: vote_average,
    countries: production_countries,
    videos: videos,
    credits: credits
});

