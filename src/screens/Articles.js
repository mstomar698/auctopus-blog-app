import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavArticle,
  removeAllFavArticles,
  removeFavArticle,
  updateArticles,
} from './actions';

const Articles = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.articles);
  const favImages = useSelector((state) => state.favArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('articles'));

    if (storedData) {
      dispatch(updateArticles(storedData));
    } else {
      fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem('articles', JSON.stringify(json));
          dispatch(updateArticles(json));
        });
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(data);
    setSortedData(data);
  }, [data]);

  const handleImageClick = (image) => {
    dispatch(addFavArticle(image));
  };

  const removeFave = () => {
    dispatch(removeAllFavArticles());
  };

  const removeClick = (fav) => {
    dispatch(removeFavArticle(fav));
  };

  const reroute = (title) => {
    window.open(`/photo/${title}`, '_blank');
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredData);
  };

  const addArticlesToStorage = () => {
    setShowForm(!showForm);
  };

  const removeArticle = (article) => {
    const updatedData = sortedData.filter((item) => item.id !== article.id);
    setSortedData(updatedData);
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setSortedData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  // https://via.placeholder.com/600/56a8c2
  const handleSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
      id: Date.now(),
      title: title,
      url: imageUrl,
    };
    const storedData = JSON.parse(localStorage.getItem('articles')) || [];
    const updatedData = [...storedData, newArticle];
    localStorage.setItem('articles', JSON.stringify(updatedData));

    dispatch(updateArticles(updatedData));

    setTitle('');
    setImageUrl('');
    setShowForm(false);
  };

  return (
    <div className="lg:px-16 md:px-8 sm:px-4 max-sm:px-4 pt-16">
      <div className="flex items-center mb-2 lg:mx-48 md:mx-24 sm:mx-8 max-sm:px-0 p-1">
        <input
          type="text"
          id="search"
          placeholder="Search Articles"
          className="shadow-md shadow-black rounded-md p-1 pl-4 text-lg h-12 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="text-black flex flex-row max-sm:flex-col lg:px-8 md:px-4 sm:px-2 max-sm:px-1 justify-between min-h-screen gap-1 my-4">
        <ul className="list-none flex flex-wrap flex-col gap-2 sm:w-1/2 max-sm:w-full">
          <div className="h-min items-center text-center flex flex-row justify-between lg:px-4 md:px-2 sm:px-1 max-sm:px-0 font-semibold mt-1">
            <div>All Articles</div>
            <button
              onClick={addArticlesToStorage}
              className="p-2 shadow-md shadow-black rounded-md"
            >
              Add Articles
            </button>
            <button
              onClick={handleSort}
              className="p-2 shadow-md shadow-black rounded-md"
            >
              Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
          {sortedData.map((img) => (
            <li key={img.id} className="rounded-md overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center p-1"
                style={{ backgroundImage: `url(${img.url})` }}
              >
                <div className="bg-transparent backdrop-blur-xl w-full">
                  <div className="underline text-center my-0.5 max-sm:my-1 text-md">
                    {img.title}
                  </div>
                  <div className="flex flex-row h-min w-full justify-evenly my-1">
                    <div
                      onClick={() => handleImageClick(img)}
                      className="shadow-md shadow-black rounded-md p-1 max-sm:p-0.5 text-sm"
                    >
                      Add to Fav
                    </div>
                    <div
                      onClick={() => reroute(img.id)}
                      className="shadow-md shadow-black rounded-md p-1 max-sm:p-0.5 text-sm"
                    >
                      Read More
                    </div>
                    <div
                      onClick={() => removeArticle(img)}
                      className="shadow-md shadow-black rounded-md p-1 max-sm:p-0.5 text-sm"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ul className="list-none flex flex-wrap flex-col gap-2 sm:w-1/2 max-sm:w-full">
          <div className="h-min items-center text-center flex flex-row justify-between lg:px-4 md:px-2 sm:px-1 max-sm:px-0 font-semibold mt-1">
            <div>Favorite Articles</div>
            <button
              onClick={() => removeFave()}
              className="p-2 shadow-md shadow-black rounded-md"
            >
              Remove All Favorites
            </button>
          </div>
          {favImages.length === 0 ? (
            <>
              <div className="opacity-70 select-none h-min text-center p-16">
                Add Articles to favorite
              </div>
            </>
          ) : (
            <>
              {favImages.map((fav) => (
                <li key={fav.id} className="rounded-md overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center p-1"
                    style={{ backgroundImage: `url(${fav.url})` }}
                  >
                    <div className="bg-transparent backdrop-blur-xl w-full">
                      <div className="underline text-center my-0.5 max-sm:my-1 text-md">
                        {fav.title}
                      </div>
                      <div className="flex flex-row h-min w-full justify-evenly my-1">
                        <div
                          onClick={() => removeClick(fav)}
                          className="shadow-md shadow-black rounded-md p-1 max-sm:p-0.5 text-sm"
                        >
                          Remove from Fav
                        </div>
                        <div
                          onClick={() => reroute(fav.id)}
                          className="shadow-md shadow-black rounded-md p-1 max-sm:p-0.5 text-sm"
                        >
                          Read More
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {searchTerm.length > 0 ? (
        <>
          {' '}
          {filteredData.length > 0 ? (
            <>
              <div className="absolute h-full w-full bg-transparent backdrop-blur-2xl top-32 left-0 flex justify-center">
                <ul className="list-none flex flex-wrap flex-col gap-2 w-max ">
                  <div className="h-min justify-center items-center text-center font-semibold mt-1">
                    searched for{' '}
                    <span className="text-blue-500">{searchTerm}</span>
                  </div>
                  {filteredData.map((img) => (
                    <li key={img.id} className="rounded-md overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center p-1"
                        style={{ backgroundImage: `url(${img.url})` }}
                        onClick={() => (window.location.href = '/')}
                      >
                        <div className="bg-transparent backdrop-blur-xl w-full">
                          <div className="underline text-center my-0.5">
                            {img.title}
                          </div>
                          <div className="flex flex-row h-min w-full justify-evenly my-1">
                            <div
                              onClick={() => handleImageClick(img)}
                              className="shadow-md shadow-black rounded-md p-1"
                            >
                              Add to Fav
                            </div>
                            <div
                              onClick={() => reroute(img.id)}
                              className="shadow-md shadow-black rounded-md p-1"
                            >
                              Read More
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="absolute h-full w-full bg-transparent backdrop-blur-2xl top-32 left-0 flex flex-col flex-wrap justify-start items-center gap-8">
                <div className="p-8 text-3xl select-none">
                  No Articles Found
                </div>
                <div
                  className="w-72 text-center text-3xl shadow-2xl hover:backdrop-blur-3xl hover:bg-black/30 shadow-black rounded-md p-8"
                  onClick={() => (window.location.href = '/')}
                >
                  Home
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>{''}</>
      )}
      {showForm && (
        <div className="absolute z-20 top-48 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-tansparent backdrop-blur-2xl bg-opacity-80 shadow-lg  shadow-black rounded-lg p-4">
          <form onSubmit={handleSubmit} className="p-4 rounded-md w-72 h-72">
            <div className="mb-4">
              <label htmlFor="title" className="font-semibold">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="font-semibold">
                Image URL:
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="block w-full p-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-center text-3xl shadow-lg hover:backdrop-blur-3xl hover:bg-black/30 shadow-black rounded-md p-2"
              >
                Add Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Articles;
