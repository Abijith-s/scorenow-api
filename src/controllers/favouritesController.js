const favouritesSerives = require("../services/favouritesServices/favouriteServices");
const {
  BadRequestError,
} = require("../middlewares/ErrorHandlers/error-handlers/bad-request-error");
const {
  InternalServerError,
} = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");

const getAllPlayers = (req, res, next) => {
  favouritesSerives
    .getPlayers()
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "players fetched successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const getAllTeams = (req, res, next) => {
  favouritesSerives
    .getTeams()
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "Teams fetched successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const getAllLeagues = (req, res, next) => {
  favouritesSerives
    .getLeagues()
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "Leagues fetched successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const addFavouritePlayers = (req, res, next) => {
  favouritesSerives
    .addPlayersToFavourite(req.body, req.userId)
    .then((data) => {
      if (data) {
        res.json({
          message: "Players added successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const addFavouriteTeams = (req, res, next) => {
  favouritesSerives
    .addTeamToFavourite(req.userId, req.body)
    .then((data) => {
      if (data) {
        res.json({
          message: "Players added successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const addFavouriteLeagues = (req, res, next) => {
  favouritesSerives
    .addLeagueToFavourite(req.body, req.userId)
    .then((data) => {
      if (data) {
        res.json({
          message: "League added successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const getFavouritesList = (req, res, next) => {
  favouritesSerives
    .getFavourites(req.userId)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "Players added successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};
const getPlayerSearchResult = (req, res, next) => {
  favouritesSerives
    .getSearchedPlayerList(req.body.searchText)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const getLeagueSearchResult = (req, res, next) => {
  favouritesSerives
    .getSearchedTeamsList(req.body.searchText)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
}

const deleteFavouriteLeagues = (req, res, next) => {
  favouritesSerives
    .deleteLeaguesFromFavourite(req.userId, req.body)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "League deleted successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const deleteFavouriteTeams = (req, res, next) => {
  favouritesSerives
    .deleteTeamsFromFavourite(req.userId, req.body)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "Teams deleted successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

const dleteFavouritePlayers = (req, res, next) => {
  favouritesSerives
    .deletePlayersFromFavourite(req.userId, req.body)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
          message: "Players deleted successfully",
        });
      } else return next(new InternalServerError());
    })
    .catch((err) => {
      return next(new BadRequestError(err));
    });
};

module.exports = {
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
  dleteFavouritePlayers,
};
