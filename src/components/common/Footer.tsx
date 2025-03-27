import React from 'react';
import '../../styles/Footer.css';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  target?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, target }) => {
  return (
    <a href={href} className="footer-link" target={target}>
      {children}
    </a>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="starwars-footer">
      <div className="footer-content">
        
        <div className="footer-disclaimer">
          <p>This is a fan-made page created for fun and educational purposes only.</p>
          <p>Not affiliated with Lucasfilm Ltd. or Disney.</p>
        </div>
        
        <div className="footer-links">
          <FooterLink href="https://en.wikipedia.org/wiki/Star_Wars" target="_blank">About Starwars</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="https://www.starwars.com/" target="_blank">Star Wars Official</FooterLink>
          <FooterLink href="https://www.disneyplus.com/brand/star-wars?cid=DTCI-Site-StarWars-Site-Engagement-DisneyPlus-US-StarWars-StarWars-EN-NavPipe-SW_Generic-NA" target="_blank">Starwars on Disney</FooterLink>
          
        </div>
        
        <div className="footer-copyright">
          <p>Star Wars™ and all related names, characters, and elements are trademarks of & © Lucasfilm Ltd.</p>
          <p>This fan site is intended for entertainment and educational purposes only.</p>
          <p>© {currentYear} Star Wars Fan Page. May the Force be with you!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;