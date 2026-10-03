import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const carRef = useRef(null);
  const glowRef = useRef(null);
  const headline = "WELCOME ITZFIZZ";

  const stats = [
    { value: "58%", label: "Faster digital experiences" },
    { value: "23%", label: "Higher user engagement" },
    { value: "27%", label: "Better conversions" },
    { value: "40%", label: "More creative impact" },
  ];

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 550px)").matches;

    const ctx = gsap.context(() => {
      // --------------------------------
      // 1. Initial page-load animation
      // --------------------------------

      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .fromTo(
          ".eyebrow",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          }
        )
        .fromTo(
          titleRef.current.querySelectorAll(".title-char"),
          {
            opacity: 0,
            y: 45,
            rotateX: -35,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.045,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .fromTo(
          statsRef.current.children,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.4"
        )
        .fromTo(
          scrollIndicatorRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
          },
          "-=0.2"
        )
        .fromTo(
          carRef.current,
          {
            opacity: 0,
            scale: isMobile ? 0.58 : 0.8,
            y: isMobile ? 15 : 30,
          },
          {
            opacity: 1,
            scale: isMobile ? 0.72 : 1,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.3)",
          },
          "-=1"
        );

      // --------------------------------
      // 2. Scroll-driven animation
      // --------------------------------

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: isMobile ? "+=800" : "+=1000",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (isMobile) {
        // --------------------------------
        // Mobile animation
        // --------------------------------

        scrollTimeline
          .to(
            carRef.current,
            {
              x: 0,
              y: -8,
              rotation: 2,
              scale: 0.66,
              ease: "none",
              immediateRender: false,
            },
            0
          )
          .to(
            titleRef.current,
            {
              y: -10,
              scale: 0.97,
              ease: "none",
            },
            0
          )
          .to(
            statsRef.current,
            {
              y: -8,
              ease: "none",
            },
            0
          )
          .to(
            glowRef.current,
            {
              x: -20,
              y: -5,
              scale: 1.1,
              ease: "none",
            },
            0
          );
      } else {
        // --------------------------------
        // Desktop animation
        // --------------------------------

        scrollTimeline
          .to(
            carRef.current,
            {
              x: -180,
              y: 0,
              rotation: 3,
              scale: 0.9,
              ease: "none",
              immediateRender: false,
            },
            0
          )
          .to(
            titleRef.current,
            {
              y: -25,
              scale: 0.96,
              ease: "none",
            },
            0
          )
          .to(
            statsRef.current,
            {
              y: -20,
              ease: "none",
            },
            0
          )
          .to(
            glowRef.current,
            {
              x: -80,
              y: 0,
              scale: 1.2,
              ease: "none",
            },
            0
          );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="site min-h-screen overflow-x-hidden bg-[#080808] text-white">
      <section
        ref={heroRef}
        className="hero relative min-h-screen overflow-hidden"
      >
        <div className="hero-content">
          <p className="eyebrow">DIGITAL EXPERIENCE STUDIO</p>

          <h1 ref={titleRef} className="hero-title">
            {headline.split("").map((char, index) => (
              <span className="title-char" key={`${char}-${index}`}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p
            ref={descriptionRef}
            className="hero-description max-w-xl text-base leading-7"
          ></p>

          <div
            ref={statsRef}
            className="stats grid grid-cols-2 gap-5 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div className="stat" key={stat.value}>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>

          <div ref={scrollIndicatorRef} className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <span className="arrow">↓</span>
          </div>
        </div>

        <div className="visual-wrapper">
          <div ref={glowRef} className="glow"></div>

          <div ref={carRef} className="car">
            <div className="car-roof"></div>

            <div className="car-body">
              <div className="window window-left"></div>
              <div className="window window-right"></div>

              <div className="headlight left-light"></div>
              <div className="headlight right-light"></div>
            </div>

            <div className="wheel wheel-left"></div>
            <div className="wheel wheel-right"></div>
          </div>
        </div>
      </section>

      <section className="next-section min-h-screen">
        <div className="next-section-content">
          <p className="section-eyebrow">BUILT FOR IMPACT</p>

          <h2 className="next-title">
            DIGITAL EXPERIENCES
            <br />
            THAT MOVE PEOPLE.
          </h2>

          <p className="next-description">
            From strategy to development, we create fast, expressive and
            user-focused digital experiences.
          </p>

          <div className="next-line"></div>

          <div className="next-meta">
            <span>01 / EXPERIENCE</span>
            <span>02 / PERFORMANCE</span>
            <span>03 / DESIGN</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;