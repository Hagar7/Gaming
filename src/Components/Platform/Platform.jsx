import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import style from './Platform.module.scss'


export default function Platform() {
    let params =useParams();
    
    let [platformData,setPlatformData] =useState([])
    let[previewData,setPreviewData]= useState(12)
   

   let Platform = async()=>{
       let { data } = await axios.get(
           `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${params.platform}`,
           {  
             headers: {
               "X-RapidAPI-Key":
                 "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
               "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
             },
           }
         );

         setPlatformData(data);
      
   }
   useEffect(() => {
    Platform()
   }, [params.platform])
   
   
   let test = ()=>{
     setPreviewData(prevValue => prevValue + 8)
   }
  return (
    <>
    <div className="container">
      {platformData.length>0?
      <>
         <div className="row pt-3 ">
         {platformData.slice(0,previewData).map((item, index) => (
           <div key={index} className={`${style.items} col-md-3`}>
            <Link className="nav-link" to={`/gameDetails/${item.id}`}>
             <div className={`${style.item} `}>
               <img src={item.thumbnail} alt="" className="w-100" />
               <div className={`${style.itemBottom} p-3`}>
               <div className={`${style.itemFooter} `}>
                 <h3 className={`${style.title} text-muted mt-2`}>{item.title.split(" ").slice(0,2).join(" ") + "..."}</h3>
                 <span className={`${style.myBtn} mt-2 btn btn-primary`}>
                   Free
                 </span>
               </div>
               <div className={`${style.desc}`}>
                 <p className="text-muted ">{item.short_description.split(" ").slice(0,3).join(" ") + "..."}</p>
               </div>
               <div className={`${style.btns}`}>
                 <i className="fa fa-plus-square"></i>
                 <div className={`${style.btnsRight}`}>
                   <div className={`${style.genre}`}>

                   <span>{item.genre}</span>
                   </div>

                <i className="fab fa-windows"/>
                 </div>

               </div>
               </div>
               
             </div>
             </Link>
             
           </div>
         ))}
       </div>
       <div className="text-center my-3">
       <button onClick={test} className={`${style.myBtn} btn btn-danger`}>Load More</button>
       </div>
       </>
       :
       <div className={`${style.loading}`}>
       <i className={`${style.child1} fa-brands fa-xbox fa-spin`}></i>
       <i className={`${style.child2} fa-brands fa-xbox fa-spin`}></i>
       <i className={`${style.child3} fa-brands fa-xbox fa-spin`}></i>
       <i className={`${style.child4} fa-brands fa-xbox fa-spin`}></i>
     </div>
    }
    </div>
  </>
  )
}
