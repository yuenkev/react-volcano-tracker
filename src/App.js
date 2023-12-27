import { useState, useEffect } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader";
import Header from "./components/Header";

function App() {
  // Hooks - eventData is a useState that hold all the events that is gathered from the NASA open API about EONET
  // Loading is a ticker that allows us to display a loading icon until all the data is fetched
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  // UseEffect =  By using this Hook, you tell React that your component needs to do something after render.
  // React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      const { events } = await res.json()
      //console.log(events); 

      setEventData(events);
      setLoading(false);
    }

    fetchEvents();
    // console.log(eventData);
  }, []);

  return (
    <div>
      <Header />
      {/* If not loading --> then display, if not show the loader icon */}
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;

