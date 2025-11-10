import "./Search.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import Loading from "../../components/Loading";
import { useResetComponent } from "../../hooks/useResetComponent";
import { useQuery } from "../../hooks/useQuery";
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const dispatch = useDispatch();
  const resetMessage = useResetComponent();
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);
  

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <Loading label="Carregando perfil..." />;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && <h2>A busca não obteve resultados</h2>}
    </div>
  );
};

export default Search;
