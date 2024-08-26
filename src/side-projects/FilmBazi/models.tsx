export type ArtistType = {
  first_name: string;
  last_name: string;
}

export type CityType = {
  id: number;
  name: string;
}

export type FilmType = {
  name: string;
  releasedCities: CityType[];
  image: string;
  director: ArtistType;
  description: string;
}