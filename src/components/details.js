import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import chooseAgain from '../../src/assets/choose.gif';

const Details = () => {
  const [episodeDetails, setEpisodeDetails] = useState();
  const navigate = useNavigate();
  let params = useParams();

  async function getEpisodeDetails() {
    const res = await axios.get(
      `https://api.tvmaze.com/shows/6771/episodebynumber?season=${params.season}&number=${params.chapter}`
    );
    setEpisodeDetails(res.data);
  }

  useEffect(() => {
    getEpisodeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-extend-native
  String.prototype.stripHTML = function () {
    return this.replace(/<.*?>/g, '');
  };

  return (
    <div className="container">
      {episodeDetails ? (
        <>
          <div className="title">Episode Title: {episodeDetails.name}</div>
          <div className="d-flex flex-md-row mt-4 view">
            <div>
              <a href={episodeDetails.url}>
                <img
                  alt="Episode"
                  src={episodeDetails.image.medium}
                  className="mb-3"
                />
              </a>
            </div>
            <div className="description">
              {episodeDetails.summary.stripHTML()}
            </div>
          </div>
          <div
            className="d-flex choose-again-img"
            onClick={() => navigate('/')}
          >
            <img
              alt="Back to chapter selection"
              src={chooseAgain}
              className="cursor-style detail-back-img"
            />
          </div>
          <div className="choose-again-text" onClick={() => navigate('/')}>
            Back to chapter selection
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Details;
