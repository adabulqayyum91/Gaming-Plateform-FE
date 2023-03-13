import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './index.module.scss';
import { getFantasyLeagues, createFantasyLeague } from './reducers';
import HorizontalScroll from '../../../../common/horizontalScroll/horizontalScroll';
import DynamicButton from '../../../components/dynamicButton/dynamicButton';
import AddFantasyLeagueModal from './components/addFantasyLeagueModal';
import FantasyLeagueCard from '../../../components/FantasyLeagueCard/fantasyLeagueCard';
import GeneralText from '../../../components/generalText/generalText';
import profileBgImg from '../../../../assets/maxresdefault.png';
import PlatformTypeBar from '../../../components/platformTypeBar/platformTypeBar';
import { getFranchiseLeagues } from '../../Franchise/Leagues/reducers';

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";
const Types = ["All", "My Leagues", "E-Sports", "Participated"];

export default function FantasyLeague() {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("All");
  const [isFleagueModalOpen, setIsFleagueModalOpen] = useState(false);

  const {
    fantasyLeaguesData: {
      myFantasyLeagues,
      joinedFantasyLeagues,
      esportsFantasyLeagues,
    },
  } = useSelector((state) => state.userFantasyLeagues);
  const { leagues } = useSelector((state) => state.userFranchiseLeagues);

  useLayoutEffect(() => {
    dispatch(getFantasyLeagues({ game: 'All' }));
    dispatch(getFranchiseLeagues());
  }, []);
  const createFantasyLeagueHanlder = (values) => {
    dispatch(createFantasyLeague(values));
    setIsFleagueModalOpen(false);
  };
  const typeFilterHandler = (val) => {
    setTypeFilter(val);
    let _game = 'All';
    dispatch(getFantasyLeagues({ game: _game }));
  };
  const handleClose = () => {
    setIsFleagueModalOpen(false);
  };

  const _cloneLeagues = [...myFantasyLeagues, ...esportsFantasyLeagues];
  const ids = _cloneLeagues?.map((x) => x._id);
  const uniqueFilteredJoined = joinedFantasyLeagues?.filter(
    (x) => !ids?.includes(x._id)
  );
  let leaguesToShow =
    typeFilter == Types[0]
      ? [...myFantasyLeagues, ...esportsFantasyLeagues, ...uniqueFilteredJoined]
      : typeFilter == Types[1]
        ? myFantasyLeagues
        : typeFilter == Types[2]
          ? esportsFantasyLeagues
          : joinedFantasyLeagues;

  return (
    <>
      <AddFantasyLeagueModal
        open={isFleagueModalOpen}
        handleClose={handleClose}
        handleCreateFantasyLeague={createFantasyLeagueHanlder}
        leagues={leagues}
        friends={[]}
      />
      <Box className={'far-apart-center'}>
        <Box>
          <PlatformTypeBar
            types={Types}
            val={typeFilter}
            valHanlder={(val) => typeFilterHandler(val)}
          />
        </Box>
        <DynamicButton
          title='Create a FL'
          clickHandler={() => setIsFleagueModalOpen(true)}
          pl='20px'
          pr='20px'
          pt='5px'
          pb='5px'
          color={true}
        />
      </Box>
      <Box>
        <Typography
          component='p'
          py={2}
          sx={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
        >
          {typeFilter == Types[0]
            ? "All Leagues"
            : typeFilter == Types[1]
              ? "My Fantasy Leagues"
              : typeFilter == Types[2]
                ? "E-Sports Fantasy Leagues"
                : "You are participating"}
        </Typography>
        <Grid container spacing={2}>
          {leaguesToShow?.length ? (
            leaguesToShow?.map((x, i) => {
              return (
                <Grid item key={i} md={12 / 3} lg={12 / 4} xl={12 / 5}>
                  <FantasyLeagueCard
                    key={i}
                    link={'/user/fantasy-leagues/' + x._id}
                    img={
                      x?.flTitleImage ? BASE_URL + x.flTitleImage : profileBgImg
                    }
                    name={x.flName}
                  />
                </Grid>
              );
            })
          ) : (
            <GeneralText text='No Leagues Found!' height='200px' />
          )}
        </Grid>
      </Box>
    </>
  );
}
