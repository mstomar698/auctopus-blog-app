import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateArticle } from './actions';
import { useDispatch, useSelector } from 'react-redux';

const Article = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.article);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateArticle(json)));
  }, [dispatch, id]);

  if (!data) {
    return null;
  }
  return (
    <div className="text-black flex flex-row px-16 pt-16 pb-8 justify-between min-h-screen">
      <div className="list-none flex flex-wrap flex-col gap-2 w-full h-full">
        <div key={data.id} className="rounded-md overflow-hidden">
          <div
            className="w-full h-max bg-cover bg-center flex flex-col justify-center items-center p-1"
            style={{ backgroundImage: `url(${data.url})` }}
          >
            <div className="bg-transparent backdrop-blur-xl w-full">
              <div className="text-5xl text-center my-0.5">{data.title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
