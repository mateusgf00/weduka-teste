import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Pessoa } from "../pages/Pessoa";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pessoas/:id",
    element: <Pessoa />,
  },
  {
    path: "/pessoas",
    element: <Pessoa />,
  },
])