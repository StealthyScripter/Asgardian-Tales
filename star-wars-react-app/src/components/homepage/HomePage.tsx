import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Hide the intro crawl after it completes
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { 
      id: 'people', 
      title: 'Characters', 
      description: 'Explore legendary heroes, villains, and everyone in between from the Star Wars universe.',
      icon: '👤'
    },
    { 
      id: 'films', 
      title: 'Films', 
      description: 'Journey through the epic Star Wars saga from The Phantom Menace to The Rise of Skywalker.',
      icon: '🎬'
    },
    { 
      id: 'planets', 
      title: 'Planets', 
      description: 'Visit distant worlds from desert Tatooine to the forest moon of Endor.',
      icon: '🪐'
    },
    { 
      id: 'species', 
      title: 'Species', 
      description: 'Discover the diverse beings that inhabit the galaxy from humans to Wookiees.',
      icon: '👽'
    },
    { 
      id: 'starships', 
      title: 'Starships', 
      description: 'Explore the iconic vessels that traverse the stars from X-wings to Star Destroyers.',
      icon: '🚀'
    },
    { 
      id: 'vehicles', 
      title: 'Vehicles', 
      description: 'Check out the ground and atmospheric vehicles like AT-ATs and speeders.',
      icon: '🏍️'
    }
  ];

  return (
    <div className="homepage">
      {showIntro ? (
        <div className="intro-crawl-container">
          <div className="intro-crawl">
            <div className="title">
              <h1>STAR WARS DATA</h1>
              <h2>A GALAXY OF INFORMATION</h2>
            </div>
            <p>Welcome to the ultimate Star Wars database! Here you'll find detailed information about the characters, films, planets, species, starships, and vehicles from the entire Star Wars saga.</p>
            <p>Explore the data from a galaxy far, far away...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="hero-section">
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="hero-content">
              <h1 className="hero-title">Star Wars Universe</h1>
              <p className="hero-subtitle">Explore the galaxy far, far away...</p>
            </div>
          </div>

          <div className="categories-section">
            <h2 className="section-title">Choose Your Path</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link to={`/${category.id}`} className="category-link">
                    <div className="category-icon">{category.icon}</div>
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-description">{category.description}</p>
                    <div className="lightsaber"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="quote-section">
            <blockquote>
              "May the Force be with you."
            </blockquote>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;