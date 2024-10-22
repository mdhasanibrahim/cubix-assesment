import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        theme="colored"
      />
      <SignUp/>
    </>
  );
}

export default App;
