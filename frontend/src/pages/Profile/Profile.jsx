import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";
import { uploads } from "../../utils/config";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import "./Profile.css";
import useResetComponent from "../../hooks/useResetComponent";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponent()
  const { userDetails, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: msgPhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    //build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));
    setTitle("");

    resetMessage();
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetMessage();
  };

  //Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));
    resetMessage();
  };

  const handleCancelEdit = (e) => {
    hideOrShowForms();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }
    setEditId(photo._id);
    setTitle(photo.title);
    setEditImage(photo.image);
  };

  return (
    <div id="profile">
      {loading && <Loading label="Carregando perfil..." />}
      <div className="profile-header">
        {userDetails.profileImage && (
          <img
            src={`${uploads}/users/${userDetails.profileImage}`}
            alt={userDetails.name}
          />
        )}
        <div className="profile-description">
          <h2>{userDetails.name}</h2>
          <p>{userDetails.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compatrilhando meus momentos:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Titulo para foto:</span>
                <input
                  type="text"
                  placeholder="insira um titulo"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" disabled value="Aguarde..." />
              )}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira um novo titulo"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {msgPhoto && <Message msg={msgPhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {Array.isArray(photos) &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt="photo.title"
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
