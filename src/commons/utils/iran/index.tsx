import Cities from './cities'
import { CityType } from './models'
import Provinces from './province'

const Iran = {
  Cities,
  Provinces
}

export default Iran

export const getCityByName = (name: string): CityType => {
  return Iran.Cities.find(city => city.title === name)
} 
