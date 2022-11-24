import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Details.module.scss';

export default function Details() {
    let params = useParams();
    let [itemDetailsData,setItemDetailsData] = useState([]);
    let [minData,setMinData] = useState([]);
    let [screenData,setScreenData] = useState([]);
 

    let gameDetails = async()=>{
        let { data } = await axios.get(
            `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${params.id}`,
            {
              headers: {
                "X-RapidAPI-Key":
                  "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
              },
            }
            
          );
          let minResponse = data.minimum_system_requirements;
          let screenResponse = data.screenshots;
          setItemDetailsData(data);
          setMinData(minResponse)
          setScreenData(screenResponse)
          console.log(screenResponse);
        
          
    }
    useEffect(() => {
        gameDetails()
    },[])
    
 
  return (
 <>
 <div className={`${style.detail}`}>
 <div className="container">
  
 <div className="row pt-4 g-5">
        <div className="col-lg-4">
        <div className={`${style.item}`}>
        <img src={itemDetailsData.thumbnail} alt="gameImg" className='w-100' />
        <div className={`${style.left} pt-3`}>
        <button className={`${style.myBtn} btn btn-dark text-muted`}>Free</button>
        <a className={`${style.btnright} btn btn-primary`} target="_blank" rel="noreferrer" href={itemDetailsData.freetogame_profile_url}>Play Now <i className='fa-regular fa-share-from-square'/></a>
        </div>
          </div>

        </div>
        <div className="col-lg-8">
        <div className={`${style.bio}`}>
        <h2>{itemDetailsData.title}</h2>
        <h5>About {itemDetailsData.title}</h5>
        <p>{itemDetailsData.description}</p>
        <h5 className='pt-3'>Minimum System Requirements</h5>
        <h6>graphics : {minData.graphics}</h6>
        <h6>memory : {minData.memory}</h6>
        <h6>os : {minData.os}</h6>
        <h6>processor :{minData.processor}</h6>
        <h6>storage : {minData.storage}</h6>
        <h5 className='pt-5'>Enlisted Screenshots</h5>

        {/* slider */}
        
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel ">
      <div className="carousel-inner">
        {screenData.map((item,index)=>
        <div className="carousel-item active" key={index} mouse='true'>
        <img src={item.image} className="d-block w-100" alt="slider" />
          </div>
        )
        }
      </div>
      </div>
      <h4 className='pt-3 pb-3'>Additional Information</h4>

      <div className={`${style.footerItem}`}>
        <div className={`${style.itm}`}>
        <h6 className='text-muted'>Title</h6>
        <h5 className={`${style.small}`}>{itemDetailsData.title}</h5>
        </div>
        <div className={`${style.itm}`}>
        <h6 className='text-muted'>Developer</h6>
        <h5 className={`${style.small}`}>{itemDetailsData.developer}</h5>
        </div>
        <div className={`${style.itm}`}>
        <h6 className='text-muted'>Publisher</h6>
        <h5 className={`${style.small}`}>{itemDetailsData.publisher}</h5>
        </div>
      </div>
      <div className={`${style.footerItem}`}>
        <div className={`${style.itm}`}>
        <h6 className='text-muted'>Release Date</h6>
        <h5 className={`${style.small}`}>{itemDetailsData.release_date}</h5>
        </div>
        <div className={`${style.itm}`}>
        <h6 className='text-muted'>Genre</h6>
        <h5 className={`${style.small}`} >{itemDetailsData.genre}</h5>
        </div>
        <div className={`${style.itm}`}>
        <h6 className='text-muted'>Platform</h6>
        <h5 className={`${style.small}`}>{itemDetailsData.platform}</h5>
        </div>

      </div> 
          </div>
        </div>
</div>

  </div>
 </div>
 </>
  )
}
