const { Leagues } = require("../../models/leagues");
const { Players } = require("../../models/players");
const { Teams } = require("../../models/teams");


const liveMatchParser = async (payload) => {

    return new Promise(async (resolve, reject) => {
        let arr = [];
        for await (const data of payload) {
            data.currentBatsman = await (async () => {
                let cBatman = data?.batting.find((player) => player.active == true);
                if (cBatman) {
                    return cBatman
                }
                else return {}
            })();
            data.supportBatsman = await (async () => {
                let sBatman = data?.batting.find((player) => player.active === false && player.catch_stump_player_id == null && player.runout_by_id == null && player.batsmanout_id == null && player.bowling_player_id == null);
                if (sBatman) {
                    return sBatman
                }
                else return {};
            })();
            data.currentBowler = await (async () => {
                let cBowler = data?.bowling.find((player) => player.active == true);
                if (cBowler) {
                    return cBowler
                }
                else return {}
            })();
            data.currentOverStatus = await (async () => {
                if (data.status.includes('Innings')) {
                    if (data.balls.length > 0) {
                        let ballings = data.balls?.slice(-6);
                        let lastBall = "" + ballings[ballings.length - 1]?.ball;
                        lastBall = lastBall?.split('.')[1];
                        ballings = ballings?.slice(-lastBall);
                        return ballings;
                    }
                } else return []
            })();
            data.yetToBat = await (async () => {
                let arr = [];
                for await (const player of data.lineup) {
                    if (data.balls.length > 0) {
                        let currentBattingTeamId = data.balls[data.balls.length - 1].team?.id;
                        let batsman = data?.batting.find((elem) => player.id == elem.player_id);
                        if (!batsman && player.lineup.team_id == currentBattingTeamId) arr.push(player);
                    }
                };
                return arr;
            })();
        }
        resolve(payload);
    })
};

const matchDetailParser = async (payload) => {
    let battingBy = payload.batting.find((elem) => elem.active === true);
    battingBy = await Players.findOne({ id: battingBy.id });
    let bowlingBy = payload.bowling.find((elem) => elem.active === true);
    if (bowlingBy) bowlingBy = await Players.findOne({ id: bowlingBy?.id });
    const league = await Leagues.findOne({ id: payload.league_id }).exec();
    const homeTeam = await Teams.findOne({ id: payload.localteam_id }).exec();
    const awayTeam = await Teams.findOne({ id: payload.visitorteam_id }).exec();
    const tossWonBy = payload.toss_won_team_id == homeTeam.id ? homeTeam.name : awayTeam.name;
    return {
        homeTeam,
        awayTeam,
        homeTeamName: homeTeam.name,
        awayTeamName: awayTeam.name,
        tossWonBy,
        elected: payload.elected,
        note: payload.note,
        super_over: payload.super_over,
        status: payload.status,
        live: payload.live,
        round: payload.round,
        league_data: league,
        homeTeamScore: {
            score: payload.localteam_dl_data.score,
            overs: payload.localteam_dl_data.overs,
            wickets_out: payload.localteam_dl_data.wickets_out
        },
        awayTeamScore: {
            score: payload.visitorteam_dl_data.score,
            overs: payload.visitorteam_dl_data.overs,
            wickets_out: payload.visitorteam_dl_data.wickets_out
        },
        battingBy,
        bowlingBy,
        battings: payload.batting,
        bowlings: payload.bowling
    }
}

const leagueParser = async (payload) => {
    let arr = [];
    payload.data.map((e)=>{
        let league = e.name
        let icon = e.image_path
        return arr.push({league,icon});
    })
    return arr;
}

const finishedMatchesParser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        let arr = [];
        for await (const data of payload) {
            const league = await Leagues.findOne({ id: data.league_id }).exec();
            const homeTeam = await Teams.findOne({ id: data.localteam_id }).exec();
            const awayTeam = await Teams.findOne({ id: data.visitorteam_id }).exec(); 
            const tossWonBy = payload.toss_won_team_id == homeTeam?.id ? homeTeam?.name : awayTeam?.name;
            const winnerTeam = await Teams.findOne({ id: data.winner_team_id }).exec();
            const manOfTheMatch = await Players.findOne({ id: data.man_of_match_id }).exec();



            arr.push({
                homeTeamName: homeTeam?.name,
                homeTeamLogo: homeTeam?.image_path,
                awayTeamName: awayTeam?.name,
                awayTeamLogo: awayTeam?.image_path,
                date:data?.starting_at,
                tossWonBy,
                elected: data?.elected,
                note: data?.note,
                super_over: data?.super_over,
                note: data.note,
                status: data.status,
                live: data.live,
                totalOversPlayed: data.total_overs_played,
                round: data.round,
                league_data: league,
                homeTeamScore: {
                    score: data.localteam_dl_data.score,
                    overs: data.localteam_dl_data.overs,
                    wickets_out: data.localteam_dl_data.wickets_out
                },
                awayTeamScore: {
                    score: data.visitorteam_dl_data.score,
                    overs: data.visitorteam_dl_data.overs,
                    wickets_out: data.visitorteam_dl_data.wickets_out
                },
                battings: data.batting,
                bowlings: data.bowling
            });
        }
        resolve(arr);
    })
}

const upcomingMatchesParser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        let arr = [];
        for await (const data of payload) {
            const league = await Leagues.findOne({ id: data.league_id }).exec();
            const homeTeam = await Teams.findOne({ id: data.localteam_id }).exec();
            const awayTeam = await Teams.findOne({ id: data.visitorteam_id }).exec(); 
            const tossWonBy = payload.toss_won_team_id == homeTeam?.id ? homeTeam?.name : awayTeam?.name;
            const winnerTeam = await Teams.findOne({ id: data.winner_team_id }).exec();
            const manOfTheMatch = await Players.findOne({ id: data.man_of_match_id }).exec();



            arr.push({
                homeTeamName: homeTeam?.name,
                homeTeamLogo: homeTeam?.image_path,
                awayTeamName: awayTeam?.name,
                awayTeamLogo: awayTeam?.image_path,
                matchId:data?.id,
                date:data?.starting_at,
                type:data?.type,
            });
        }
        resolve(arr);
    })
}

const tommorowsMatchParser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        let arr = [];
        if(payload){
            for await (const data of payload) {
                const league = await Leagues.findOne({ id: data.league_id }).exec();
                const homeTeam = await Teams.findOne({ id: data.localteam_id }).exec();
                const awayTeam = await Teams.findOne({ id: data.visitorteam_id }).exec(); 
                const tossWonBy = payload.toss_won_team_id == homeTeam?.id ? homeTeam?.name : awayTeam?.name;
                const winnerTeam = await Teams.findOne({ id: data.winner_team_id }).exec();
                const manOfTheMatch = await Players.findOne({ id: data.man_of_match_id }).exec();
                arr.push({
                    homeTeamName: homeTeam?.name,
                    homeTeamLogo: homeTeam?.image_path,
                    awayTeamName: awayTeam?.name,
                    awayTeamLogo: awayTeam?.image_path,
                    matchId:data?.id,
                });
            }
            resolve(arr);
        }else{
            reject("no data");
        }
       
       
    })
}
const teamRankingParser = (payload)=>{
    let arr = [];
    payload.find((e)=>{
        if(e.type === 'TEST' && e.gender === 'men'){
            let team = e.team
            return arr.push({type:'TEST',gender:'men',team})
        }
    });

    payload.find((e)=>{
        if(e.type === 'TEST' && e.gender === 'women'){
            let team = e.team
            return arr.push({type:'TEST',gender:'women',team})
        }
    }); 

     payload.find((e)=>{
        if(e.type === 'ODI' && e.gender === 'men'){
            let team = e.team
            return arr.push({type:'ODI',gender:'men',team})
        }
    });
    
     payload.find((e)=>{
        if(e.type === 'ODI' && e.gender === 'women'){
            let team = e.team
            return arr.push({type:'ODI',gender:'women',team})
        }
    });

    payload.find((e)=>{
        if(e.type === 'T20I' && e.gender === 'men'){
            let team = e.team
            return arr.push({type:'T20I',gender:'men',team})
        }
    });

     payload.find((e)=>{
        if(e.type === 'T20I' && e.gender === 'women'){
            let team = e.team
            return arr.push({type:'T20I',gender:'women',team})
        }
    });
    
    return arr;

}

module.exports = {
    liveMatchParser,
    matchDetailParser,
    leagueParser,
    finishedMatchesParser,
    teamRankingParser,
    upcomingMatchesParser,
    tommorowsMatchParser 

}