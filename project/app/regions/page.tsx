"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegionsTab } from "@/components/regions/regions-tab";
import { CountiesTab } from "@/components/regions/counties-tab";
import { CitiesTab } from "@/components/regions/cities-tab";
import { useState } from "react";
import { Region, County, City } from "@/types/region";
import { regions as initialRegions } from "@/lib/data";

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>(initialRegions);

  const handleAddRegion = (data: { name: string }) => {
    const newRegion: Region = {
      id: String(regions.length + 1),
      name: data.name,
      counties: [],
    };
    setRegions([...regions, newRegion]);
  };

  const handleEditRegion = (id: string, data: { name: string }) => {
    setRegions(
      regions.map((region) =>
        region.id === id ? { ...region, name: data.name } : region
      )
    );
  };

  const handleDeleteRegion = (id: string) => {
    setRegions(regions.filter((region) => region.id !== id));
  };

  const handleAddCounty = (data: { name: string; regionId: string }) => {
    const newCounty: County = {
      id: String(Date.now()),
      name: data.name,
      regionId: data.regionId,
      cities: [],
    };
    setRegions(
      regions.map((region) =>
        region.id === data.regionId
          ? { ...region, counties: [...region.counties, newCounty] }
          : region
      )
    );
  };

  const handleEditCounty = (id: string, data: { name: string; regionId: string }) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) =>
          county.id === id ? { ...county, name: data.name, regionId: data.regionId } : county
        ),
      }))
    );
  };

  const handleDeleteCounty = (countyId: string) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.filter((county) => county.id !== countyId),
      }))
    );
  };

  const handleAddCity = (data: { name: string; countyId: string }) => {
    const newCity: City = {
      id: String(Date.now()),
      name: data.name,
      countyId: data.countyId,
    };
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) =>
          county.id === data.countyId
            ? { ...county, cities: [...county.cities, newCity] }
            : county
        ),
      }))
    );
  };

  const handleEditCity = (id: string, data: { name: string; countyId: string }) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) => ({
          ...county,
          cities: county.cities.map((city) =>
            city.id === id ? { ...city, name: data.name, countyId: data.countyId } : city
          ),
        })),
      }))
    );
  };

  const handleDeleteCity = (cityId: string) => {
    setRegions(
      regions.map((region) => ({
        ...region,
        counties: region.counties.map((county) => ({
          ...county,
          cities: county.cities.filter((city) => city.id !== cityId),
        })),
      }))
    );
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Region Management</h1>
      <Tabs defaultValue="regions">
        <TabsList className="mb-8">
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="counties">Counties</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
        </TabsList>
        <TabsContent value="regions">
          <RegionsTab
            regions={regions}
            onAdd={handleAddRegion}
            onEdit={handleEditRegion}
            onDelete={handleDeleteRegion}
          />
        </TabsContent>
        <TabsContent value="counties">
          <CountiesTab
            regions={regions}
            onAdd={handleAddCounty}
            onEdit={handleEditCounty}
            onDelete={handleDeleteCounty}
          />
        </TabsContent>
        <TabsContent value="cities">
          <CitiesTab
            regions={regions}
            onAdd={handleAddCity}
            onEdit={handleEditCity}
            onDelete={handleDeleteCity}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
