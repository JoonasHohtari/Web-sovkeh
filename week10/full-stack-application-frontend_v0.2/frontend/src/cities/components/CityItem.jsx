import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import Card from "../../shared/components/card/Card";
import Button from "../../shared/components/button/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { deleteCity } from "../api/cities";
import Modal from "../../shared/components/modal/Modal";
import "./CityItem.css";

const CityItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const cancelConfirmationHandler = () => {
    setShowConfirmationModal(false);
  };

  const showConfirmationModalHandler = () => {
    setShowConfirmationModal(true);
  };

  const deleteConfirmationHandler = () => {
    setShowConfirmationModal(false);
    console.log("Deleting... are we here?");
    deleteCityMutation.mutate({
      id: props.id,
      token: auth.token,
    });
  };

  const deleteCityMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: (data) => {
      console.log("Deleted city: ", data);
    },
    onError: (error) => {
      console.log("Error deleting city: ", error);
    },
  });

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button danger onClick={deleteConfirmationHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>Delete the city? Once it is gone, it's gone forever!</p>
      </Modal>

      <li className="city-item">
        <Card className="city-item__content">
          <div className="city-item__image">
            <img src={props.image} alt={props.capital} />
          </div>
          <div className="city-item__info">
            <h3>
              {props.capital} - {props.country}
            </h3>
          </div>
          <div className="city-item_actions">
            {auth.isLoggedIn && (
              <Button danger onClick={showConfirmationModal}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default CityItem;
