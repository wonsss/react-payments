import { Routes, Route } from 'react-router-dom';
import AddCard from 'pages/AddCard/AddCard';
import CardList from 'pages/CardList/CardList';
import CardContext from 'store/card/CardContext';

function App() {
  return (
    <CardContext>
      <Routes>
        <Route index element={<AddCard />}></Route>
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/card-list" element={<CardList />} />
      </Routes>
    </CardContext>
  );
}

export default App;
