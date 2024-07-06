/*import { useEffect, useState } from "react";
import "./App.css";

import useDebounce from "./useDebounce";

function CountryList({ countries }) {
  if (!countries) return;
  return countries.map((country) => {
    return (
      <div key={`${country.area}`}>
        <span>{country.name.official}</span>{" "}
        <img
          style={{ width: "120px", height: "80px" }}
          src={country.flags.png}
          alt={country.name.common}
        />
      </div>
    );
  });
}

export default function Debounce() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);

  const debounceValue = useDebounce(search);

  useEffect(() => {
    const getCountries = async () => {
      return await fetch(
        `https://restcountries.com/v3.1/name/${debounceValue}`
      )
        .then((res) => {
          if (!res.ok) {
            return new Promise.reject("no country found");
          }
          return res.json();
        })
        .then((list) => {
          setCountries(list);
        })
        .catch((err) => console.error(err));
    };
    if (debounceValue) getCountries();
  }, [debounceValue]);

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search Countries"
        onChange={(e) => setSearch(e.target.value)}
      />
      <hr />
      {search ? <CountryList countries={countries} /> : ""}
    </div>
  );
}
*/