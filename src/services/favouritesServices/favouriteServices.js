const { Favourites } = require("../../models/favouritesSchema");
const { Leagues } = require("../../models/leagues");
const { Players } = require("../../models/players");
const { Teams } = require("../../models/teams");

module.exports = {
  getPlayers: () => {
    return new Promise(async (resolve, reject) => {
      await Players.find()
        .limit(50)
        .then((res) => {
          if (res) {
            resolve(res);
          } else {
            reject("No players found");
          }
        });
    });
  },

  getTeams: () => {
    return new Promise(async (resolve, reject) => {
      await Teams.find().then((res) => {
        if (res) {
          resolve(res);
        } else {
          reject("No Teams found");
        }
      });
    });
  },

  getLeagues: () => {
    return new Promise(async (resolve, reject) => {
      await Leagues.find().then((res) => {
        if (res) {
          resolve(res);
        } else {
          reject("No Leagues found");
        }
      });
    });
  },

  addPlayersToFavourite: (data, userId) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.findOne({ userId: userId }).then(async (res) => {
        if (res) {
          if (res.players.length) {
            let playerExist = res.players.find((e) => {
              if (e.id === data.id) {
                return true;
              } else {
                return false;
              }
            });
            if (playerExist) {
              resolve(true);
            } else {
              Favourites.updateOne(
                { userId: userId },
                { $push: { players: data } }
              ).then((res) => {
                resolve(true);
              });
            }
          } else {
            await Favourites.updateOne(
              { userId: userId },
              { $push: { players: data } },
              { upsert: true }
            ).then((res) => {
              resolve(true);
            });
          }
        } else {
          const favourites = new Favourites({
            userId: userId,
            players: data,
          });
          favourites.save((err, details) => {
            if (err) {
              console.log("error" + err);
            } else {
              resolve(details);
            }
          });
        }
      });
    });
  },

  getFavourites: (userId) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.findOne({ userId: userId }).then((res) => {
        if (res) {
          resolve(res);
        } else {
          reject("No data found");
        }
      });
    });
  },

  addTeamToFavourite: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.findOne({ userId: userId }).then(async (res) => {
        if (res) {
          if (res.teams.length) {
            let teamExist = res.teams.find((e) => {
              if (e.id === data.id) {
                return true;
              } else {
                return false;
              }
            });
            if (teamExist) {
              resolve(true);
            } else {
              Favourites.updateOne(
                { userId: userId },
                { $push: { teams: data } }
              ).then((res) => {
                resolve(true);
              });
            }
          } else {
            await Favourites.updateOne(
              { userId: userId },
              { $push: { teams: data } },
              { upsert: true }
            ).then((res) => {
              resolve(true);
            });
          }
        } else {
          const favourites = new Favourites({
            userId: userId,
            teams: teams,
          });
          favourites.save((err, details) => {
            if (err) {
              console.log("error" + err);
            } else {
              resolve(details);
            }
          });
        }
      });
    });
  },

  addLeagueToFavourite: (data, userId) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.findOne({ userId: userId }).then(async (res) => {
        if (res) {
          if (res.leagues.length) {
            let leaguesExist = res.leagues.find((e) => {
              if (e.id === data.id) {
                return true;
              } else {
                return false;
              }
            });
            if (leaguesExist) {
              reject("league already exist");
            } else {
              Favourites.updateOne(
                { userId: userId },
                { $push: { leagues: data } }
              ).then((res) => {
                if (res) {
                  resolve(true);
                } else {
                  reject(err);
                }
              });
            }
          } else {
            await Favourites.updateOne(
              { userId: userId },
              { $push: { leagues: data } },
              { upsert: true }
            ).then((res) => {
              resolve(true);
            });
          }
        } else {
          const favourites = new Favourites({
            userId: userId,
            leagues: data,
          });
          favourites.save((err, details) => {
            if (err) {
              console.log("error" + err);
            } else {
              resolve(details);
            }
          });
        }
      });
    });
  },

  getSearchedPlayerList: (data) => {
    return new Promise(async (resolve, reject) => {
      await Players.find({ $text: { $search: data } }).limit(50).then(
        async (response, err) => {
          if (response) {
            resolve(response);
          } else {
            reject(err)
          }
        }
      );
    });
  },
  getSearchedTeamsList: (data) => {
    console.log("data", data);
    return new Promise(async (resolve, reject) => {
      await Teams.find({ $text: { $search: data } }).limit(50).then(
        async (response, err) => {
          console.log("response", response);
          if (response) {
            resolve(response);
          } else {
            reject(err)
          }
        }
      );
      // resolve([]);
      // await Teams.find().then((res, err) => {
      //   if (res) {
      //     resolve(res);
      //   } else {
      //     reject(err)
      //   }
      // })
    });
  },

  deleteLeaguesFromFavourite: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.updateOne({ userId: userId }, { $pull: { leagues: { id: data.id } } }).then(async (res) => {
        if (res) {
          await Favourites.findOne({ userId: userId }).then((res) => {
            if (res) {
              resolve(res);
            } else {
              reject("No data found");
            }
          });
        } else {
          reject("delete unsuccessfull")
        }
      })
    })
  },

  deleteTeamsFromFavourite: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.updateOne({ userId: userId }, { $pull: { teams: { id: data.id } } }).then(async (res) => {
        if (res) {
          await Favourites.findOne({ userId: userId }).then((res) => {
            if (res) {
              resolve(res);
            } else {
              reject("No data found");
            }
          });
        } else {
          reject("delete unsuccessfull")
        }
      })
    })
  },

  deletePlayersFromFavourite: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      await Favourites.updateOne({ userId: userId }, { $pull: { players: { id: data.id } } }).then(async (res) => {
        if (res) {
          await Favourites.findOne({ userId: userId }).then((res) => {
            if (res) {
              resolve(res);
            } else {
              reject("No data found");
            }
          });
        } else {
          reject("delete unsuccessfull")
        }
      })
    })
  }
};
