"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegionGrid } from "./grid/RegionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRegionData } from "./hooks/use-region-data";
import { LoadingState } from "./components/LoadingState";

export function RegionManagement() {
  const [activeTab, setActiveTab] = useState<'regions' | 'countries' | 'cities'>('regions');
  const { isLoading, regions, countries, cities } = useRegionData();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto">
        <Card className="border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
          <CardHeader className="border-b bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <CardTitle>Location Management</CardTitle>
              <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="regions">Regions</TabsTrigger>
                  <TabsTrigger value="countries">Countries</TabsTrigger>
                  <TabsTrigger value="cities">Cities</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-6">
              {isLoading ? (
                <LoadingState />
              ) : (
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="regions" className="m-0">
                    <RegionGrid 
                      type="region"
                      regions={regions}
                      countries={countries}
                      cities={cities}
                    />
                  </TabsContent>
                  <TabsContent value="countries" className="m-0">
                    <RegionGrid 
                      type="country"
                      regions={regions}
                      countries={countries}
                      cities={cities}
                    />
                  </TabsContent>
                  <TabsContent value="cities" className="m-0">
                    <RegionGrid 
                      type="city"
                      regions={regions}
                      countries={countries}
                      cities={cities}
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
