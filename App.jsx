import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
// import { checkAuthLoader } from "./util/checkAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "",
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
        // here we will put out auth loader
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
