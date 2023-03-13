import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import classes from './index.module.css';
// components

import { Tooltip, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

import MaskGp280 from '../../../assets/Mask Group 280.svg';
import signout from '../../../assets/Sign out.svg';
import profileIconImg from '../../../assets/teamprofile.png';
import Button from '@mui/material/Button';

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
import WinCard from './components/WinCard/WinCard';
import './stylesheet.css';
import Games from './components/games/games';
import backgroundHomeImage from '../../../assets/images/home-background-image.png';
import codIcon from '../../../assets/images/callOfDuty.png';

import winHash from '../../../assets/images/winHash.png';
import winCup from '../../../assets/images/winCup.png';
import winTimer from '../../../assets/images/winTimer.png';
import winFight from '../../../assets/images/winFight.png';

const DiscordChat = () => {
  const Header = ['Home', 'Games', 'Grand Prix', 'Rules'];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, headerText } = useSelector((state) => state.userHeader);

  const refreshHandler = () => {
    navigate('/user/profile');
  };
  const headerTextHandler = (val) => {
    localStorage.setItem('navText', val);
    dispatch(setNavText(val));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className='container'>
        <iframe src="https://discord.com/channels/1004457111788462152/1004457111788462155" style={{
          height: '80vh',
          width: ' 75vw'
        }} />
      </div>
    </>
  );
};

export default DiscordChat;
