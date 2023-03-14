import * as gameService from './services/gameService'
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import CreateGame from './components/createGame/CreateGame';
import Catalog from './components/catalog/Catalog';
import GameDetails from './components/gameDetails/GameDetails';

function App() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id);

      const comments = game.comments || [];
      comments.push(comment);

      return [
        ...state.filter(x => x._id !== gameId),
        { ...game, comments: comments }
      ];
    });
  };

  const onCreateGameSubmit = async (data) => {
    addGameHandler()
    console.log(data)

  }

  const addGameHandler = (gameData) => {
    setGames(state => [
      ...state,
      {
        ...gameData,
        _id: uniqid()
      }
    ]);
    navigate('/catalog')
  };

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        console.log(result);
        setGames(result)
      })
  }, []);

  return (
    <div id="box">
      <Header />
      {/* Main Content */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home games={games} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} addGameHandler={addGameHandler}/>} />
          <Route path="/catalog" element={<Catalog games={games} />} />
          <Route path="catalog/:gameId" element={<GameDetails games={games} addComment={addComment} />} />
        </Routes>
      </main>
      {/*Home Page*/}
      {/* Login Page ( Only for Guest users ) */}

      {/* Register Page ( Only for Guest users ) */}

      {/* Create Page ( Only for logged-in users ) */}

      {/* Edit Page ( Only for the creator )*/}
      <section id="edit-page" className="auth">
        <form id="edit">
          <div className="container">
            <h1>Edit Game</h1>
            <label htmlFor="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" defaultValue="" />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" defaultValue="" />
            <label htmlFor="levels">MaxLevel:</label>
            <input
              type="number"
              id="maxLevel"
              name="maxLevel"
              min={1}
              defaultValue=""
            />
            <label htmlFor="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
            <label htmlFor="summary">Summary:</label>
            <textarea name="summary" id="summary" defaultValue={""} />
            <input className="btn submit" type="submit" defaultValue="Edit Game" />
          </div>
        </form>
      </section>
      {/*Details Page*/}

      {/* Catalogue */}

    </div>

  );
};

export default App;
