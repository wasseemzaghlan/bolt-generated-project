import { Region, County, City } from '@/types/region';

export const regions: Region[] = [
  {
    id: '1',
    name: 'Western Region',
    counties: [
      {
        id: '1',
        name: 'Coastal County',
        regionId: '1',
        cities: [
          { id: '1', name: 'Seaside City', countyId: '1' },
          { id: '2', name: 'Harbor Town', countyId: '1' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Eastern Region',
    counties: [
      {
        id: '2',
        name: 'Mountain County',
        regionId: '2',
        cities: [
          { id: '3', name: 'Summit City', countyId: '2' },
          { id: '4', name: 'Valley Town', countyId: '2' },
        ],
      },
    ],
  },
];

export function getRegionsWithStats(): RegionWithRelations[] {
  return regions.map((region) => ({
    ...region,
    totalCounties: region.counties.length,
    totalCities: region.counties.reduce((acc, county) => acc + county.cities.length, 0),
  }));
}
