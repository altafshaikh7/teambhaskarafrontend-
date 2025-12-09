// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, Loader2, StopCircle } from 'lucide-react';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [isHindi, setIsHindi] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Voice Search State
  const [searchValue, setSearchValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const navigate = useNavigate();

  // Font sizes for controls
  const fontSizes = [14, 16, 18];

  // Apply font size changes to document
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Initialize component
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Navigation functions
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleGridMapClick = () => {
    navigate("/grid-map");
  };

  const handleModuleClick = (link) => {
    navigate(link);
  };

  // Ministry navbar functions
  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageToggle = () => {
    setIsHindi(!isHindi);
  };

  const handleScreenReaderClick = () => {
    alert("Screen Reader functionality activated");
  };

  // Voice Search Functions
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Microphone permission required.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const transcribeAudio = async (audioBlob) => {
    setIsTranscribing(true);
    try {
      // Simulate transcription delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // For demo purposes, set a sample text
      setSearchValue("Search for substation monitoring");
      alert("Voice search activated. In a real app, this would use Google AI for transcription.");
    } catch (error) {
      console.error("Transcription failed:", error);
      alert("Transcription failed. Try again.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const modules = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: "fa-solid fa-chart-line", description: "Main control panel with live metrics" },
    { id: 2, name: "Monitoring", link: "/monitoring", icon: "fa-solid fa-tv", description: "Real-time system monitoring" },
    { id: 3, name: "Digital Twin", link: "/digital-twin", icon: "fa-solid fa-cube", description: "3D interactive substation model" },
    { id: 4, name: "Asset Health", link: "/asset-health", icon: "fa-solid fa-heart-pulse", description: "Equipment health tracking" },
    { id: 5, name: "AI Analytics", link: "/ai-analytics", icon: "fa-solid fa-robot", description: "Predictive insights" },
    { id: 6, name: "Fault Simulator", link: "/fault-simulator", icon: "fa-solid fa-bolt", description: "Scenario simulation" },
    { id: 7, name: "Reports", link: "/reports", icon: "fa-solid fa-chart-column", description: "Analytics & reports" },
    { id: 8, name: "Grid Map", link: "/grid-map", icon: "fa-solid fa-map", description: "National power grid visualization" },
  ];

  return (
    <>
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Inline CSS for Government Style - Text Animations Only */}
      <style>{`
        /* Government Official Colors - Clean White Theme */
        :root {
          --govt-navy: #0A2342;
          --govt-blue: #1D4E89;
          --govt-light-blue: #2A7FBA;
          --govt-teal: #00B4D8;
          --govt-cyan: #48CAE4;
          --govt-gold: #FFB81C;
          --govt-yellow: #FFD700;
          --govt-white: #FFFFFF;
          --govt-light-gray: #F8F9FA;
          --govt-gray: #6C757D;
          --govt-dark-gray: #343A40;
          --govt-green: #28A745;
          --govt-red: #DC3545;
          --govt-orange: #FD7E14;
        }
        
        /* Base Styles */
        body {
          font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
          background-color: var(--govt-white);
          color: var(--govt-dark-gray);
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        /* Ministry Navbar Styles - TRANSPARENT */
        .ministry-navbar {
          background: rgba(213, 244, 230, 0.95) !important;
          backdrop-filter: blur(10px);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border-bottom: 2px solid rgba(29, 78, 137, 0.3);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
        }
        
        /* Top Utility Bar - Transparent */
        .utility-bar {
          background: rgba(29, 78, 137, 0.9) !important;
          backdrop-filter: blur(5px);
          padding: 6px 0;
          color: white;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .utility-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .utility-left, .utility-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        /* Search Bar Styles */
        .search-container {
          position: relative;
          min-width: 250px;
        }
        
        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(29, 78, 137, 0.3);
          color: #1d4e89;
          padding: 6px 35px 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #1d4e89;
          box-shadow: 0 0 0 2px rgba(29, 78, 137, 0.2);
        }
        
        .search-input::placeholder {
          color: #666;
        }
        
        .search-icons {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .mic-button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border-radius: 50%;
          transition: all 0.3s;
        }
        
        .mic-button:hover {
          background: rgba(29, 78, 137, 0.1);
        }
        
        .mic-button.recording {
          color: #dc3545;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .search-icon {
          color: #1d4e89;
        }
        
        .font-controls {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .font-btn {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(29, 78, 137, 0.3);
          color: #1d4e89;
          width: 28px;
          height: 28px;
          border-radius: 3px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        
        .font-btn:hover {
          background: white;
          transform: scale(1.05);
        }
        
        .dark-mode-btn {
          background: rgba(51, 51, 51, 0.9);
          color: #ffd700;
          border: 1px solid rgba(255, 215, 0, 0.3);
          width: 28px;
          height: 28px;
          border-radius: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        
        .dark-mode-btn:hover {
          background: #333;
          transform: scale(1.05);
        }
        
        .social-icons {
          display: flex;
          gap: 10px;
        }
        
        .social-icon {
          color: white;
          font-size: 15px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }
        
        .social-icon:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffd700;
          transform: translateY(-2px);
        }
        
        .language-toggle {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: white;
          padding: 5px 15px;
          border-radius: 3px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }
        
        .language-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
        }
        
        /* Main Navbar Content */
        .main-navbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 20px;
        }
        
        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .ministry-brand {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
        }
        
        
        
        
        
        .emblem-inner {
          width: 50px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #1d4e89;
          font-weight: bold;
        }
        
        .ministry-text {
          display: flex;
          flex-direction: column;
        }
        
        .govt-india {
          font-size: 12px;
          font-weight: 700;
          color: #1d4e89;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        
        .ministry-power {
          font-size: 20px;
          font-weight: 800;
          color: #1d4e89;
          margin-top: -3px;
          letter-spacing: 0.5px;
        }
        
        /* Your Original Navigation Styles */
        .govt-header {
          background: var(--govt-white);
          border-bottom: 2px solid var(--govt-light-gray);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .govt-nav-link {
          color: var(--govt-navy) !important;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          position: relative;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          font-size: 0.9rem;
          border-radius: 6px;
        }
        
        .govt-nav-link:hover {
          color: var(--govt-blue) !important;
          background: rgba(10, 35, 66, 0.05);
        }
        
        .govt-nav-link.active {
          color: var(--govt-blue) !important;
          background: rgba(10, 35, 66, 0.08);
          font-weight: 600;
        }
        
        /* Navigation Menu Container */
        .nav-menu-container {
          display: flex;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 5px;
          border-radius: 8px;
        }
        
        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #1d4e89;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        /* Logo Bar - Transparent */
        .logo-bar {
          background: rgba(248, 249, 250, 0.9);
          backdrop-filter: blur(5px);
          border-top: 1px solid rgba(222, 226, 230, 0.5);
          padding: 8px 0;
        }
        
        .logos-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: center;
          gap: 30px;
          align-items: center;
        }
        
        .govt-logo {
          height: 35px;
          object-fit: contain;
          transition: transform 0.3s;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        
        .govt-logo:hover {
          transform: scale(1.05);
        }
        
        /* Dark Mode Styles */
        body.dark-mode {
          background: #121212;
          color: #ffffff;
        }
        
        body.dark-mode .ministry-navbar {
          background: rgba(44, 62, 80, 0.95) !important;
        }
        
        body.dark-mode .utility-bar {
          background: rgba(26, 37, 47, 0.9) !important;
        }
        
        body.dark-mode .search-input {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        body.dark-mode .search-input::placeholder {
          color: #aaa;
        }
        
        body.dark-mode .search-icon {
          color: white;
        }
        
        body.dark-mode .govt-nav-link {
          color: #ffffff !important;
        }
        
        body.dark-mode .ministry-text .govt-india,
        body.dark-mode .ministry-text .ministry-power {
          color: #ffffff;
        }
        
        body.dark-mode .logo-bar {
          background: rgba(44, 62, 80, 0.9);
        }
        
        body.dark-mode .ashoka-emblem {
          background: linear-gradient(135deg, rgba(74, 144, 226, 0.9), rgba(100, 210, 255, 0.9));
        }
        
        body.dark-mode .ashoka-emblem::after {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        /* TEXT ANIMATION CLASSES */
        .animate-text-slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUpFromBottom 0.8s ease-out forwards;
        }
        
        .animate-text-slide-up-delay-1 {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUpFromBottom 0.8s ease-out 0.2s forwards;
        }
        
        .animate-text-slide-up-delay-2 {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUpFromBottom 0.8s ease-out 0.4s forwards;
        }
        
        .animate-text-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-icon-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-badge-pulse {
          animation: badgePulse 2s ease-in-out infinite;
        }
        
        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        /* Video Hero Styles */
        .video-hero-container {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 500px;
          overflow: hidden;
          margin-top: 0px;
        }
        
        .video-hero-container video {
          position: absolute;
          top: 2;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Content Below Video */
        .content-below-video {
          padding: 6rem 0 4rem;
          background: white;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #eaeaea;
        }
        
        .govt-section-title {
          color: var(--govt-navy);
          font-weight: 800;
          position: relative;
          margin-bottom: 2.5rem;
          text-align: center;
          font-size: 2.2rem;
          letter-spacing: -0.5px;
        }
        
        .govt-section-title:after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: var(--govt-teal);
          border-radius: 3px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
          padding-top: 2.5rem;
          border-top: 1px solid #eaeaea;
        }
        
        .stat-item {
          text-align: center;
          color: var(--govt-navy);
          padding: 1.5rem;
          background: var(--govt-light-gray);
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          background: #f0f7ff;
          transform: translateY(-3px);
          border-color: var(--govt-teal);
        }
        
        .stat-value {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
          color: var(--govt-blue);
        }
        
        .stat-label {
          font-size: 1rem;
          color: var(--govt-gray);
          margin-bottom: 0.8rem;
          font-weight: 500;
        }
        
        .stat-icon {
          font-size: 1.5rem;
          color: var(--govt-teal);
          margin-top: 0.8rem;
        }
        
        /* Feature Cards */
        .feature-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          height: 100%;
          border: 1px solid #E8E8E8;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          border-color: var(--govt-teal);
          box-shadow: 0 6px 15px rgba(0, 180, 216, 0.1);
          transform: translateY(-3px);
        }
        
        /* Badge Styles */
        .govt-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--govt-teal);
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 50px;
          letter-spacing: 1px;
          box-shadow: 0 4px 10px rgba(0, 180, 216, 0.2);
        }
        
        /* Button Styles */
        .govt-btn-primary {
          background: var(--govt-blue);
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(29, 78, 137, 0.2);
        }
        
        .govt-btn-primary:hover {
          background: var(--govt-light-blue);
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(29, 78, 137, 0.25);
        }
        
        .govt-footer {
          background: var(--govt-navy);
          border-top: 3px solid var(--govt-gold);
        }
        
        /* Fix for navbar overlap */
        body {
          padding-top: 160px;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .govt-nav-link {
            padding: 0.3rem 0.6rem;
            font-size: 0.85rem;
          }
          
          
        }
        
        @media (max-width: 768px) {
          body {
            padding-top: 200px;
          }
          
          .utility-content {
            flex-direction: column;
            gap: 10px;
            padding: 10px 20px;
          }
          
          .utility-left, .utility-right {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .navbar-content {
            flex-direction: column;
            gap: 15px;
            padding: 10px 0;
          }
          
          .ministry-brand {
            flex-direction: column;
            text-align: center;
          }
          
          .nav-menu-container {
            flex-direction: column;
            width: 100%;
            display: ${isMenuOpen ? 'flex' : 'none'};
            margin-top: 15px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .govt-nav-link {
            padding: 0.8rem 0.5rem;
            font-size: 0.9rem;
            text-align: left;
            width: 100%;
          }
          
          .mobile-menu-btn {
            display: block;
            position: absolute;
            right: 20px;
            top: 15px;
          }
          
          .logos-container {
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .govt-logo {
            height: 30px;
          }
          
          .video-hero-container {
            height: 50vh;
            min-height: 350px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 2rem;
          }
          
          .stat-value {
            font-size: 1.8rem;
          }
          
          .govt-section-title {
            font-size: 1.8rem;
          }
          
          .content-below-video {
            padding: 4rem 0 2rem;
          }
        }
        
        @media (max-width: 480px) {
          body {
            padding-top: 220px;
          }
          
          .utility-left, .utility-right {
            flex-direction: column;
            gap: 10px;
          }
          
          .logos-container {
            flex-direction: column;
            gap: 10px;
          }
          
          .govt-logo {
            height: 28px;
          }
          
          .ministry-power {
            font-size: 16px;
          }
          
          .govt-india {
            font-size: 11px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .video-hero-container {
            height: 40vh;
            min-height: 300px;
          }
          
          .govt-section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
      
      <div className="min-h-screen">
        
        {/* MINISTRY OF POWER OFFICIAL NAVBAR - TRANSPARENT */}
        <nav className="ministry-navbar">
  {/* Top Utility Bar */}
  <div className="utility-bar">
    <div className="utility-content">
      <div className="utility-left gap-2">
        {/* Home Icon */}
        <a href="#" className="social-icon" title="Home">
          <i className="fas fa-home"></i>
        </a>
        
        {/* Dark Mode Toggle */}
        <button 
          className="dark-mode-btn"
          onClick={handleDarkModeToggle}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <i className="fas fa-adjust"></i>
        </button>
        
        {/* Social Media Icons */}
        <div className="social-icons p-2">
          <a href="#" className="social-icon" title="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon" title="Twitter/X">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      
      <div className="utility-right">
        {/* Language Toggle */}
        <button 
          className="language-toggle" 
          onClick={handleLanguageToggle}
          title={isHindi ? "Switch to English" : "Switch to Hindi"}
        >
          {isHindi ? "English" : "हिन्दी"}
        </button>
      </div>
    </div>
  </div>
  
  {/* Main Navbar */}
  <div className="main-navbar">
    <div className="navbar-content">
      {/* Ministry Branding - UPDATED WITH ASHOKA CHAKRA IMAGE */}
      <a href="#" className="ministry-brand">
        <div className="ashoka-emblem">
          <div className="emblem-inner">
            {/* Ashoka Chakra Image */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Ashoka Chakra"
              className="ashoka-chakra-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzFENEU4OSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjYiIGZpbGw9IndoaXRlIi8+PGcgZmlsbD0iIzFENEU4OSI+PHBhdGggZD0iTTEyIDJMMTIgOCIvPjxwYXRoIGQ9Ik0xMiAxNkwxMiAyMiIvPjxwYXRoIGQ9Ik00LjkgNC45TDguOSA4LjkiLz48cGF0aCBkPSJNMTUuMSAxNS4xTDE5LjEgMTkuMSIvPjxwYXRoIGQ9Ik0yIDEySDgiLz48cGF0aCBkPSJNMTYgMTJIMjIiLz48cGF0aCBkPSJNNCAyMEw4IDE2Ii8+PHBhdGggZD0iTTE2IDhMMjAgNCIvPjxwYXRoIGQ9Ik0yMCAyMEwxNiAxNiIvPjxwYXRoIGQ9Ik04IDhMNCA0Ii8+PC9nPjwvc3ZnPg==';
              }}
            />
          </div>
        </div>
        <div className="ministry-text">
          <div className="govt-india">GOVERNMENT OF INDIA</div>
          <div className="ministry-power">MINISTRY OF POWER</div>
        </div>
      </a>
      
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        title="Menu"
      >
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>
      
      {/* YOUR ORIGINAL NAVIGATION MENU */}
      <div className="nav-menu-container">
        {[
          { id: "home", label: "Home", icon: "fa-home" },
          { id: "modules", label: "Modules", icon: "fa-th-large" },
          { id: "grid-map-section", label: "Grid Map", icon: "fa-map" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              if (item.id === 'grid-map-section') {
                handleGridMapClick();
              } else {
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
              if (window.innerWidth <= 768) {
                setIsMenuOpen(false);
              }
            }}
            className={`govt-nav-link flex items-center space-x-1 ${activeSection === item.id ? 'active' : ''}`}
          >
            <i className={`fas ${item.icon} text-xs`}></i>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
        
        {/* Dashboard Button in Navigation */}
        <button 
          onClick={handleDashboardClick}
          className="govt-nav-link flex items-center space-x-1"
        >
          <i className="fas fa-tachometer-alt text-xs"></i>
          <span className="text-xs">Dashboard</span>
        </button>
      </div>
    </div>
  </div>
  
  {/* Logo Bar - WITH LOCAL LOGOS */}
  <div className="logo-bar">
    <div className="logos-container">
      {/* Azadi Ka Amrit Mahotsav Logo */}
      <img 
        src="/azadi.jpg" 
        alt="Azadi Ka Amrit Mahotsav 75 Years"
        className="govt-logo"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjk5MzMiLz48dGV4dCB4PSI2MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+77yP4KS54KWN4KWH4KWN77yP4KS44KWN4KWj4KWL4KS+PC90ZXh0Pjx0ZXh0IHg9IjYwIiB5PSIzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiPjc1IFllYXJzPC90ZXh0Pjwvc3ZnPg==';
        }}
      />
      
      {/* Swachh Bharat Logo */}
      <img 
        src="/swach-bharat.png" 
        alt="Swachh Bharat Mission"
        className="govt-logo"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgZmlsbD0iIzAwODAwMCIvPjx0ZXh0IHg9IjUwIiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj7guKPguJvguKPguJnguJnguKPguYnguJ7guJrguKfguJXguLLguJrguJvguJTguLk8L3RleHQ+PC9zdmc+';
        }}
      />
      
      {/* G20 India 2023 Logo */}
      <img 
        src="/G20_theme_and_logo.png" 
        alt="G20 India 2023"
        className="govt-logo"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGOTkzMztzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTM4ODA4O3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgcng9IjUiIGZpbGw9InVybCgjZ3JhZCkiLz48dGV4dCB4PSI1MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMxRDhFODkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCI+RzIwIElORElBIDIwMjM8L3RleHQ+PC9zdmc+';
        }}
      />
    </div>
  </div>
</nav>

        {/* Rest of the Home Page Content */}
        <section className="video-hero-container">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/My_Movie_new_0.mp4" type="video/mp4" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-800 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="text-5xl mb-3">
                  <i className="fas fa-bolt animate-icon-float"></i>
                </div>
                <h1 className="text-3xl font-bold mb-2 animate-text-fade-in">Substation Digital Twin</h1>
                <p className="text-lg animate-text-fade-in">Real-time power infrastructure monitoring</p>
              </div>
            </div>
          </video>
        </section>

        <section id="home" className="content-below-video">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="mb-6">
                <span className="govt-badge inline-flex items-center gap-2 animate-badge-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE DIGITAL TWIN
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-text-slide-up">
                400/220 kV Substation
                <span className="block text-blue-600 mt-2 animate-text-slide-up-delay-1">Digital Twin Platform</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600 animate-text-slide-up-delay-2">
                Real-time visualization, predictive maintenance, and comprehensive monitoring 
                of India's critical power infrastructure.
              </p>
              
              <div className="mb-10">
                <button 
                  onClick={handleDashboardClick} 
                  className="govt-btn-primary px-8 py-3 text-base font-semibold rounded-xl hover:scale-105 transition-transform animate-text-fade-in"
                >
                  <i className="fas fa-tachometer-alt mr-2 animate-icon-float"></i>
                  Open Dashboard
                </button>
              </div>
              
              <div className="stats-grid max-w-md mx-auto">
                <div className="stat-item animate-text-fade-in">
                  <div className="stat-value">1,240+</div>
                  <div className="stat-label">Substations</div>
                  <div className="stat-icon">
                    <i className="fas fa-industry animate-icon-float"></i>
                  </div>
                </div>
                
                <div className="stat-item animate-text-fade-in">
                  <div className="stat-value">99.97%</div>
                  <div className="stat-label">Uptime</div>
                  <div className="stat-icon">
                    <i className="fas fa-check-circle animate-icon-float"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section id="modules" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="govt-section-title animate-text-fade-in">
              System Modules
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 text-base animate-text-slide-up">
              Tools for power system management and monitoring
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.link)}
                  className="feature-card group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                      <i className={`${module.icon} text-lg text-blue-600 animate-icon-float`}></i>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-1 animate-text-fade-in">{module.name}</h3>
                    <p className="text-gray-600 text-xs mb-2">{module.description}</p>
                    <div className="flex items-center text-blue-600 font-medium text-xs mt-1 group-hover:text-blue-700">
                      <span className="animate-text-fade-in">Access</span>
                      <i className="fas fa-arrow-right ml-1 transition-transform group-hover:translate-x-1"></i>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button 
                onClick={handleDashboardClick}
                className="govt-btn-primary px-8 py-3 text-base font-semibold animate-text-fade-in"
              >
                <i className="fas fa-rocket mr-2 animate-icon-float"></i>
                Open All Modules
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="govt-footer text-white py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-300 animate-text-fade-in">GOVERNMENT OF INDIA</h3>
                <p className="font-bold mb-2 animate-text-fade-in">Ministry of Power</p>
                <p className="text-cyan-200 mb-4 text-sm animate-text-fade-in">
                  Shram Shakti Bhawan, Rafi Marg,<br />
                  New Delhi - 110001
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center animate-text-fade-in">
                    <i className="fas fa-phone mr-2 text-cyan-400 animate-icon-float"></i>
                    +91-11-2371-XXXX
                  </p>
                  <p className="flex items-center animate-text-fade-in">
                    <i className="fas fa-envelope mr-2 text-cyan-400 animate-icon-float"></i>
                    support@mopower.gov.in
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-300 animate-text-fade-in">QUICK LINKS</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Dashboard", link: "/dashboard" },
                    { label: "Digital Twin", link: "/digital-twin" },
                    { label: "Grid Map", link: "/grid-map" },
                    { label: "Login", link: "/login" }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => navigate(item.link)}
                        className="hover:text-cyan-300 transition-colors text-left w-full flex items-center text-sm py-1"
                      >
                        <i className="fas fa-chevron-right text-xs mr-2 text-cyan-400 animate-icon-float"></i>
                        <span className="animate-text-fade-in">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-yellow-300 animate-text-fade-in">WEBSITE INFO</h3>
                <div className="bg-cyan-900/20 p-4 rounded-xl border border-cyan-800/30">
                  <p className="text-sm mb-2 animate-text-fade-in">
                    Managed by Ministry of Power, Government of India.
                  </p>
                  <div className="text-xs text-cyan-300 space-y-1 mt-2">
                    <p className="animate-text-fade-in"><strong className="text-yellow-300">Version:</strong> 3.0.0</p>
                    <p className="animate-text-fade-in"><strong className="text-yellow-300">Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-cyan-800 mt-6 pt-6 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-3 md:mb-0">
                  <p className="text-yellow-300 font-bold text-sm animate-text-fade-in">
                    <i className="far fa-copyright mr-1 animate-icon-float"></i>
                    {new Date().getFullYear()} Ministry of Power, Government of India.
                  </p>
                </div>
                <div>
                  <p className="text-cyan-300 text-xs animate-text-fade-in">
                    National Digital Substation Portal v3.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        
        <button 
          onClick={handleDashboardClick}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all hover:scale-105 z-50"
        >
          <i className="fas fa-tachometer-alt animate-icon-float"></i>
        </button>
      </div>
    </>
  );
};

export default HomePage;