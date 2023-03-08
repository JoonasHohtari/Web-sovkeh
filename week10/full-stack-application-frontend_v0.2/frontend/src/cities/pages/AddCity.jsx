import { useRef } from "react";
import { useMutation } from "react-query";

import "./AddCity.css";

import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";
import { createCity } from "../api/cities";

const AddCity = () => {
  const auth = useContext(AuthContext);

  const capitalRef = useRef();
  const countryRef = useRef();
  const imageRef = useRef();

  const createCityMutation = useMutation({
    mutationFn: createCity,
  });

  const citySubmitHandler = (event) => {
    event.preventDefault();
    createCityMutation.mutate({
      capital: capitalRef.current.value,
      country: countryRef.current.value,
      image: imageRef.current.value,
      token: auth.token,
    });
  };

  return (
    <form className="city-form" onSubmit={citySubmitHandler}>
      <Input ref={capitalRef} type="text" label="Capital" />
      <Input ref={countryRef} type="text" label="Country" />
      <Input ref={imageRef} type="text" label="Image Link" />
      <Button>Add City</Button>
    </form>
  );
};

export default AddCity;
