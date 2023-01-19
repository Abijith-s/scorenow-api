const express = require("express");
const {
  getMatchDetailsController,
} = require("../controllers/getMatchDetailsController");
const {
  getLiveMatchController,
} = require("../controllers/getLiveMatchesController");
const {
  saveContinentsController,
} = require("../controllers/saveContinentsController");
const {
  saveCountriesController,
} = require("../controllers/saveCountriesController");
const { saveLeagueController } = require("../controllers/saveLeagueController");
const {
  savePlayersController,
} = require("../controllers/savePlayersController");
const { saveTeamsController } = require("../controllers/saveTeamsController");
const { getLeaguesController } = require("../controllers/getLeaguesController");
const {
  getFinishedMatchesController,
} = require("../controllers/getFinishedMatchesController");
const {
  getTeamRankingsController,
} = require("../controllers/getTeamRankingsController");
const { getUpcomingMatchesController } = require("../controllers/getUpcomingMatchesController");


const router = express.Router();

router.get("/get-live-matches", getLiveMatchController);
router.post("/save-continent", saveContinentsController);
router.post("/save-countries", saveCountriesController);
router.post("/save-leagues", saveLeagueController);
router.post("/save-teams", saveTeamsController);
router.post("/save-players", savePlayersController);
router.get("/match-detail/:matchId", getMatchDetailsController);
router.get("/get-leagues", getLeaguesController);
router.get("/get-finished-matches", getFinishedMatchesController);
router.get("/get-upcoming-matches", getUpcomingMatchesController);
router.get("/get-team-rankings", getTeamRankingsController);


module.exports = {
  cricketRouter: router,
};
