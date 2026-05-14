import React from "react";
import "./About.scss";

const MoviesPage: React.FC<{ showUI: boolean }> = ({ showUI }) => {
  return (
    <div className={`about-container ui-fade ${showUI ? "visible" : ""}`}>
      <main className="about-content">
        <section className="about-section">
          <h1>Movies I Like</h1>
          <p>
            I love watching movies that challenge the mind or provide a great escape. 
            From sci-fi epics to classic dramas, here are some of my favorites:
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>🎬 Interstellar</li>
            <li>🎬 Inception</li>
            <li>🎬 The Dark Knight</li>
            <li>🎬 Blade Runner 2048</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MoviesPage;
