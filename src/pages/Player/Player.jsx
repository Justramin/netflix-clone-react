import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData , setApiData] = useState({
    name:'',
    key:'',
    published_at:'',
    typeof:''
  })



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGYxN2FiYjM4ZjU4ZTNkMGEyY2VhMjQwYTYwYTNjMSIsIm5iZiI6MTczNTU1NDk2NS4yNDQsInN1YiI6IjY3NzI3Nzk1NWI4ZjQyMmI2MDEyN2M2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G1nnXQtvWIFGerR-buAlG-kn-lty-9n53QH_2Z_ooqM'
    }
  };
  

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])


  




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='back_arrow_icon' onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='traier' frameBorder='0' allowFullScreen></iframe>
       <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
       </div>
    </div>
  )
}

export default Player