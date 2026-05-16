import React, { Suspense, lazy } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";

// Lazy Loaded Sections
const HeaderPage = lazy(() => import("../header/Header"));
const SkillsPage = lazy(() => import("../skills/Skills"));
const ProjectPage = lazy(() => import("../projecten/Projects"));
const ContactPage = lazy(() => import("../contact/Contact"));

const SECTION_IDS = ["header", "skills", "projects", "contact"];

interface LandingPageProps {
  showUI: boolean;
  onActiveIndexChange: (index: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ showUI, onActiveIndexChange }) => {
  const activeIndex = useActiveSection(SECTION_IDS);

  React.useEffect(() => {
    onActiveIndexChange(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  return (
    <main className={`scroll-container ui-fade ${showUI ? "visible" : ""}`}>
      <section id="header" className="page-section">
        <Suspense fallback={null}>
          <HeaderPage />
        </Suspense>
      </section>

      <section id="skills" className="page-section">
        <Suspense fallback={null}>
          <SkillsPage />
        </Suspense>
      </section>

      <section id="projects" className="page-section">
        <Suspense fallback={null}>
          <ProjectPage />
        </Suspense>
      </section>

      <section id="contact" className="page-section">
        <Suspense fallback={null}>
          <ContactPage />
        </Suspense>
      </section>
    </main>
  );
};

export default LandingPage;
export { SECTION_IDS };
