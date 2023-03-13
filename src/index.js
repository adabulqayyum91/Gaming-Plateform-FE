import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { StyledEngineProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@mui/material';
import { TourProvider } from '@reactour/tour';

import Root from './root';
import Auth from './User/pages/Auth/index';
import store from './library/redux-saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-photo-view/dist/react-photo-view.css';
import './index.css';
import Home from './User/pages/Home';
import Terms from './User/pages/Home/Terms';
import Privacy from './User/pages/Home/Privacy';
import Contact from './User/pages/Home/Contact';

import { components } from '@reactour/tour';
import { Popover } from '@reactour/popover';
import Rules from './User/pages/Rules';
import WidgetBot from '@widgetbot/react-embed'
import DiscordChat from './User/pages/Home/DiscordChat';

function Badge({ children }) {
  return (
    <components.Badge
      styles={{
        badge: (base) => ({
          ...base,
          backgroundColor: 'black',
          color: '#f26826',
        }),
      }}
    >
      {children}
    </components.Badge>
  );
}

const mytheme = createTheme({
  palette: {
    primary: {
      main: '#1A1A1A', //theme
      light: '#282828', //lightdark
      dark: '#000000', //dark
      contrastText: '#373737', //middle dark
    },
    secondary: {
      main: '#707070',
      light: '#FFFFFF',
      dark: '#C7C7C7',
      contrastText: '#E3E3E3',
    },
    info: {
      main: '#DF4646', //red
      light: '#F26826', //orange
      dark: '#D5D5D5', //gray
    },
    background: {
      default: '#1A1A1A',
    },
    action: {
      hover: 'none',
    },
  },
  shape: {
    borderRadius: '4px',
  },
});

const steps = [
  {
    selector: '.first-step',
    content:
      'You can watch your match status and previoulsy played match ratings',
  },
  {
    selector: '.second-step',
    content:
      'You can create private and public match with selected date and time',
  },
  {
    selector: '.third-step',
    content:
      'You can create your new team and you can watch already added teams',
  },
  {
    selector: '.fourth-step',
    content:
      'You can create Fantasy League with teams on selected date and time',
  },
  {
    selector: '.fifth-step',
    content: 'You can watch your tournaments, games, matches and ladders',
  },
  {
    selector: '.sixth-step',
    content:
      'You can watch already created Grand Prix league with selected teams and players',
  },
  {
    selector: '.seventh-step',
    content: 'In Chat Section, you can talk with your friends',
  },
  {
    selector: '.eighth-step',
    content: 'Here you can search players, users and games',
    className: 'red',
  },
  {
    selector: '.Ninth-step',
    content: 'You can withdraw all of your payment',
  },
];

ReactDOM.render(
  <Provider store={store}>

    <TourProvider
      steps={steps}
      styles={{
        badge: (base) => ({ ...base, background: '#ef5a3d' }),
        dot: (base, { current }) => ({
          ...base,
          background: current ? '#ef5a3d' : '#ccc',
        }),
        popover: (base) => ({
          ...base,
          background: '#red',
          borderRadius: 10,
        }),
      }}
    >
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={mytheme}>
          <BrowserRouter>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/auth/login' element={<Auth />} />
              <Route path='/auth/reset/:id' element={<Auth />} />
              <Route path='/auth/login' element={<Auth />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/privacy' element={<Privacy />} />

              {/* <Route path='/user/rules' element={<Rules />} /> */}
              {/* if no route exsts */}
              <Route path='*' element={<Root />} />
            </Routes>
          </BrowserRouter>
          <CssBaseline />
        </MuiThemeProvider>
      </StyledEngineProvider>
      <NotificationContainer />
    </TourProvider>
  </Provider>,
  document.getElementById('root')
);
