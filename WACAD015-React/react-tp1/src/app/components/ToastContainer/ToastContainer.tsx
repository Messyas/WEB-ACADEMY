import { Bounce, ToastContainer } from "react-toastify";
import "../../../../public/styles/custom-toast.css"

export default function ToastMensagem() {
  return (
    <ToastContainer
    hideProgressBar={false}
    progressClassName="rgb-progress-bar"
    closeOnClick
    pauseOnFocusLoss
    pauseOnHover
    draggable
    transition={Bounce}
    autoClose={3000}
  />
  );
}
