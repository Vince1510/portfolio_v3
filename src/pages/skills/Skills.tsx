import React, { useEffect } from "react";
import { Typography, Divider, Grid } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage: React.FC = () => {
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
      clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });

    // Blob Animation JS
    const allCards = document.querySelectorAll(".card");

    const handleMouseMove = (ev: MouseEvent) => {
      allCards.forEach((card) => {
        const blob = card.querySelector(".blob") as HTMLElement;
        const fblob = card.querySelector(".fakeblob") as HTMLElement;
        const rec = fblob.getBoundingClientRect();

        blob.style.opacity = "1";

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - rec.width / 2
              }px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="skills-container">
      <Divider />
      <Grid container spacing={2} className="skills-grid">
        {skills.map((skill, index) => (
          <Grid item xs={6} sm={6} md={4} key={index} className="skewElem">
            <div className="card">
              <div className="inner">
                <Typography variant="h5">{skill.title}</Typography>
                {skill.icon}
              </div>
              <div className="blob"></div>
              <div className="fakeblob"></div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

interface Skill {
  title: string;
  icon: JSX.Element;
}

const skills: Skill[] = [
  {
    title: "JavaScript",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm7.334 13.055c.72.58 1.438.865 2.156.858c.44 0 .778-.08 1.012-.242a.75.75 0 0 0 .341-.66a.971.971 0 0 0-.34-.748c-.235-.205-.679-.41-1.332-.616c-.784-.227-1.39-.52-1.815-.88c-.418-.36-.63-.862-.638-1.507c0-.609.264-1.118.792-1.529c.514-.41 1.17-.616 1.97-.616c1.114 0 2.009.271 2.683.814l-.77 1.199a2.597 2.597 0 0 0-.935-.462a3.211 3.211 0 0 0-.946-.165c-.38 0-.685.07-.913.209c-.227.14-.34.323-.34.55c0 .25.139.462.417.638c.28.169.756.356 1.43.561c.814.242 1.394.565 1.738.968c.345.403.517.917.517 1.54c0 .638-.245 1.188-.737 1.65c-.484.455-1.188.693-2.112.715c-1.21 0-2.222-.363-3.036-1.089zm-5.53.638c.235.147.517.22.847.22c.345 0 .63-.099.858-.297c.227-.205.341-.561.341-1.067v-5.302h1.485v5.588c-.022.865-.271 1.489-.748 1.87a2.466 2.466 0 0 1-.891.484a3.296 3.296 0 0 1-.935.143c-.55 0-1.038-.095-1.463-.286c-.455-.205-.836-.568-1.144-1.089l1.034-.847c.19.257.396.451.616.583"
        />
      </svg>
    ),
  },
  {
    title: "TypeScript",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M19.24 3H4.76A1.76 1.76 0 0 0 3 4.76v14.48A1.76 1.76 0 0 0 4.76 21h14.48A1.76 1.76 0 0 0 21 19.24V4.76A1.76 1.76 0 0 0 19.24 3m-5.8 10h-2.25v6.44H9.4V13H7.15v-1.46h6.29zm5.8 5.28a1.71 1.71 0 0 1-.67.74a3 3 0 0 1-1 .39a5.81 5.81 0 0 1-1.2.12a7 7 0 0 1-1.23-.11a4.52 4.52 0 0 1-1-.33v-1.71l-.06-.06h.06v.07a3.41 3.41 0 0 0 1 .54a3.06 3.06 0 0 0 1.13.2a2.58 2.58 0 0 0 .6-.06a1.47 1.47 0 0 0 .42-.17a.75.75 0 0 0 .25-.25a.69.69 0 0 0-.06-.74a1.24 1.24 0 0 0-.35-.33a3.12 3.12 0 0 0-.53-.3l-.67-.28a3.57 3.57 0 0 1-1.37-1a2 2 0 0 1-.46-1.33a2.16 2.16 0 0 1 .24-1.06a2.09 2.09 0 0 1 .66-.71a2.88 2.88 0 0 1 1-.42a5.11 5.11 0 0 1 1.19-.13a7 7 0 0 1 1.09.07a4.53 4.53 0 0 1 .88.23v1.65a2.42 2.42 0 0 0-.42-.24a3.58 3.58 0 0 0-.49-.17a3 3 0 0 0-.49-.1a2.45 2.45 0 0 0-.46 0a2.29 2.29 0 0 0-.56.06a1.54 1.54 0 0 0-.43.16a.78.78 0 0 0-.26.25a.63.63 0 0 0-.09.33a.62.62 0 0 0 .1.35a1.19 1.19 0 0 0 .3.29a2.15 2.15 0 0 0 .46.28l.63.28a6.56 6.56 0 0 1 .84.42a2.65 2.65 0 0 1 .64.49a1.79 1.79 0 0 1 .42.63a2.48 2.48 0 0 1 .14.85a2.68 2.68 0 0 1-.25 1.08z"
        />
      </svg>
    ),
  },
  {
    title: "HTML",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="m3 2l1.578 17.824L12 22l7.467-2.175L21 2zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565l-4.246 1.381l-4.281-1.455l-.288-2.932h2.024l.16 1.411l2.4.815l2.346-.763l.297-3.005H7.416l-.562-6.05h10.412z"
        />
      </svg>
    ),
  },
  {
    title: "CSS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="m3 2l1.578 17.834L12 22l7.468-2.165L21 2zm13.3 14.722l-4.293 1.204H12l-4.297-1.204l-.297-3.167h2.108l.15 1.526l2.335.639l2.34-.64l.245-3.05h-7.27l-.187-2.006h7.64l.174-2.006H6.924l-.176-2.006h10.506z"
        />
      </svg>
    ),
  },
  {
    title: "React",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a23 23 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16zm6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86zm-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86zm2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a23 23 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9"
        />
      </svg>
    ),
  },
  {
    title: "Material-UI",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M8 16.61v-1.24l6-3.46V7.23l-5 2.89l-5-2.89V13l-1 .58L2 13V5l1.07-.62L9 7.81l3.93-2.27l2-1.16L16 5v8.06L10.92 16l4.05 2.33l5.03-2.9V11l1-.58l1 .58v5.58l-7.03 4.06zm14-6.86l-1 .58l-1-.58V8.58L21 8l1 .58z"
        />
      </svg>
    ),
  },
  {
    title: "Ant Design",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M17.451 6.68c.51-.506.51-1.33 0-1.837L15.578 2.97l.003.002l-2.554-2.55a1.463 1.463 0 0 0-2.05.013L.427 10.98a1.443 1.443 0 0 0 0 2.047l10.549 10.54a1.45 1.45 0 0 0 2.05 0l4.423-4.42a1.297 1.297 0 0 0 0-1.838a1.305 1.305 0 0 0-1.84 0l-3.35 3.354a.346.346 0 0 1-.495 0l-8.427-8.419a.346.346 0 0 1 0-.495l8.424-8.42l.035-.029a.34.34 0 0 1 .46.03l3.354 3.35a1.3 1.3 0 0 0 1.841 0m-8.244 5.376a2.848 2.846 0 1 0 5.696 0a2.848 2.846 0 1 0-5.696 0m14.367-1.034L20.28 7.743a1.303 1.303 0 0 0-1.841.003a1.297 1.297 0 0 0 0 1.838l2.224 2.222c.14.139.14.356 0 .495l-2.192 2.19a1.297 1.297 0 0 0 0 1.837a1.305 1.305 0 0 0 1.84 0l3.264-3.26a1.445 1.445 0 0 0-.002-2.047"
        />
      </svg>
    ),
  },
  {
    title: "Next.js",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m4-14h-1.35v4H16zM9.346 9.71l6.059 7.828l1.054-.809L9.683 8H8v7.997h1.346z"
        />
      </svg>
    ),
  },
  {
    title: "SCSS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m-2 13.33c.16.54.14 1.04 0 1.5c0 .05-.04.1-.06.17c-.02 0-.04.07-.07.12c-.11.24-.27.47-.46.67c-.58.64-1.41.88-1.74.68c-.38-.22-.17-1.12.49-1.83c.72-.76 1.76-1.26 1.76-1.26zm8.27-9.05c-.45-1.78-3.4-2.36-6.18-1.37c-1.66.59-3.46 1.51-4.75 2.72c-1.53 1.44-1.78 2.69-1.68 3.21c.34 1.84 2.88 3.05 3.92 3.94v.01c-.3.15-2.54 1.28-3.08 2.44c-.54 1.22.1 2.1.5 2.22c1.34.36 2.69-.29 3.41-1.38c.7-1.04.65-2.39.34-3.07c.42-.1.91-.15 1.53-.08c1.76.21 2.1 1.3 2.03 1.76c-.06.46-.43.71-.55.79c-.12.07-.16.1-.15.16c.01.08.07.08.17.06c.15-.03.93-.37.96-1.22c.04-1.08-.99-2.28-2.81-2.25c-.75.02-1.22.09-1.56.22l-.08-.09c-1.13-1.2-3.21-2.05-3.12-3.67c.03-.59.23-2.13 4-4.01c3.08-1.54 5.55-1.12 5.98-.17c.61 1.33-1.32 3.82-4.52 4.18c-1.22.14-1.87-.34-2.03-.51c-.17-.17-.19-.2-.25-.17c-.11.07-.04.23 0 .33c.09.25.49.67 1.15.91c.59.19 2.03.3 3.76-.37c1.94-.75 3.46-2.84 3.01-4.59"
        />
      </svg>
    ),
  },
  {
    title: "Tailwind CSS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="skill-icon-1"
      >
        <path
          fill="currentColor"
          d="M12 6c-2.67 0-4.33 1.33-5 4c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.31.74 1.91 1.35c.98 1 2.09 2.15 4.59 2.15c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12"
        />
      </svg>
    ),
  },
];

export default SkillsPage;
