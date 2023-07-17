import React, { useState } from "react";
import styles from "./Main.module.css"
import Swal from "sweetalert2"
const Main=()=>{

const[city,setCity]=useState("");
const[humidity,setHumidity]=useState("")
const[wind,setWind]=useState("")
const[temperature,setTemperature]=useState("")
const[location,setLocation]=useState("")
const[condition,setCondition]=useState("")
const[error,setError]=useState("")
// const alertError=()=>{
//    Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Something went wrong!',
      
//     })
// }
const cityHandler = async () => {
   try {
     const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f26760a2fa0b5044985bc86e933537ae&units=metric`
     );
     const data = await response.json();
 
     if (response.ok) {
       setError("")
       setHumidity(data.main.humidity);
       setWind(data.wind.speed * 3.6);
       setTemperature(data.main.temp);
       setLocation(data.name);
       setCondition(data.weather[0].main);
     } else {
      // alertError()
      Swal.fire({
         icon: "error",
         title: "Invalid City",
         text: "Please enter a valid city name.",
       });
     }
   } catch (error) {
     setError(error.message);
     console.log(error);
   }
 };
 

 const handleKeyDown = (e) => {
   if (e.key === "Enter") {
     cityHandler();
   }
 };
 let weatherImg
 if(condition == "Drizzle"){
    weatherImg="https://i.ibb.co/xqQG4Wm/drizzle.png"
 }
 else if(condition == "Clouds"){
   weatherImg="https://i.ibb.co/KWf03kj/clouds.png"
}
else if(condition == "Clear"){
   weatherImg="https://i.ibb.co/bgHy4Yy/clear.png"
}
else if(condition == "Mist"){
   weatherImg="https://i.ibb.co/S381Ncg/mist.png"
}
else if(condition == "Rain"){
   weatherImg="https://i.ibb.co/qWq7y7J/rain.png"
}
else if(condition == "Snow"){
   weatherImg="https://i.ibb.co/QPvLzts/snow.png"
}
else {
      weatherImg = "https://i.ibb.co/xqQG4Wm/drizzle.png";
    
}
return(
<>
<div className={styles.container}>
    <div className={styles.card}> 
    <div className={styles.search}>
    <input onKeyDown={handleKeyDown} placeholder="ENTER CITY" className={styles.ipfield}type="text"onChange={(e)=>{setCity(e.target.value)}}></input> 
    <p>{error}</p>
    <button className={styles.srchbtn}onClick={cityHandler}>Search</button>

    </div>
    
    <div className={styles.weather}>
       <div><img className={styles.condition}src={weatherImg}></img></div> 
        <div>
        <h1 className={styles.temp}>{Math.round(temperature)}°C</h1>
        <h2 className={styles.location}>{location}</h2>
        </div>
        
    </div>
    <div className={styles.humidity}>
       <div><img src="https://i.ibb.co/zSdLKjf/humidity.png"></img></div> 
       <div className={styles.humpercent}>{humidity + "%"}</div>
       <div className={styles.hum}>HUMIDITY</div>
    </div>
    <div className={styles.windspeed}>
       <div><img src="https://i.ibb.co/h9HnqDK/wind.png"></img></div> 
       <div className={styles.windprcnt}>{Math.round(wind)+" Km/hr"}</div>
       <div className={styles.wind}>WIND</div>
    </div>
    </div>
</div>

</>
)
}
export default Main
