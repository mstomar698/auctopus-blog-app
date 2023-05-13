import React, { useEffect, useState } from 'react';

const Fetchdata = () => {
  const [data, setData] = useState([]);
  const [favImages, setFavImages] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10').then(
      (response) => response.json().then((json) => setData(json))
    );
  }, []);
  const handleImageClick = (image) => {
    const newFavImage = {
      id: image.id,
      url: image.url,
      title: image.title,
    };
    setFavImages([...favImages, newFavImage]);
  };

  const removeFave = () => {
    setFavImages([]);
  };
  const reroute = (title) => {
    window.open(`/photo/${title}`, '_blank');
  };

  const removeClick = (fav) => {
    const newFavImages = favImages.filter((image) => image.id !== fav.id);
    setFavImages(newFavImages);
  };

  return (
    <div className="text-black flex flex-wrap p-8">
      {data.map((img) => (
        <div className="border border-black m-4">
          <li key={img.id} style={{ backgroundImage: `url(${img.url})` }}>
            <div className="border">{img.title}</div>
            <div onClick={() => handleImageClick(img)}>add to Fav</div>
            <div onClick={() => reroute(img.id)}>Read MOre</div>
          </li>
        </div>
      ))}
      <p>_________</p>
      <div className="">
        {' '}
        Fav images here
        <div className="border border-blue-500 h-full">
          <button
            className="border border-red-500 "
            onClick={() => removeFave()}
          >
            Remoce ALl FavIMages
          </button>
          {favImages.map((fav) => (
            <div className="text-black flex flex-wrap">
              <li key={fav.id} style={{ backgroundImage: `url(${fav.url})` }}>
                {fav.title}
                <div onClick={() => removeClick(fav)}>Remove from fav </div>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fetchdata;
