import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import logger from 'redux-logger';
import { all, fork } from "redux-saga/effects";

// User
import userHeaderReducer from "../User/layout/header/reducers";
import userHeaderSaga from "../User/layout/header/sagas";
import userChatReducer from "../User/layout/chatbar/reducers";
import userChatSaga from "../User/layout/chatbar/sagas";
import userSearchReducer from "../User/pages/SearchUserProfile/reducers";
import userSearchSaga from "../User/pages/SearchUserProfile/sagas";

import UserAuthReducer from "../User/pages/Auth/reducers";
import UserAuthSaga from "../User/pages/Auth/sagas";
import userProfileReducer from "../User/pages/Profile/reducers";
import userProfileSaga from "../User/pages/Profile/sagas";
import userGamesReducer from "../User/pages/Games/reducers";
import userGamesSaga from "../User/pages/Games/sagas";
import userGameProfileReducer from "../User/pages/GameProfile/reducers";
import userGameProfileSaga from "../User/pages/GameProfile/sagas";
import userTournamentProfileReducer from "../User/pages/TournamentProfile/reducers";
import userTournamentProfileSaga from "../User/pages/TournamentProfile/sagas";
import userLadderProfileReducer from "../User/pages/LadderProfile/reducers";
import userLadderProfileSaga from "../User/pages/LadderProfile/sagas";
import userTeamsReducer from "../User/pages/Teams/reducers";
import userTeamsSaga from "../User/pages/Teams/sagas";
import userMatchesReducer from "../User/pages/Matches/reducers";
import userMatchesSaga from "../User/pages/Matches/sagas";
import userMatchProfileReducer from "../User/pages/MatchProfile/reducers";
import userMatchProfileSaga from "../User/pages/MatchProfile/sagas";
import userInvitesReducer from "../User/pages/Invites/reducers";
import userInvitesSaga from "../User/pages/Invites/sagas";
import userTeamProfileReducer from "../User/pages/TeamProfile/reducers";
import userTeamProfileSaga from "../User/pages/TeamProfile/sagas";
import userFranchiseProfileReducer from "../User/pages/Franchise/Profile/reducers";
import userFranchiseProfileSaga from "../User/pages/Franchise/Profile/sagas";
import userFranchiseTeamProfileReducer from "../User/pages/Franchise/TeamProfile/reducers";
import userFranchiseTeamProfileSaga from "../User/pages/Franchise/TeamProfile/sagas";
import userFranchiseTournamentProfileReducer from "../User/pages/Franchise/TournamentProfile/reducers";
import userFranchiseTournamentProfileSaga from "../User/pages/Franchise/TournamentProfile/sagas";
import userFranchiseTournamentsReducer from "../User/pages/Franchise/Tournaments/reducers";
import userFranchiseTournamentsSaga from "../User/pages/Franchise/Tournaments/sagas";
import userFranchiseLeaguesReducer from "../User/pages/Franchise/Leagues/reducers";
import userFranchiseLeaguesSaga from "../User/pages/Franchise/Leagues/sagas";
import userFranchiseNonOwnerProfileReducer from "../User/pages/Franchise/NonOwnerProfile/reducers";
import userFranchiseNonOwnerProfileSaga from "../User/pages/Franchise/NonOwnerProfile/sagas";
import userFranchiseLeagueProfileReducer from "../User/pages/Franchise/LeagueProfile/reducers";
import userFranchiseLeagueProfileSaga from "../User/pages/Franchise/LeagueProfile/sagas";
import userFranchiseTeamsReducer from "../User/pages/Franchise/Teams/reducers";
import userFranchiseTeamsSaga from "../User/pages/Franchise/Teams/sagas";
import userFantasyLeagueReducer from "../User/pages/Fantasy/FantasyLeague/reducers";
import userFantasyLeagueSaga from "../User/pages/Fantasy/FantasyLeague/sagas";
import userFantasyLeagueProfileReducer from "../User/pages/Fantasy/FantasyLeagueProfile/reducers";
import userFantasyLeagueProfileSaga from "../User/pages/Fantasy/FantasyLeagueProfile/sagas";
import userFantasyTeamProfileReducer from "../User/pages/Fantasy/TeamViewModal/reducers";
import userFantasyTeamProfileSaga from "../User/pages/Fantasy/TeamViewModal/sagas";

// Admin
import adminDashboardReducer from "../Admin/pages/Dashboard/reducers";
import adminDashboardSaga from "../Admin/pages/Dashboard/sagas";
import adminUsersReducer from "../Admin/pages/Users/reducers";
import adminUsersSaga from "../Admin/pages/Users/sagas";
import adminTournamentsReducer from "../Admin/pages/Tournaments/reducers";
import adminTournamentsSaga from "../Admin/pages/Tournaments/sagas";
import adminLaddersReducer from "../Admin/pages/Ladders/reducers";
import adminLaddersSaga from "../Admin/pages/Ladders/sagas";
import adminGamesReducer from "../Admin/pages/Games/reducers";
import adminGamesSaga from "../Admin/pages/Games/sagas";
import adminLaddersResultsReducer from "../Admin/pages/LaddersResults/reducers";
import adminLaddersResultsSaga from "../Admin/pages/LaddersResults/sagas";
import adminWarLaddersResultsReducer from "../Admin/pages/LaddersWarResults/reducers";
import adminWarLaddersResultsSaga from "../Admin/pages/LaddersWarResults/sagas";
import adminTournamentsResultsReducer from "../Admin/pages/TournamentsResults/reducers";
import adminTournamentsResultsSaga from "../Admin/pages/TournamentsResults/sagas";
import adminMatchesResultsReducer from "../Admin/pages/MatchResults/reducers";
import adminMatchesResultsSaga from "../Admin/pages/MatchResults/sagas";
import adminFranchisesReducer from "../Admin/pages/Franchises/reducers";
import adminFranchisesSaga from "../Admin/pages/Franchises/sagas";
import adminLeaguesReducer from "../Admin/pages/Leagues/reducers";
import adminLeaguesSaga from "../Admin/pages/Leagues/sagas";
import adminFantasyLeaguesReducer from "../Admin/pages/FantasyLeagues/reducers";
import adminFantasyLeaguesSaga from "../Admin/pages/FantasyLeagues/sagas";
import adminGpLeagueResultsReducer from "../Admin/pages/GPLeagueResults/reducers";
import adminGpLeagueResultsSaga from "../Admin/pages/GPLeagueResults/sagas";

const forkAll = (...sagas) => all(sagas.map((saga) => fork(saga)));

const rootSaga = function* saga() {
  yield forkAll(
    userHeaderSaga,
    userChatSaga,
    userSearchSaga,
    UserAuthSaga,
    userProfileSaga,
    userGamesSaga,
    userGameProfileSaga,
    userTournamentProfileSaga,
    userLadderProfileSaga,
    userTeamsSaga,
    userMatchesSaga,
    userMatchProfileSaga,
    userInvitesSaga,
    userTeamProfileSaga,
    userFranchiseProfileSaga,
    userFranchiseTeamProfileSaga,
    userFranchiseTournamentProfileSaga,
    userFranchiseTournamentsSaga,
    userFranchiseLeaguesSaga,
    userFranchiseNonOwnerProfileSaga,
    userFranchiseLeagueProfileSaga,
    userFranchiseTeamsSaga,
    userFantasyLeagueSaga,
    userFantasyLeagueProfileSaga,
    userFantasyTeamProfileSaga,

    //admin
    adminDashboardSaga,
    adminUsersSaga,
    adminTournamentsSaga,
    adminGamesSaga,
    adminLaddersResultsSaga,
    adminWarLaddersResultsSaga,
    adminTournamentsResultsSaga,
    adminMatchesResultsSaga,
    adminLaddersSaga,
    adminFranchisesSaga,
    adminLeaguesSaga,
    adminFantasyLeaguesSaga,
    adminGpLeagueResultsSaga
  );
};

const rootReducer = {
  //user
  userHeader: userHeaderReducer,
  userChat: userChatReducer,
  userSearch: userSearchReducer,
  userAuth: UserAuthReducer,
  userProfile: userProfileReducer,
  userGames: userGamesReducer,
  userGameProfile: userGameProfileReducer,
  userTournamentProfile: userTournamentProfileReducer,
  userLadderProfile: userLadderProfileReducer,
  userTeams: userTeamsReducer,
  userMatches: userMatchesReducer,
  userMatchProfile: userMatchProfileReducer,
  userInvites: userInvitesReducer,
  userTeamProfile: userTeamProfileReducer,
  userFranchiseProfile: userFranchiseProfileReducer,
  userFranchiseTeamProfile: userFranchiseTeamProfileReducer,
  userFranchiseTournamentProfile: userFranchiseTournamentProfileReducer,
  userFranchiseTournaments: userFranchiseTournamentsReducer,
  userFranchiseLeagues: userFranchiseLeaguesReducer,
  userNonOwnerFranchiseProfile: userFranchiseNonOwnerProfileReducer,
  userFranchiseLeagueProfile: userFranchiseLeagueProfileReducer,
  userFranchiseTeams: userFranchiseTeamsReducer,
  userFantasyLeagues: userFantasyLeagueReducer,
  userFantasyLeagueProfile: userFantasyLeagueProfileReducer,
  userFantasyTeamModalProfile: userFantasyTeamProfileReducer,

  //admin
  dashboard: adminDashboardReducer,
  users: adminUsersReducer,
  games: adminGamesReducer,
  tournaments: adminTournamentsReducer,
  ladders: adminLaddersReducer,
  laddersResults: adminLaddersResultsReducer,
  totalWarLaddersResults: adminWarLaddersResultsReducer,
  tournamentsResults: adminTournamentsResultsReducer,
  matchesResults: adminMatchesResultsReducer,
  adminFranchises: adminFranchisesReducer,
  adminLeagues: adminLeaguesReducer,
  adminFantasyLeagues: adminFantasyLeaguesReducer,
  gpLeagueResults: adminGpLeagueResultsReducer,
};

const redux = combineReducers(rootReducer);
const saga = createSagaMiddleware();
const middleware = [saga];

const store = configureStore({
  reducer: redux,
  devTools: true,
  middleware,
});

saga.run(rootSaga);
export default store;
