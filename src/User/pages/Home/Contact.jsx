import React, { useState, useEffect } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';

import { setNavText } from './reducers';
import { lowerDashJoinStr } from '../../../utils/apiutils';
const BASE_URL = process.env.REACT_APP_BASE_URL + '/';
import './stylesheet.css';

import codIcon from '../../../assets/images/callOfDuty.png';

import axios from 'axios';
import './stylesheet.css';

// Mui

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

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

  const submitContactDetails = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}api/auth/contactUs`, {
        subject: fullName,
        senderEmail: email,
        msgBody: message,
      })
      .then((res) => {
        console.log(res);
        NotificationManager.success('Request sent successfully');
        setFullName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('Request declined');
      });
  };

  return (
    <>
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
              <NavLink to='/home' className='nav-link header-nav'>
                Home
              </NavLink>

              <NavLink to='/auth/login' className='nav-link header-nav'>
                Games
              </NavLink>

              <NavLink to='/auth/login' className='nav-link header-nav'>
                Grand Prix
              </NavLink>

              <NavLink to='/auth/login' className='nav-link header-nav'>
                Rules
              </NavLink>

              <li>
                <Button
                  style={{
                    color: '#ea8744',
                    border: '1px solid',
                    marginLeft: '15px',
                  }}
                  variant='outlined'
                  onClick={() => navigate('/auth/login')}
                >
                  Login
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='container'>
        <div style={{ margin: 85 }} className='join-section'>
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
      </div>

      <form>
        <Box
          sx={{
            maxWidth: 692,
            maxHeight: 490,
            backgroundColor: '#000000',
            marginTop: '200px',
            marginLeft: '300px',
            marginBottom: '120px',
          }}
        >
          <Card sx={{ backgroundColor: '#000000' }}>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              className='header-text'
              style={{ font: 'normal normal bold 24px/20px Bebas Neue' }}
            >
              LEAVE US A MESSAGE
            </Typography>
            <CardActionArea className='card-action-area'>
              <TextField
                id='name-input'
                label='Full Name'
                type='name'
                variant='standard'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                id='email-input'
                label='Email'
                type='email'
                variant='standard'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardActionArea>
            <TextField
              id='message-input'
              label='Message'
              type='message'
              variant='standard'
              className='message-field'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Box className='send-btn'>
              <button
                className='send-button'
                disabled={(!email, !fullName, !message)}
                onClick={submitContactDetails}
              >
                Send
              </button>
            </Box>
          </Card>
        </Box>
      </form>

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

export default Contact;
