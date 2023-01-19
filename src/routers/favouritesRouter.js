const express = require("express");
const {
  getAllPlayers,
  getAllTeams,
  getAllLeagues,
  addFavouritePlayers,
  getFavouritesList,
  addFavouriteTeams,
  addFavouriteLeagues,
  getPlayerSearchResult,
  getLeagueSearchResult,
  deleteFavouriteLeagues,
  deleteFavouriteTeams,
  dleteFavouritePlayers
} = require("../controllers/favouritesController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/players", getAllPlayers);
router.get("/teams", getAllTeams);
router.get("/leagues", getAllLeagues);
router.post("/add-favourite-players",authMiddleware, addFavouritePlayers);
router.post("/add-favourite-teams",authMiddleware, addFavouriteTeams);
router.post("/add-favourite-leagues",authMiddleware, addFavouriteLeagues);
router.get("/get-all-favourites", authMiddleware,getFavouritesList);
router.post("/get-players-search-result", getPlayerSearchResult);
router.post("/get-leagues-search-result", getLeagueSearchResult);
router.post("/delete-favourite-players",authMiddleware,dleteFavouritePlayers);
router.post("/delete-favourite-teams",authMiddleware,deleteFavouriteTeams);
router.post("/delete-favourite-leagues",authMiddleware,deleteFavouriteLeagues);


module.exports = router;
