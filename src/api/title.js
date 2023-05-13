import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Title = () => {
  const [data, setData] = useState([]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`).then(
      (response) => response.json().then((json) => setData(json))
    );
  }, [id]);
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <div className="">
      {id}
      <div>{data.title}</div>
    </div>
  );
};

export default Title;
