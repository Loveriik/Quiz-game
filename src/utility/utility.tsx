import logo1 from "../icons/history.png";
import logo2 from "../icons/games.png";
import logo3 from "../icons/music.png";
import logo4 from "../icons/movies.png";
import logo5 from "../icons/art.png";
import logo6 from "../icons/celebrities.png";

export const categoryArray = [
  {
    name: "History",
    alt: "histroy icon",
    src: logo1,
  },
  {
    name: "Video Games",
    alt: "video games icon",
    src: logo2,
  },
  {
    name: "Music",
    alt: "video games icon",
    src: logo3,
  },
  {
    name: "Movies",
    alt: "movies icon",
    src: logo4,
  },
  {
    name: "Art",
    alt: "Art icon",
    src: logo5,
  },
  {
    name: "Celebrities",
    alt: "celebrities icon",
    src: logo6,
  },
];

export enum GameCategory {
  History = "history",
  VideoGames = "video games",
  Music = "music",
  Movies = "movies",
  Art = "art",
  Celebrities = "celebrities",
}

export enum Actions {
  GameType = "game-type",
  GameDifficulty = "game-difficulty",
  Reset = "reset",
}
