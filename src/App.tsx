import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './routes/root';
import HomePage from './components/homepage/HomePage';
import CharactersPage from './routes/characters';
import VehiclesPage from './routes/vehicles';
import StarshipsPage from './routes/starships';
import SpeciesPage from './routes/species';
import PlanetsPage from './routes/planets';
import FilmsPage from './routes/films';
import ContactPage from './routes/contact'
import './styles/global.css';
import './App.css';
import './index.css';
import './styles/HomePage.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<CharactersPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="starships" element={<StarshipsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="planets" element={<PlanetsPage />} />
          <Route path="films" element={<FilmsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;