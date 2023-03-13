import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import classes from './index.module.css';
import { NavLink } from 'react-router-dom';
import './stylesheet.css';
// components

import { Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

import MaskGp280 from '../../../assets/Mask Group 280.svg';
import signout from '../../../assets/Sign out.svg';
import profileIconImg from '../../../assets/teamprofile.png';

import { getUsers, setNavText, logout } from './reducers';
import {
  lowerDashJoinStr,
  tooltipTrim,
  allWordsCapitalize,
} from '../../../utils/apiutils';
import { getFriends } from '../../pages/TeamProfile/reducers';
import DeleteModal from '../../../Admin/components/DeleteModal/deletemodal';

const BASE_URL = process.env.REACT_APP_BASE_URL + '/';
import { Card } from './components';
import { LaddersCard } from './components';
import WinCard from './components/WinCard/WinCard';
import './stylesheet.css';
import Games from './components/games/games';
import backgroundHomeImage from '../../../assets/images/home-background-image.png';
import codIcon from '../../../assets/images/callOfDuty.png';

import winHash from '../../../assets/images/winHash.png';
import winCup from '../../../assets/images/winCup.png';
import winTimer from '../../../assets/images/winTimer.png';
import winFight from '../../../assets/images/winFight.png';
import { Button } from 'react-bootstrap';
import LadderCard from './components/laddersCard';
import WidgetBot from '@widgetbot/react-embed'

const Home = () => {
  const Header = ['Home', 'Games', 'Grand Prix', 'Rules'];
  const [searchVal, setSearchVal] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { users, headerText } = useSelector((state) => state.userHeader);
  const { profile, setprofile } = useSelector((state) => state?.userProfile);
  const { friends } = useSelector((state) => state.userTeamProfile);
  const [urlParam, setUrlParam] = useState(params['*']);

  const [tournamentsData, setTournamentsData] = useState([]);
  const [laddersData, setLaddersData] = useState([]);

  const tournamentsSection = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let fetchRes = fetch(
      'https://backend.gamingplateform.com/api/auth/allTournaments',
      requestOptions
    );
    fetchRes
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setTournamentsData(json.tournamentData);
        }
      })
      .catch((e) => {
        console.log(`error is  ${e}`);
      });
  };
  const laddersSection = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let fetchRes = fetch(
      'https://backend.gamingplateform.com/api/auth/allLadders',
      requestOptions
    );
    fetchRes
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setLaddersData(json.ladderData);
        }
      })
      .catch((e) => {
        console.log(`error is  ${e}`);
      });
  };
  useEffect(() => {
    tournamentsSection();
    laddersSection();
  }, []);
  useEffect(() => {
    //   if (params["*"]) {
    //     const path = localStorage.getItem("navText");
    //     dispatch(setNavText(path));
    //   }
    const userToken = localStorage.getItem('userToken');
    setToken(userToken)
    console.log({ header: userToken });
    if (userToken) {
      dispatch(getFriends());
    }
  }, []);
  const checkSession = () => { };
  const friendIds = friends?.map((friend) => friend?._id);

  const userLogoutHandler = () => {
    dispatch(logout());
    const setter = setTimeout(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user_id');
      localStorage.setItem('navText', 'Profile');
      window.location.replace('/auth/login');
    }, 300);
    setter();
  };
  const refreshHandler = () => {
    navigate('/home');
    checkSession();
  };
  const searchHandler = (val) => {
    setSearchVal(val);
    dispatch(getUsers({ query: val }));
  };
  const userClickHandler = (id) => {
    setSearchVal('');
    navigate('/user/search-user-profile/' + id);
  };
  const headerTextHandler = (val) => {
    localStorage.setItem('navText', val);
    dispatch(setNavText(val));
  };
  const searchClearHandler = () => {
    setSearchVal('');
  };
  // const notifClickHandler = (e) => {
  // };

  return (
    <>
      {/* <WidgetBot
        server="299881420891881473"
        channel="355719584830980096"
      /> */}
      <nav className='navbar navbar-expand-lg navbar-custom '>
        <div className='container-fluid'>
          <a className='navbar-brand' onClick={refreshHandler}>
            Gaming <br /> Plateform
          </a>
          <button
            className='navbar-toggler navbar-toggler-right'
            data-target='#navbarSupportedContent'
            data-toggle='collapse'
            type='button'
          >
            <span className='navbar-toggler-icon'>
              <i
                className='fa fa-navicon'
                style={{ color: '#fff', fontSize: '28px' }}
              ></i>
            </span>
          </button>
          <div className='justify-content-end' id='navbarSupportedContent'>
            <ul className='navbar-nav'>
              {/* {Header.map((item, i) => (
                <li className='nav-item' key={i}>
                  <Link
                    className="nav-link header-nav"
                    to={
                      localStorage.getItem("userToken") || i == 0
                        ? `/${lowerDashJoinStr(item)}`
                        : "/auth/login"
                    }
                    onClick={() => {
                      headerTextHandler(item);
                    }}
                  >
                    <span
                      className={`${
                        headerText === item ? "userHeader-active" : ""
                      }`}
                    >
                      {item}
                    </span>
                  </Link>
                </li>
              ))} */}
              <NavLink to='/home' className='nav-link header-nav'>
                Home
              </NavLink>

              <NavLink to={token ? '/user/games' : '/auth/login'} className='nav-link header-nav'>
                Games
              </NavLink>

              <NavLink to={token ? 'user/grand-prix' : '/auth/login'} className='nav-link header-nav'>
                Grand Prix
              </NavLink>

              <NavLink to={token ? 'user/rules' : '/auth/login'} className='nav-link header-nav'>
                Rules
              </NavLink>

              <li>
                {localStorage.getItem("userToken") ?

                  <></> :
                  <Button
                    style={{
                      color: '#ea8744',
                      border: '1px solid',
                      marginLeft: '15px',
                    }}
                    variant='outlined'
                    onClick={() => {
                      console.log({ profile: profile });
                      navigate('/auth/login')
                    }}
                  >
                    Login
                  </Button>}

              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={'main'}
        style={{ backgroundImage: `url(${backgroundHomeImage})` }}
      >
        <div className={'content'}>
          <h1>COMPETE & WIN</h1>
          <h2>Experience best Of the ESports platform</h2>
        </div>
      </div>
      <div className='container'>
        <div className='mt-4 mb-4'>
          <h3 style={{ color: 'white' }}>Featured Tournaments</h3>
          <Grid
            container
            columnSpacing={5}
            style={{ marginTop: 15, marginBottom: 30 }}
          >
            {/* <Grid>
              <Card tournament="T20" />
            </Grid> ; */}
            {tournamentsData &&
              tournamentsData.map((element, index) => {
                return (
                  <Grid key={index} item>
                    <Card tournament={element} />
                  </Grid>
                );
              })}
          </Grid>
        </div>
        <div className={'follow-page'}>
          <div className={'follow-box'}>
            <div className={'follow-content'}>
              <h2>Gaming Plateform For Updates</h2>
            </div>
            <div className={'follow-button'}>
              <Link
                className='bt'
                to='/auth/login'
                onClick={(e) => notifClickHandler(e)}
              >
                <button>Follow</button>
              </Link>
            </div>
          </div>
        </div>
        {/* // win to earn section */}
        <div className='win-to-page'>
          <div className='win-to-content'>
            <img src={winHash} alt='' />
            <h3>WinToEarn</h3>
            <p>
              Show your gaming skills, compete and win to earn as much you can
            </p>
          </div>
          <div className='win-to-box'>
            <div className='box-tournament'>
              <div className='tournament-content'>
                <img src={winCup} alt='' />
                <h6>Tournaments | Leagues | Ladders</h6>
                <p>
                  Organize or Compete in any of our tournaments, leagues or
                  ladders and win prizes.
                </p>
              </div>
              <div className='tournament-button'>
                <Link
                  className='bt'
                  to='/auth/login'
                  onClick={(e) => notifClickHandler(e)}
                >
                  <button>Get Started</button>
                </Link>
              </div>
            </div>

            <div className='box-playanyone'>
              <div className='playanyone-content'>
                <img src={winTimer} alt='' />
                <h6>Play Anytime</h6>
                <p>Compete anywhere anytime in different modes of the games</p>
              </div>
              <div className='playanyone-button'>
                <Link
                  className='bt'
                  to='/auth/login'
                  onClick={(e) => notifClickHandler(e)}
                >
                  <button>Get Started</button>
                </Link>
              </div>
            </div>

            <div className='box-challenge'>
              <div className='challenge-content'>
                <img src={winFight} alt='' />
                <h6>Challenge</h6>
                <p>
                  Can challenge and compete with any player across the platform
                </p>
              </div>
              <div className='challenge-button'>
                <Link
                  className='bt'
                  to='/auth/login'
                  onClick={(e) => notifClickHandler(e)}
                >
                  <button>Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* // win ton earn section end  */}

        <div className={classes.ladderDiv}>
          <h3 style={{ marginTop: 20 }} className={classes.laddersh1}>
            Featured Ladders
          </h3>
          <Grid
            container
            columnSpacing={5}
            style={{ marginTop: 15, marginBottom: 30 }}
          >
            {/* <Grid>
              <Card tournament="T20" />
            </Grid> ; */}
            {laddersData &&
              laddersData.map((element, index) => {
                return (
                  <Grid key={index} item>
                    <LadderCard ladder={element} />
                  </Grid>
                );
              })}
          </Grid>
        </div>

        <div style={{ margin: 85, marginLeft: 0 }} className='join-section'>
          <img src={codIcon} alt='' style={{ height: 240 }} />
          <div className='join-box'>
            <div className='join-content'>
              <span>ESPORTS FANTASY</span> <span>LEAGUES</span> <br />{' '}
              <span>FOR</span> <span>GRAND PRIX</span>
            </div>
            <div className='join-button'>
              <Link
                className='bt'
                to='/auth/login'
                onClick={(e) => notifClickHandler(e)}
              >
                <button>Join</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.gamesDiv}>
          <Games />
        </div>
      </div>

      <footer>
        <div className='footer-distributed'>
          <div className='footer-left'>
            <span className='footer-link'>
              <a className='link-1' href='#'>
                Gaming <br />
                Plateform
              </a>
            </span>
            <p>Gaming Plateform &copy; 2022</p>
          </div>
          <div className='footer-right'>
            <NavLink to='/contact'>CONTACT US</NavLink>
            <NavLink to='/terms'>TERMS OF SERVICE</NavLink>
            <NavLink to='/privacy'>PRIVACY POLICY</NavLink>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
