export interface City {
  id: string;
  name: string;
  countyId: string;
}

export interface County {
  id: string;
  name: string;
  regionId: string;
  cities: City[];
}

export interface Region {
  id: string;
  name: string;
  counties: County[];
}

export type RegionWithRelations = Region & {
  totalCounties: number;
  totalCities: number;
}
