// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [isHindi, setIsHindi] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  const handleDashboardClick = () => navigate("/dashboard");
  const handleGridMapClick = () => navigate("/grid-map");

  const modules = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: "fa-solid fa-chart-line", description: "Main control panel" },
    // { id: 2, name: "Monitoring", link: "/monitoring", icon: "fa-solid fa-tv", description: "Real-time monitoring" },
    { id: 3, name: "Digital Twin", link: "/digital-twin", icon: "fa-solid fa-cube", description: "3D Substation Model" },
    { id: 4, name: "Asset Health", link: "/asset-health", icon: "fa-solid fa-heart-pulse", description: "Health tracking" },
    { id: 5, name: "AI Analytics", link: "/ai-analytics", icon: "fa-solid fa-robot", description: "Predictive analytics" },
    // { id: 6, name: "Fault Simulator", link: "/fault-simulator", icon: "fa-solid fa-bolt", description: "Simulation Engine" },
    { id: 7, name: "Reports", link: "/reports", icon: "fa-solid fa-chart-column", description: "Reports" },
    { id: 8, name: "Grid Map", link: "/grid-map", icon: "fa-solid fa-map", description: "Map Viewer" },
  ];

  return (
    <>
      {/* ============================
            GOV TOP NAVBAR
      ============================== */}
      <style>{`
        .gov-topbar {
          background: #205493;
          color: white;
          padding: 6px 0;
          font-size: 13px;
        }
        .gov-topbar .content {
          max-width: 1200px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }
        .gov-midbar {
          background: #EAF7F0;
          padding: 12px 0;
          border-bottom: 1px solid #d9d9d9;
        }
        .gov-midbar .content {
          max-width: 1200px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }
        .gov-bottombar {
          background: white;
          border-bottom: 1px solid #ddd;
        }
        .gov-bottombar .menu {
          max-width: 1200px;
          margin: auto;
          display: flex;
          gap: 28px;
          padding: 12px 20px;
          font-weight: 600;
          font-size: 14px;
          color: #0A2342;
        }
        .gov-bottombar .menu button {
          background: none;
          border: none;
          cursor: pointer;
        }
        .gov-bottombar .menu button:hover {
          color: #1D4E89;
        }
      `}</style>


      {/* ============================
            LAYER 2 — MID LOGO BAR
      ============================== */}
      <div className="gov-midbar">
        <div className="content">
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="w-16" alt="" />
            <div>
              <p className="text-sm font-bold">GOVERNMENT OF INDIA</p>
              <h1 className="text-xl font-extrabold">MINISTRY OF POWER</h1>
            </div>
          </div>

          <div className="flex gap-6">
            <img src="/azadi.jpg" className="h-12" />
            <img src="/swach-bharat.png" className="h-12" />
            <img src="/G20_theme_and_logo.png" className="h-12" />
          </div>
        </div>
      </div>

      {/* ============================
            LAYER 3 — NAVIGATION MENU
      ============================== */}
      <div className="gov-bottombar">
  <div 
    className="menu" 
    style={{ justifyContent: "flex-end", display: "flex" }}
  >

    <button 
      onClick={() => {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        setActiveSection("home");
      }}
    >
      Home
    </button>

    <button 
      onClick={() => {
        document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });
        setActiveSection("modules");
      }}
    >
      Modules
    </button>

    <button onClick={handleGridMapClick}>
      Grid Map
    </button>

    <button onClick={handleDashboardClick}>
      Dashboard
    </button>

  </div>
</div>


      {/* ============================
            HERO VIDEO SECTION
      ============================== */}
      <section
        id="hero-video"
        style={{
          height: "90vh",
          width: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/My_Movie_new_0.mp4" type="video/mp4" />
        </video>
      </section>

      {/* ============================
            HOME SECTION
      ============================== */}
      <section id="home" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">
            400/220 kV Substation
            <span className="block text-blue-600 mt-2">Digital Twin Platform</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Real-time monitoring, predictive maintenance and visualization of critical electrical assets.
          </p>

          <button
            onClick={handleDashboardClick}
            className="mt-6 px-8 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800"
          >
            Open Dashboard
          </button>
        </div>
      </section>

      {/* ============================
            MODULES GRID
      ============================== */}
 
<section id="modules" className="py-12 bg-gray-100">
  <div className="container mx-auto px-4">

    <h2 className="text-3xl text-center font-bold mb-8">System Modules</h2>

    {/* FIXED GRID: 3×2 layout */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
      {modules.map((m) => (
        <button
          onClick={() => navigate(m.link)}
          key={m.id}
          className="p-6 w-full bg-white rounded-xl border text-center hover:shadow-xl transition"
        >
          <div className="w-14 h-14 mx-auto mb-3 bg-blue-100 text-blue-700 rounded-xl grid place-items-center">
            <i className={`${m.icon} text-2xl`}></i>
          </div>

          <h3 className="font-bold text-gray-800 text-lg">{m.name}</h3>
          <p className="text-gray-500 text-sm">{m.description}</p>
        </button>
      ))}
    </div>

  </div>
</section>


      {/* ============================
            FOOTER
      ============================== */}
      <footer className="bg-[#0A2342] text-white py-10">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-yellow-300 font-bold">GOVERNMENT OF INDIA</h3>
            <p className="font-semibold">Ministry of Power</p>
            <p className="text-gray-400 text-sm mt-2">
              Shram Shakti Bhawan, Rafi Marg,<br />
              New Delhi – 110001
            </p>
          </div>

          <div>
            <h3 className="text-yellow-300 font-bold">QUICK LINKS</h3>
            <ul className="text-sm mt-2 space-y-1">
              <li><button onClick={() => navigate("/dashboard")} className="hover:text-yellow-400">Dashboard</button></li>
              <li><button onClick={() => navigate("/digital-twin")} className="hover:text-yellow-400">Digital Twin</button></li>
              <li><button onClick={() => navigate("/grid-map")} className="hover:text-yellow-400">Grid Map</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-yellow-400">Login</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-300 font-bold">WEBSITE INFO</h3>
            <p className="text-sm mt-2 text-gray-300">Managed by Ministry of Power</p>
            <p className="text-xs text-gray-400 mt-2">
              <b className="text-yellow-300">Version:</b> 3.0.0<br />
              <b className="text-yellow-300">Last Updated:</b> {new Date().toLocaleDateString("en-IN")}
            </p>
          </div>

        </div>

        <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-600 pt-4">
          © {new Date().getFullYear()} Ministry of Power, Government of India
        </div>
      </footer>

      {/* Floating Dashboard Button */}
      <button
        onClick={handleDashboardClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 grid place-items-center"
      >
        <i className="fas fa-tachometer-alt text-xl"></i>
      </button>
    </>
  );
};

export default HomePage;
