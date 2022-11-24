// import axios from "axios";
// import React, { useEffect} from "react";
import { useContext } from "react";
import {  Link, useNavigate } from "react-router-dom";
import  { AllGaming } from "../../Context/GamingContext";
import style from "./Home.module.scss";


export default function Home() {
   const {gamigData} = useContext(AllGaming)
   

  let navigate = useNavigate()
  let goToAll = ()=>{
    navigate('all')
  }

  return (
    <>
      <div className={`${style.home} text-center p-5 `}>
        <h2 className="h1 text-muted">
          Find & track the best <span>free-to-play</span> games!
        </h2>
        <p className="text-muted">
          Track what you've played and search for what to play next! Plus get
          free premium loot!
        </p>
        <button className={`${style.myBtn} btn btn-outline-secondary`} onClick={goToAll} >
          Browse Games
        </button>
      </div>
      <div className={`${style.info} my-5`}>
        <div className="container">
          <h3 className="text-muted">
            <i className="fas fa-robot mr-2" />
            Personalized Recommendations
          </h3>
          <div className="row pt-3 ">
            {gamigData.slice(3, 6).map((item, index) => (
              <div key={index} className={`${style.items} col-lg-4`}>
                <Link className="nav-link" to={`/gameDetails/${item.id}`}>
                <div className={`${style.item} `}>
                  <img src={item.thumbnail} alt="" className="w-100" />
                  <div className={`${style.itemFooter} p-3`}>
                    <h3 className="h5 text-muted mt-2">{item.title}</h3>
                    <span className={`${style.myBtn} mt-2 btn btn-primary`}>
                      Free
                    </span>
                  </div>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
