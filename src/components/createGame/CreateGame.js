import { useState } from 'react';

const CreateGame = ({
  onCreateGameSubmit,
}) => {
  const [values, setValues] = useState({
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
  });


  const onChangeHandler = (e) => {
    setValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    onCreateGameSubmit(values);
  }

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input value={values.title}
            onChange={onChangeHandler}
            type="text"
            id="title"
            name="title"
            placeholder="Enter game title..."
          />
          <label htmlFor="category">Category:</label>
          <input value={values.category}
            onChange={onChangeHandler}
            type="text"
            id="category"
            name="category"
            placeholder="Enter game category..."
          />
          <label htmlFor="levels">MaxLevel:</label>
          <input value={values.maxLevel}
            onChange={onChangeHandler}
            type="number"
            id="maxLevel"
            name="maxLevel"
            min={1}
            placeholder={1}
          />
          <label htmlFor="game-img">Image:</label>
          <input value={values.imageUrl}
            onChange={onChangeHandler}
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Upload a photo..."
          />
          <label htmlFor="summary">Summary:</label>
          <textarea value={values.summary} name="summary" id="summary" defaultValue={""} onChange={onChangeHandler} />
          <input
            className="btn submit"
            type="submit"
            
          />
        </div>
      </form>
    </section>
  );
};

export default CreateGame;