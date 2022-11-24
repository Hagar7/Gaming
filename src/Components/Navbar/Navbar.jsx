import { Link } from 'react-router-dom'
import style from './Navbar.module.scss'

export default function Navbar({userData,logout}) {
   
 
  // const uniqueObjects = [...new Map(gamigData.map(item => [item.genre, item])).values()]

  return (
    <>
   <nav className={`${style.navy} navbar navbar-expand-lg navbar-dark`}>
  <div className="container">
    <Link className={`${style.logotitle} navbar-brand`} to="">
        <img src="./images/logo.png" alt="" className={`${style.logo}`}  />
        Game Over</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData?
      <>
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to=''>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to='all'>All</Link>
        </li>


        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu">
          <li ><Link  className="dropdown-item" to={`platform/pc`}>pc</Link></li>
          <li ><Link  className="dropdown-item" to={`platform/browser`}>browser</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort-by
          </Link>
          <ul className="dropdown-menu">
          <li ><Link  className="dropdown-item" to={`sortby/release-date`}>release-date</Link></li>
          <li ><Link  className="dropdown-item" to={`sortby/populairty`}>populairty</Link></li>
          <li ><Link  className="dropdown-item" to={`sortby/alphabetical`}>alphabetical</Link></li>
          <li ><Link  className="dropdown-item" to={`sortby/relevance`}>relevance</Link></li>
          
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
            {/* {uniqueObjects.map((gen,index)=> 
            <li key={index}><Link  className="dropdown-item" to={`category/${gen.genre}`}>{gen.genre}</Link></li>
            )} */}
            <li ><Link  className="dropdown-item" to={`category/battle-royale`}>battle-royale</Link></li>
             <li ><Link  className="dropdown-item" to={`category/shooter`}>shooter</Link></li>
             <li ><Link  className="dropdown-item" to={`category/sports`}>sports</Link></li>
             <li ><Link  className="dropdown-item" to={`category/racing`}>racing</Link></li>
             <li ><Link  className="dropdown-item" to={`category/social`}>social</Link></li>
             <li ><Link  className="dropdown-item" to={`category/open-world`}>open-world</Link></li>
             <li ><Link  className="dropdown-item" to={`category/zombie`}>zombie</Link></li>
             <li ><Link  className="dropdown-item" to={`category/flight`}>flight</Link></li>
             <li ><Link  className="dropdown-item" to={`category/action`}>action</Link></li>
             <li ><Link  className="dropdown-item" to={`category/action-rpg`}>action-rpg</Link></li>
             <li ><Link  className="dropdown-item" to={`category/fantasy`}>fantasy</Link></li>
          </ul>
        </li>
          </ul>
      </>:""}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {userData?
          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
            
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item text-muted" >{userData.first_name}</Link></li>
            <li >
           <Link className='dropdown-item text-muted' onClick={logout} >Log out</Link>
         </li>
          </ul>
        </li>
          :<>
          <li className="nav-item">
        <Link className="nav-link " aria-current="page" to='login'>Login</Link>
      </li>
      <li className="nav-item">
        <Link className={`${style.myBtn} nav-link btn btn-outline-info`} to="signup" >Join Free</Link>
      </li>
        </>}   
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}
