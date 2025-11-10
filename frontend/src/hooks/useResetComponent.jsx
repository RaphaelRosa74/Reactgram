import { resetMessage } from "../slices/photoSlice";
import { useDispatch } from "react-redux";

export const useResetComponent = () => {
  const dispatch = useDispatch();

  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};

export default useResetComponent;
