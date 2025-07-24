import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./screens/Home.jsx";
import MovieList from "./screens/MovieList";
import { createBrowserRouter, RouterProvider } from "react-router";
import { movieApi } from "./assets/data.jsx";
import ShowList from "./components/ShowList.jsx";
import MovieDetails from "./screens/MovieDetails.jsx";
import SearchResults from "./screens/SearchResults.jsx";
import PeopleList from "./screens/PeopleList.jsx";
import PersonDetails from "./screens/PersonDetails.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import ProfilePage from "./screens/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    // element: <MovieDetails apiPath="/movie/1011477?" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/search/:category/:keyword",
    element: <SearchResults />,
  },
  {
    path: "/person",
    element: <PeopleList api={movieApi.popularPeople} />,
  },
  {
    path: "/person/:id",
    element: <PersonDetails />,
  },
  {
    path: "/movie",
    element: <MovieList />,
    children: [
      {
        index: true,
        element: (
          <ShowList
            title="Popular Movies"
            type="movie"
            api={movieApi.popular}
          />
        ),
      },
      {
        path: "now-playing",
        element: (
          <ShowList
            title="Now-playing Movies"
            type="movie"
            api={movieApi.nowPlaying}
          />
        ),
      },
      {
        path: "top-rated",
        element: (
          <ShowList
            title="Top Rated Movies"
            type="movie"
            api={movieApi.topRated}
          />
        ),
      },
      {
        path: "upcoming",
        element: (
          <ShowList
            title="Upcoming Movies"
            type="movie"
            api={movieApi.upcoming}
          />
        ),
      },
    ],
  },
  {
    path: "/tv",
    element: <MovieList />,
    children: [
      {
        index: true,
        element: (
          <ShowList
            title="Popular TV Shows"
            type="tv"
            api={movieApi.tvPopular}
          />
        ),
      },
      {
        path: "airing-today",
        element: (
          <ShowList
            title="TV Shows Airing Today"
            type="tv"
            api={movieApi.tvAiringToday}
          />
        ),
      },
      {
        path: "top-rated",
        element: (
          <ShowList
            title="Top Rated TV Shows"
            type="tv"
            api={movieApi.tvTopRated}
          />
        ),
      },
      {
        path: "on-the-air",
        element: (
          <ShowList
            title="Currently Airing TV Shows"
            type="tv"
            api={movieApi.tvOnTheAir}
          />
        ),
      },
    ],
  },
  {
    path: "/:category/:id",
    element: <MovieDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
