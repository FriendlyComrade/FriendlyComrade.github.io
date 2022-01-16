export interface Videos {
    key: string,
    site: string,
}

export interface Actors {
    known_for_department: string,
    name: string,
}

export interface Director{
    name: string,
    job: string
}

export interface Country {
        name: string
    }

export interface BigApiResponse {
    poster_path: string;
    overview: string;
    release_date: string;
    id: number,
    original_title: string;
    title: string,
    backdrop_path: string;
    vote_average: number;
    production_countries: Country[];
    videos: {
        results: Videos[]
    },
    credits: {
        cast: Actors[],
        crew: Director[],
    }
}