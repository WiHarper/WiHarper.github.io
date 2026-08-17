// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-resume",
          title: "Resume",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/resume/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "projects-tracking-planes-150-miles-away-on-strict-dorm-wifi",
          title: 'Tracking Planes 150 Miles Away on Strict Dorm WiFi',
          description: "overcoming humidity and client isolation with a Pi Zero 2 W and custom antenna",
          section: "Projects",handler: () => {
              window.location.href = "/projects/adsb/";
            },},{id: "projects-live-rocket-telemetry-and-logging-in-two-weeks",
          title: 'Live Rocket Telemetry and Logging in Two Weeks',
          description: "creating a custom logging and telemetry system for my L1 certification rocket",
          section: "Projects",handler: () => {
              window.location.href = "/projects/avio/";
            },},{id: "projects-a-diy-integrated-circuit-clock-and-case",
          title: 'A DIY Integrated Circuit Clock and Case',
          description: "making a case (literal and figurative) for an AliExpress project, breaking it, and fixing it",
          section: "Projects",handler: () => {
              window.location.href = "/projects/clock/";
            },},{id: "projects-hardware-audio-control-for-windows-apps",
          title: 'Hardware Audio Control for Windows Apps',
          description: "using all-original CAD, an Arduino Micro, and a fork of the deej project",
          section: "Projects",handler: () => {
              window.location.href = "/projects/deej/";
            },},{id: "projects-synthetic-aperture-radar-at-mit-lincoln-laboratory",
          title: 'Synthetic Aperture Radar at MIT Lincoln Laboratory',
          description: "conducting and presenting research on SAR and Doppler at MIT LL RISE",
          section: "Projects",handler: () => {
              window.location.href = "/projects/radar/";
            },},{id: "projects-simple-amp-cheap-digital-signage-from-a-pi-400",
          title: 'Simple &amp;amp; Cheap Digital Signage from a Pi 400',
          description: "putting together an &quot;it just works&quot; display system for my college commons",
          section: "Projects",handler: () => {
              window.location.href = "/projects/signage/";
            },},{id: "projects-achieving-stable-flight-in-gps-denied-environments",
          title: 'Achieving Stable Flight in GPS-Denied Environments',
          description: "featuring position-holding, a gripper, and sensor fusion with optical flow and LiDAR",
          section: "Projects",handler: () => {
              window.location.href = "/projects/uav/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%65%6C%6C%6F@%77%69%6C%73%6F%6E%68%61%72%70%65%72.%6E%65%74", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/wils.harp", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/wilson-harper", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
