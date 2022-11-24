import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AllGaming= createContext(null);

export default function AllGamingProvider(props) {
    let [gamigData, setgmaingData] = useState([]);
    let gaming = async () => {
        let { data } = await axios.get(
          `https://free-to-play-games-database.p.rapidapi.com/api/games`,
          {
            headers: {
              "X-RapidAPI-Key":
                "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        setgmaingData(data); 
       
       
      };

      useEffect(() => {
        gaming();
      }, []);

    return <AllGaming.Provider value={{gamigData}}>
        {props.children}

    </AllGaming.Provider>

}

