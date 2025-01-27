import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import { UserContext } from "../../Providers/UserProvider";

const API = apiURL();

const TripEditForm = () => {
  const user = useContext(UserContext);
  let history = useHistory();
  let { id, trip_id } = useParams();
  const [trip, setTrip] = useState({
    date: "",
    miles: 0,
    reason: "",
    start_odometer: 0,
    stop_odometer: 0,
    business_use: false,
    favorite: false,
  });

  const updateTrip = async (updateTrip) => {
    try {
      await axios.put(
        `${API}/cars/${id}/trips/${trip_id}?uid=${user.uid}`,
        updateTrip
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await axios.get(
          `${API}/cars/${id}/trips/${trip_id}?uid=${user.uid}`
        );
        setTrip(data.payload);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrip();
  }, [trip_id, id, user]);

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
    await updateTrip(trip);
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
  console.log("trip", trip);
  return (
    <div>
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
      </form>
    </div>
  );
};

export default TripEditForm;
