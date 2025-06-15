// lib/countries.ts
import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

// Regular utility object (not a hook)
const Countries = {
  getAll: () => formattedCountries,
  getByValue: (value: string) => formattedCountries.find((item) => item.value === value),
};

export default Countries;