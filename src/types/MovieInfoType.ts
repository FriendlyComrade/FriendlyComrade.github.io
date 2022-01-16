import { Actors, Country, Director, Videos } from "./BigApiResponse";

export interface MovieInfoType {
    posterPath: string,
    overview: string,
    releaseDate: string,
    id: number,
    originalTitle: string,
    title: string,
    backdropPath: string,
    countries: Country[];
    voteAverage: number,
    videos: {
        results: Videos[]},
    credits: {
        cast: Actors[],
        crew: Director[]
    }
}