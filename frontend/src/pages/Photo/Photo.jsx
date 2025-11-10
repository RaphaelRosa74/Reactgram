import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { getPhoto, like, comment } from "../../slices/photoSlice";
import { useResetComponent } from "../../hooks/useResetComponent";
import { uploads } from "../../utils/config";
import "./Photo.css";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponent();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState("");

  //Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();
    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));
    setCommentText("");
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        <h3>Comentario: ({photo?.comments?.length})</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Insira seu comentario..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText || ""}
          />
          <input type="submit" value="Enviar" />
        </form>
        {photo?.comments?.length === 0 && <p>Não ha comentarios</p>}
        {photo?.comments?.map((comment) => (
          <div className="comment" key={comment.comment}>
            <Link to={`/users/${comment.userId}`}>
              <div className="author">
                {comment.userImage && (
                  <img
                    src={`${uploads}/users/${comment.userImage}`}
                    alt={comment.userName}
                  />
                )}
                <p>{comment.userName}</p>
              </div>
            </Link>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photo;
