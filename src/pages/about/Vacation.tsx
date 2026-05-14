import React from "react";
import "./About.scss";

const VacationPage: React.FC<{ showUI: boolean }> = ({ showUI }) => {
  return (
    <div className={`about-container ui-fade ${showUI ? "visible" : ""}`}>
      <main className="about-content">
        <section className="about-section">
          <h1>Vacation</h1>
          <p>
            Traveling and exploring new cultures is a big part of my life. 
          </p>
          <p>
            There's always something new to discover!
          </p>
        </section>
      </main>
    </div>
  );
};

export default VacationPage;
