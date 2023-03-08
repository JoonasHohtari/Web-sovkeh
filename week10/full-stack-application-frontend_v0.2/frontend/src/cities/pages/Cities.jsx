import React from "react";
import { useQuery } from 'react-query'

import CitiesList from '../components/CitiesList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'

import { getCities } from "../api/cities";

const Cities = () => {
  const { isLoading, error, data } = useQuery(
    "citiesData", 
    getCities
  );

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <CitiesList items={data} />
  )
};

export default Cities;