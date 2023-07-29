import React, { useState } from 'react';
import axios from 'axios';
import "./weather.css"
const Weather = () => {
  const [message, setMessage] = useState('');
  const [post, setPost] = useState(null);

console.log(post)
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
const Icon = (currTime <= "18:00:00 PM") ? <img class="icon-top" src="/moon.png" alt="weatherIcon"/> :
<img class="icon-top" src="https://cdn-icons-png.flaticon.com/128/3073/3073665.png" alt="weatherIcon"/>

console.log(currTime)
  function api() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${message}&appid=91f0cf04214630a40bcbd5bd14354f15&units=metric`;
    axios.get(url)
      .then(resp => {
        if (resp.data.status === "error") {
          // Handle the error here if needed
        } else {
          setPost(resp.data);
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the API call
        console.error("Error fetching data:", error.message);
      });
  }

  const handleSubmit = event => {
    event.preventDefault();
    api();
  };

  return (
    
    <div>
      <header>
    <nav>
      <div class="navImage">
        {Icon}
      </div>
      <form class="searchBox" onSubmit={handleSubmit}>
        {/* Your input field here */}
        <input class="search" type="text" value={message} onChange={e => setMessage(e.target.value)} />
        {/* Submit button */}
        <button class="searchIcon" type="submit"></button>
      </form>
    </nav>
  </header>
  <main style={{
      backgroundImage: currTime <= "18:00:00 PM" ? 'url("/night1.jpg")' : 'url("/sun.jpeg")',
      // Other styles can be added here as well
    }}>
      {/* Display the fetched data if available */}
      {post && (
        <div class="firstContainer">
          <p class="top">City: {post.name}</p>
          <p class="top">Date: {currDate}</p>
          <p  class="mid">Temperature: {post.main.temp}°C</p>
          {/* Add other weather data you want to display */}
          {/* <img class="icon-top" src="https://cdn-icons-png.flaticon.com/128/3073/3073665.png" alt="weatherIcon"/> */}
            {Icon}        
          <p class="low">Min temp:{post.main.temp_min}/Max temp:{post.main.temp_max}</p>
        </div>
      )}
  </main>
      
    </div>
  );
};

export default Weather;
