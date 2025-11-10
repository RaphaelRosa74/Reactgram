import { ImSpinner2 } from "react-icons/im";
import './style.css';

const Loading = ({ label }) => {
  return (
    <div className="loading-container">
      <ImSpinner2 className="spinner-icon" />
      <p>{label}</p>
    </div>
  );
};

export default Loading;
