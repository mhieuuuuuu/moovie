import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Heart } from "lucide-react";
import Card from "../components/Card";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ProfilePage() {
  const { currentUser } = useAuth();

  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const fetchFavs = async () => {
      if (!currentUser) return;
      const snapshot = await getDocs(
        collection(db, "users", currentUser.uid, "favorites")
      );
      const favList = snapshot.docs.map((doc) => doc.data());
      setFavMovies(favList);
    };
    fetchFavs();
    window.scrollTo(0, 0);
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex p-6 gap-6 bg-background text-white items-stretch">
        <div className="w-[30%] bg-surface p-10 rounded-xl">
          <div className="flex flex-col items-center">
            <img
              src={
                currentUser?.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLJfKaGbymfs6A97-1Lxqj0DXgzUnLBVBFQ&s"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold">
              {currentUser?.displayName || "No Name"}
            </h2>
            <p className="text-sm text-gray-400">{currentUser?.email}</p>
          </div>
        </div>

        <div className="w-[70%] bg-surface/40 p-10 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="text-red-500" /> Favorite Movies
          </h2>
          {favMovies.length === 0 ? (
            <p className="text-gray-400">
              This user haven’t favorited any movie yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-5 justify-between">
              {favMovies.map((movie, i) => (
                <Card
                  key={i}
                  posterPath={movie.poster_path}
                  movieTitle={movie.name}
                  movieName={movie.name}
                  voteAverage={movie.vote_average}
                  id={movie.id}
                  type={movie.media_type}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
