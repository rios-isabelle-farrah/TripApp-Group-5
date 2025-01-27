import axios from "axios";
import { useState,useContext,useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import "../Style/TripNewForm.css"
import { UserContext } from "../../Providers/UserProvider";

const API = apiURL();

const TripNewForm = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  let { id } = useParams();
  const [trip, setTrip] = useState({
    date: "",
    miles: 0,
    reason: "",
    start_odometer: 0,
    stop_odometer: 0,
    business_use: false,
    favorite: false,
  });


  const addTrip = async (newTrip) => {
    try {
      await axios.post(`${API}/cars/${id}/trips?uid=${user.uid}`, newTrip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.id]: e.target.value });
  };

  const businessCheckbox = (e) => {
    setTrip({ ...trip, business_use: !trip.business_use });
  };

  const favoriteCheckbox = (e) => {
    setTrip({ ...trip, favorite: !trip.favorite });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTrip(trip);
    history.push(`/cars/${id}/trips`);
  };

  const {
    date,
    miles,
    reason,
    start_odometer,
    stop_odometer,
    business_use,
    favorite,
  } = trip;

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div>
      {/* 
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          value={date}
          type="date"
          onChange={handleChange}
          id="date"
          placeholder="date"
          required
        />
        <label htmlFor="miles">miles:</label>
        <input
          id="miles"
          type="number"
          value={miles}
          onChange={handleChange}
          placeholder="Enter overall miles for the trip"
          required
        />
        <label htmlFor="reason">reason:</label>
        <input
          id="reason"
          type="text"
          value={reason}
          onChange={handleChange}
          placeholder="Enter reason for your trip"
          required
        />
        <label htmlFor="start_odometer">Start Odometer:</label>
        <input
          id="start_odometer"
          type="number"
          value={start_odometer}
          min="0"
          placeholder="Enter the mileage show on the odometer at start of trip"
          onChange={handleChange}
        />
        <label htmlFor="stop_odometer">Stop Odometer:</label>
        <input
          id="stop_odometer"
          type="number"
          value={stop_odometer}
          placeholder="Enter the mileage show on the odometer at end of trip"
          onChange={handleChange}
        />
        <label htmlFor="business_use">Business Use:</label>
        <input
          id="business_use"
          type="checkbox"
          onChange={businessCheckbox}
          checked={business_use}
        />
        <label htmlFor="favorite">Favorite:</label>
        <input
          id="favorite"
          type="checkbox"
          onChange={favoriteCheckbox}
          checked={favorite}
        />
        <div>
          <button type="submit">Submit</button>
          <Link to={`/cars/${id}/trips`}>
            <button>Cancel</button>
          </Link>
        </div>
      </form> */}

      <div>
        <form className="form-trip" onSubmit={handleSubmit}>
          Car Mileage
          <table>
            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="date">Date:</label>
              </td>
              <td className="data-td">
                <input
                  value={date}
                  type="date"
                  onChange={handleChange}
                  id="date"
                  placeholder="date"
                  required
                />{" "}
              </td>
            </tr>
            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="amount_spent">miles:</label>
              </td>
              <td className="data-td">
                <input
                  id="miles"
                  type="number"
                  value={miles}
                  onChange={handleChange}
                  placeholder="Enter overall miles for the trip"
                  required
                />{" "}
              </td>
            </tr>
            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="reason">reason:</label>
              </td>
              <td className="data-td">
                <input
                  id="reason"
                  type="text"
                  value={reason}
                  onChange={handleChange}
                  placeholder="Enter reason for your trip"
                  required
                />{" "}
              </td>
            </tr>

            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="start_odometer">Start Odometer:</label>
              </td>
              <td className="data-td">
                <input
                  id="start_odometer"
                  type="number"
                  value={start_odometer}
                  min="0"
                  placeholder="Enter the mileage show on the odometer at start of trip"
                  onChange={handleChange}
                />{" "}
              </td>
            </tr>
            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="stop_odometer">Stop Odometer:</label>
              </td>
              <td className="data-td">
                <input
                  id="stop_odometer"
                  type="number"
                  value={stop_odometer}
                  min="0"
                  placeholder="Enter the mileage show on the odometer at start of trip"
                  onChange={handleChange}
                />{" "}
              </td>
            </tr>
            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="business_use">Business Use:</label>
              </td>
              <td className="data-td">
                <input
                  id="business_use"
                  type="checkbox"
                  onChange={businessCheckbox}
                  checked={business_use}
                />
              </td>
            </tr>

            <tr>
              {" "}
              <td className="data-td">
                <label htmlFor="favorite">Favorite:</label>
              </td>
              <td className="data-td">
                <input
                  id="favorite"
                  type="checkbox"
                  onChange={favoriteCheckbox}
                  checked={favorite}
                />
              </td>
            </tr>
          </table>
          <div>
            <button className="button-sub" type="submit">
              Submit
            </button>
            <Link to={`/cars/${id}/expenses`}>
              <button className="button-can">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripNewForm;
