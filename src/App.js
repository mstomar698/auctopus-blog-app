import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fetchdata from './api/fetchdata';
import Title from './api/title';

function App() {
  return (
    <BrowserRouter>
      <div className="items-center justify-center h-full flex flex-col flex-wrap">
        <div>
          some Data
          <Routes>
            <Route path="/" element={<Fetchdata />} />
            <Route path="/photo/:id" element={<Title />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
