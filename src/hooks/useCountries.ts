// hooks/useCountries.ts
import Countries from "@/utils/Countries";

const useCountries = () => {
  // You could add state here if needed
  return Countries; // Reuses the same utility
};

export default useCountries;