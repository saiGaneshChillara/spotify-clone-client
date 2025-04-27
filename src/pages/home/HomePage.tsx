import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";

const HomePage = () => {
  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, trendingSongs, featuredSongs } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  return (
    <div className="rounded-md overflow-hidden">
      <Topbar />
      <FeaturedSection />
    </div>
  );
};

export default HomePage;