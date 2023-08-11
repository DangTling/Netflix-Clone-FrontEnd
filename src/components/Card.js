import { onAuthStateChanged } from "firebase/auth";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import {} from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

import "../assets/styles/Card.scss";
import { removeMovieFromLiked } from "../store";
import { toast } from "react-toastify";

function Card({ movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setEmail(currentUser.email);
    }
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/add", {
        email,
        data: movieData,
      });
      toast.success("Thêm vào danh sách thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xuất hiện lỗi");
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate(`/player/${movieData.trailerKey}`)}
      />
      <h4>{movieData.name}</h4>

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate(`/player/${movieData.trailerKey}`)}
            />

            <iframe
              src={`https://www.youtube.com/embed/${movieData.trailerKey}?autoplay=1`}
              loop
              autoPlay
              muted
              onClick={() => navigate(`/player/${movieData.trailerKey}`)}
            />
          </div>
          <div className="info-container flex column">
            <h3
              className="name"
              onClick={() => navigate(`/player/${movieData.trailerKey}`)}
            >
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate(`/player/${movieData.trailerKey}`)}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() => {
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      );
                      toast.success("Xóa khỏi danh sách thành công");
                    }}
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Card);
