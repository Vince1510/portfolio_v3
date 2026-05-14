import React from "react";
import "./About.scss";

const SeriesPage: React.FC<{ showUI: boolean }> = ({ showUI }) => {
  return (
    <div className={`about-container ui-fade ${showUI ? "visible" : ""}`}>
      <main className="about-content">
        <section className="about-section">
          <h1>Series I Like</h1>
          <p>
            Binge-watching great stories is one of my favorite ways to unwind. 
            Here are some series that I found absolutely captivating:
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>📺 Breaking Bad</li>
            <li>📺 Dark</li>
            <li>📺 Arcane</li>
            <li>📺 The Expanse</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default SeriesPage;
