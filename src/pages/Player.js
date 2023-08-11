import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import "../assets/styles/Player.scss";
import video from "../assets/images/video.mp4";

function Player() {
  const navigate = useNavigate();
  const { key } = useParams();
  return (
    <div className="player">
      <div className="back">
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      {!key ? (
        <video src={video} autoPlay loop controls muted></video>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${key}?autoplay=0&showinfo=0`}
          frameborder="0"
        ></iframe>
      )}
    </div>
  );
}

export default Player;
