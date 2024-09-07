export type ArtistType = {
  first_name: string;
  last_name: string;
}

export type CityType = {
  id: number;
  name: string;
}

export type FilmType = {
  id: number;
  name: string;
  releasedCities: number[] | CityType[];
  image: string;
  director: ArtistType;
  description: string;
}