import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from './screens/Articles';
import Article from './screens/Article';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <NavBar />
        <div className="relative">
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/photo/:id" element={<Article />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
