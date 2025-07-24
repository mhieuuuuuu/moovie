const apikey = "api_key=22348bf6f06376a691526e655159ce80";
const baseUrl = "https://api.themoviedb.org/3";
export const movieApi = {
  trending: baseUrl + "/trending/movie/day?" + apikey,
  TVtrending: baseUrl + "/trending/tv/day?" + apikey,
  popular: baseUrl + "/movie/popular?" + apikey,
  nowPlaying: baseUrl + "/movie/now_playing?" + apikey,
  topRated: baseUrl + "/movie/top_rated?" + apikey,
  upcoming: baseUrl + "/movie/upcoming?" + apikey,
  tvAiringToday: baseUrl + "/tv/airing_today?" + apikey,
  tvOnTheAir: baseUrl + "/tv/on_the_air?" + apikey,
  tvPopular: baseUrl + "/tv/popular?" + apikey,
  tvTopRated: baseUrl + "/tv/top_rated?" + apikey,
  popularPeople: baseUrl + "/person/popular?" + apikey,
};
