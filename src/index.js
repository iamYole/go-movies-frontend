import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Movies from "./components/Movies";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import EditMovie from "./components/EditMovie";
import Movie from "./components/Movie";
import Genres from "./components/Genres";
import Login from "./components/Login";
import GraphQL from "./components/GraphQL";
import ManageCatalog from "./components/ManageCatalog";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/movies", element: <Movies /> },
      { path: "/admin/movie/o", element: <EditMovie /> },
      { path: "/movie/:id", element: <Movie /> },
      { path: "/genres", element: <Genres /> },
      { path: "/admin/movie/o", element: <EditMovie /> },
      { path: "/graphql", element: <GraphQL /> },
      { path: "/login", element: <Login /> },
      { path: "/manage-catalog", element: <ManageCatalog /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
