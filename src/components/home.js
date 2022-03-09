import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showIntro, setShowIntro] = useState();
  const [chapters, setChapters] = useState();
  const navigate = useNavigate();

  async function getShowIntro() {
    const res = await axios.get(
      'https://api.tvmaze.com/search/shows?q=powerpuff'
    );
    setShowIntro(res.data);
  }

  async function getChapters() {
    const res = await axios.get('https://api.tvmaze.com/shows/6771/episodes');
    setChapters(res.data);
  }

  useEffect(() => {
    getShowIntro();
    getChapters();
  }, []);

  const handleButtonClick = (season, chapter) => {
    navigate(`/details/${season}/${chapter}`);
  };

  String.prototype.stripHTML = function () {
    return this.replace(/<.*?>/g, '');
  };

  return (
    <div>
      <div className="title">The powerpuff Girls</div>
      {showIntro ? (
        <>
          {/* <div className="d-flex flex-md-row"> */}
          <div className="view">
            <div className="mb-3">
              <img
                alt="cover"
                src="https://static.tvmaze.com/uploads/images/medium_portrait/60/151357.jpg"
              />
            </div>
            <div className="description">
              {showIntro[1]?.show.summary.stripHTML()}
            </div>
          </div>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">Season</th>
                <th scope="col">Chapter</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {chapters ? (
                chapters.map((chapter) => (
                  <tr key={chapter.id}>
                    <td>{chapter.season}</td>
                    <td>{chapter.number}</td>
                    <td
                      className="chapter-selection"
                      onClick={() =>
                        handleButtonClick(chapter.season, chapter.number)
                      }
                    >
                      {chapter.name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;
