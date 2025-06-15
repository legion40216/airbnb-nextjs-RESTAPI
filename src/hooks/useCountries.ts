// hooks/useCountries.ts
import countryUtils from "@/utils/countryUtils";

const useCountries = () => {
  // You could add state here if needed
  return countryUtils; // Reuses the same utility
};

export default useCountries;