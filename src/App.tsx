import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import FlowBuilder from "./components/flow-builder/FlowBuilder";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

// export default function App() {
//   return (
//     <div className="min-h-screen bg-red-500 text-white flex items-center justify-center">
//       <h1 className="text-3xl font-bold">Tailwind Working?</h1>
//     </div>
//   );
// }

export default App;
