import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";
import "../assets/styles/SelectGenre.scss";
import { toast } from "react-toastify";

function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <select
      className="select flex"
      onChange={(e) => {
        dispatch(fetchDataByGenre({ genres, genre: e.target.value, type }));
        toast.success("Đã đổi thể loại");
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectGenre;
