import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../../styles/HomePage.css';

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  href: string;
}

const Button: React.FC<ButtonProps> = ({ primary = false, children, href }) => {
  return (
    <a 
      href={href} 
      className={`btn ${primary ? 'btn-primary' : 'btn-outline'}`}
    >
      {children}
    </a>
  );
};

const StarWarsHomepage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
    <div className="starwars-container">
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1 className="title">EXPLORE THE GALAXY</h1>
          <p className="subtitle">
            Discover the characters, vehicles, planets, and starships from the Star Wars universe
          </p>
          <div className="button-container">
            <Button primary href="#">START EXPLORING</Button>
            <Button href="#">WATCH TRAILERS</Button>
          </div>
        </div>
        <div className="image-credit">
          Photo by <a href="https://unsplash.com/@sushioutlaw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer">Brian McGowan</a> on <a href="https://unsplash.com/photos/white-robot-toy-on-black-background-ggg_B1MeqQk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer">Unsplash</a>
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
    </div>

    
  );
};

export default StarWarsHomepage;