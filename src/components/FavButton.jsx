import { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { Heart } from "lucide-react";

const FavButton = ({
  user,
  media_type,
  id,
  name,
  poster_path,
  vote_average,
}) => {
  const [isFav, setIsFav] = useState(false);

  const favId = `${media_type}_${id}`;

  useEffect(() => {
    if (!user) return;
    const checkFav = async () => {
      const docRef = doc(db, "users", user.uid, "favorites", favId);
      const docSnap = await getDoc(docRef);
      setIsFav(docSnap.exists());
    };
    checkFav();
  }, [user, media_type, id, favId]);

  const toggleFavorite = async () => {
    if (!user) return alert("Please login first!");
    const docRef = doc(db, "users", user.uid, "favorites", favId);

    if (isFav) {
      await deleteDoc(docRef);
      setIsFav(false);
    } else {
      await setDoc(docRef, {
        id: id,
        media_type: media_type,
        name: name,
        poster_path: poster_path,
        vote_average: vote_average,
      });
      setIsFav(true);
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer hover:border-hover ml-2 border-2 h-[50px] w-[50px] rounded-[50%] p-[2.5px] shadow-[0.6px 0.6px 1px -0.1px rgba(0,0,0,0.15), -0.6px -0.6px 1px -0.1px rgba(255,255,255,0.7)] flex items-center justify-center"
    >
      <Heart size={24} className={`text-red-500 ${isFav && "fill-red-500"}`} />
    </div>
  );
};

export default FavButton;
