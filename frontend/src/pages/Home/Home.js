import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import Loading from "../../components/Loading";
import { useResetComponent } from "../../hooks/useResetComponent";
import { like, getAllPhotos } from "../../slices/photoSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponent();
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  //Load all photos
  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  //Like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <Loading label="Carregando perfil..." />;
  }

  return (
    <div id="home">
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
      {photos && photos.length === 0 && (
        <h2>
          Ainda não há fotos publicadas.
          <Link to={`/users/${user._id}`}>Deseja Publicar uma?</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
