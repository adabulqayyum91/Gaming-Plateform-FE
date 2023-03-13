import classes from "./games.module.css";
import game1 from "../../../../../assets/images/game1.png";
import game2 from "../../../../../assets/images/game2.png";
import game3 from "../../../../../assets/images/game3.png";
import game4 from "../../../../../assets/images/game4.png";
import game5 from "../../../../../assets/images/game5.png";
import { useEffect, useState } from "react";

const Games = () => {


  const BASE_URL = process.env.REACT_APP_BASE_URL + '/';
  const [gamesData, setGamesData] = useState([]);
  const gamesSection = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    let fetchRes = fetch(
      "https://backend.gamingplateform.com/api/auth/allGames",
      requestOptions
    );
    fetchRes
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setGamesData(json.gameData);
        }
      })
      .catch((e) => {
        console.log(`error is  ${e}`);
      });
  };
  useEffect(() => {
    gamesSection();
  }, []);
  return (
    <div style={{ marginBottom: 120 }}>
      <div>
        <h2 style={{ color: "white" }}>Featured Games</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 15, marginBottom: 30 }}>
        {gamesData && gamesData.map((x, index) => (
          <div key={index} className={classes.gamesDiv} style={{ color: 'white', width: '17%', marginRight: '5%' }}>
            <img src={BASE_URL + x.gameImage} alt={x.gameName} width="100%" height='100%' style={{ opacity: 1, borderRadius: 'inherit' }} />
            <p style={{ color: 'white', marginBottom: 10, marginLeft: 5, zIndex: 1, position: 'absolute', opacity: 2.0, color: 'white' }}>{x.gameName}</p>
          </div>
        ))}
      </div>

      {/* <div style={{ display: "flex", flexDirection: "row", margin: 15 }}>
        <div className={classes.gamesDiv}>
          <img src={game1} alt="" />
        </div>
      </div> */}
    </div>
  );
};
export default Games;
