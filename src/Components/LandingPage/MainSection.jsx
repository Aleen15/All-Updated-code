import React from "react";
import "./MainSection.css";
import land from "../Assets/land.jpg"

const MainSection = () => {
  return (
    <section className="main-section">
      <div className="content">
        <h1>Stock Market Investment Platform</h1>
        <p>
          A brand new platform to buy, sell your stocks through online....!
        </p>
        <div className="buttons">
          <button className="btn-green"><a href="/login">Login</a></button>
          <button className="btn-blue"><a href="/register">Regiter</a></button>
        </div>
      </div>
      <div className="mockups">
        <img
          src={land}
          alt="Device mockups"
          className="mockups-img"
        />
      </div>
    </section>
  );
};

export default MainSection;
