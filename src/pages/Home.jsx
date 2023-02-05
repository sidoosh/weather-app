import React from "react";
import {
  Layout,
  Search,
  UnitsToggle,
  WeatherCard,
  Forecast,
} from "../component";
import debounce from "lodash-es/debounce";
const searchTimeoutInMs = 500;

export default function WeatherApp() {
  const [location, setLocation] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [units, setUnits] = React.useState("metric");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position && position.coords) {
        setLocation(
          `lat=${position.coords.latitude}&long=${position.coords.longitude}`
        );
      } else {
        setLocation("Bengaluru");
      }
    });
  }, []);

  const debounceSearch = React.useMemo(
    () =>
      debounce((searchTerm) => {
        setLocation(searchTerm);
      }, searchTimeoutInMs),
    []
  );

  const handleLocationChange = (location) => {
    setIsSearching(true);
    if (location) {
      debounceSearch(location);
    }
    setIsSearching(false);
  };

  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits);
  };

  return (
    <div className="min-h-screen dark:bg-black">
      <Layout>
        <main style={{ margin: "2rem 0" }}>
          <div className="mx-auto w-5/6 md:w-full xl:max-w-6xl 2xl:max-w-7xl">
            <Search
              location={location}
              isSearching={isSearching}
              onLocationChange={
                (event) => handleLocationChange(event.target.value)
                // setDebouncedSearchTerm(event.target.value)
              }
            />
            <div className="divide-light-blue-400 m-auto mt-4 h-auto w-full divide-y-2 overflow-hidden rounded-lg shadow-lg md:w-3/5 lg:w-1/2">
              <WeatherCard location={location} units={units} />
              <Forecast location={location} units={units} />
            </div>
            <UnitsToggle units={units} onUnitsChange={handleUnitsChange} />
          </div>
        </main>
      </Layout>
    </div>
  );
}
