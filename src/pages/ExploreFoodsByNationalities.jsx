import React, { useState, useEffect, useContext } from 'react';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';
import NationalitiesCard from '../components/NationalitiesCard';
import MyContext from '../context/MyContext';
import '../css/Nationalities.css';

function ExploreFoodsByNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const {
    foods,
    setIsFiltered,
    setFilteredFoods,
  } = useContext(MyContext);

  const apiNationalities = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  useEffect(() => {
    const fetchNationalities = async () => {
      const { meals } = await fetch(apiNationalities).then((response) => response.json());
      setNationalities(meals);
    };
    fetchNationalities();
  }, []);

  const handleIsFiltered = ({ value }) => {
    setIsFiltered(true);
    console.log(value);
    if (value !== 'All') {
      const filterNationalities = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      const fetchNationalitiesFilter = async () => {
        console.log(filterNationalities);
        const response = await fetch(filterNationalities);
        console.log('=> fetch', response);
        const data = await response.json();
        console.log(data);
        console.log(data.meals);
        setFilteredFoods(data.meals);
      };
      fetchNationalitiesFilter();
      // const categoriesFilter = foods.filter((food) => (food.strArea === value));
      // setFilteredFoods(categoriesFilter);
    } else {
      setFilteredFoods(foods);
    }
    // console.log(foods);
  };

  return (
    <>
      <Header />
      <label htmlFor="nationalities">
        <select
          className="option-nacionalities"
          id="nationalities"
          name="nationalities"
          data-testid="explore-by-nationality-dropdown"
          onChange={ ({ target }) => {
            handleIsFiltered(target);
          } }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {nationalities.map((national, index) => (
            <option
              data-testid={ `${national.strArea}-option` }
              key={ index }
              value={ national.strArea }
            >
              {national.strArea}
            </option>
          ))}
        </select>
      </label>
      <NationalitiesCard />
      <FooterComponent />
    </>
  );
}

export default ExploreFoodsByNationalities;
