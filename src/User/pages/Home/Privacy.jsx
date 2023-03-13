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

const Privacy = () => {
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
                    className='nav-link header-nav'
                    to={
                      localStorage.getItem('userToken') || i == 0
                        ? `/${lowerDashJoinStr(item)}`
                        : '/auth/login'
                    }
                    onClick={() => {
                      headerTextHandler(item);
                    }}
                  >
                    <span
                      className={`${
                        headerText === item ? 'userHeader-active' : ''
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
        <p
          style={{ color: '#fff', textAlign: 'justify' }}
          className='pt-5 pb-5'
        >
          <h2>gamingplateform ENTERTAINMENT, LLC Privacy Policy</h2>
          <p>Effective date:&nbsp; 12-10-2020</p>
          <p>
            gamingplateform ENTERTAINMENT, LLC (&quot;us&quot;,
            &quot;we&quot;, or &quot;our&quot;) operates the
            https://www.gamingplateform.com website (the
            &quot;Service&quot;).
          </p>
          <p>
            This page informs you of our policies regarding the collection, use,
            and disclosure of personal data when you use our Service and the
            choices you have associated with that data.
          </p>
          <p>
            We use your data to provide and improve the Service. By using the
            Service, you agree to the collection and use of information in
            accordance with this policy. Unless otherwise defined in this
            Privacy Policy, terms used in this Privacy Policy have the same
            meanings as in our Terms and Conditions, accessible from
            https://www.gamingplateform.com
          </p>
          <p>Definitions</p>
          <ul>
            <li>
              <p>Service</p>
            </li>
          </ul>
          <p>
            Service is the https://www. gamingplateform.com website operated
            by gamingplateform ENTERTAINMENT, LLC
          </p>
          <ul>
            <li>
              <p>Personal Data</p>
            </li>
          </ul>
          <p>
            Personal Data means data about a living individual who can be
            identified from those data (or from those and other information
            either in our possession or likely to come into our possession).
          </p>
          <ul>
            <li>
              <p>Usage Data</p>
            </li>
          </ul>
          <p>
            Usage Data is data collected automatically either generated by the
            use of the Service or from the Service infrastructure itself (for
            example, the duration of a page visit).
          </p>
          <ul>
            <li>
              <p>Cookies</p>
            </li>
          </ul>
          <p>
            Cookies are small pieces of data stored on your device (computer or
            mobile device).
          </p>
          <ul>
            <li>
              <p>Data Controller</p>
            </li>
          </ul>
          <p>
            Data Controller means the natural or legal person who (either alone
            or jointly or in common with other persons) determines the purposes
            for which and the manner in which any personal information are, or
            are to be, processed.
          </p>
          <p>
            For the purpose of this Privacy Policy, we are a Data Controller of
            your Personal Data.
          </p>
          <ul>
            <li>
              <p>Data Processors (or Service Providers)</p>
            </li>
          </ul>
          <p>
            Data Processor (or Service Provider) means any natural or legal
            person who processes the data on behalf of the Data Controller.
          </p>
          <p>
            We may use the services of various Service Providers in order to
            process your data more effectively.
          </p>
          <ul>
            <li>
              <p>Data Subject (or User)</p>
            </li>
          </ul>
          <p>
            Data Subject is any living individual who is using our Service and
            is the subject of Personal Data.
          </p>
          <p>Information Collection and Use</p>
          <p>
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>
          <p>Types of Data Collected</p>
          <p>Personal Data</p>
          <p>
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you (&quot;Personal Data&quot;). Personally identifiable
            information may include, but is not limited to:
          </p>
          <ul>
            <li>
              <p>Email address</p>
            </li>
            <li>
              <p>First name and last name</p>
            </li>
            <li>
              <p>Phone number</p>
            </li>
            <li>
              <p>Address, State, Province, ZIP/Postal code, City</p>
            </li>
            <li>
              <p>Cookies and Usage Data</p>
            </li>
          </ul>
          <p>
            We may use your Personal Data to contact you with newsletters,
            marketing or promotional materials and other information that may be
            of interest to you. You may opt out of receiving any, or all, of
            these communications from us by following the unsubscribe link or
            instructions provided in any email we send or by contacting us.
          </p>
          <p>Usage Data</p>
          <p>
            We may also collect information how the Service is accessed and used
            (&quot;Usage Data&quot;). This Usage Data may include information
            such as your computer&apos;s Internet Protocol address (e.g. IP
            address), browser type, browser version, the pages of our Service
            that you visit, the time and date of your visit, the time spent on
            those pages, unique device identifiers and other diagnostic data.
          </p>
          <p>Tracking &amp; Cookies Data</p>
          <p>
            We use cookies and similar tracking technologies to track the
            activity on our Service and hold certain information.
          </p>
          <p>
            Cookies are files with small amount of data which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            website and stored on your device. Tracking technologies also used
            are beacons, tags, and scripts to collect and track information and
            to improve and analyze our Service.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our Service.
          </p>
          <p>Examples of Cookies we use:</p>
          <ul>
            <li>
              <p>
                Session Cookies. We use Session Cookies to operate our Service.
              </p>
            </li>
            <li>
              <p>
                Preference Cookies. We use Preference Cookies to remember your
                preferences and various settings.
              </p>
            </li>
            <li>
              <p>
                Security Cookies. We use Security Cookies for security purposes.
              </p>
            </li>
          </ul>
          <p>Use of Data</p>
          <p>
            gamingplateform ENTERTAINMENT, LLC uses the collected data for
            various purposes:
          </p>
          <ul>
            <li>
              <p>To provide and maintain our Service</p>
            </li>
            <li>
              <p>To notify you about changes to our Service</p>
            </li>
            <li>
              <p>
                To allow you to participate in interactive features of our
                Service when you choose to do so
              </p>
            </li>
            <li>
              <p>To provide customer support</p>
            </li>
            <li>
              <p>
                To gather analysis or valuable information so that we can
                improve our Service
              </p>
            </li>
            <li>
              <p>To monitor the usage of our Service</p>
            </li>
            <li>
              <p>To detect, prevent and address technical issues</p>
            </li>
            <li>
              <p>
                To provide you with news, special offers and general information
                about other goods, services and events which we offer that are
                similar to those that you have already purchased or enquired
                about unless you have opted not to receive such information
              </p>
            </li>
          </ul>
          <p>
            Legal Basis for Processing Personal Data Under General Data
            Protection Regulation (GDPR)
          </p>
          <p>
            If you are from the European Economic Area (EEA), gamingplateform
            ENTERTAINMENT, LLC legal basis for collecting and using the personal
            information described in this Privacy Policy depends on the Personal
            Data we collect and the specific context in which we collect it.
          </p>
          <p>
            gamingplateform ENTERTAINMENT, LLC may process your Personal Data
            because:
          </p>
          <ul>
            <li>
              <p>We need to perform a contract with you</p>
            </li>
            <li>
              <p>You have given us permission to do so</p>
            </li>
            <li>
              <p>
                The processing is in our legitimate interests and it&apos;s not
                overridden by your rights
              </p>
            </li>
            <li>
              <p>For payment processing purposes</p>
            </li>
            <li>
              <p>To comply with the law</p>
            </li>
          </ul>
          <p>Retention of Data</p>
          <p>
            gamingplateform ENTERTAINMENT, LLC will retain your Personal Data
            only for as long as is necessary for the purposes set out in this
            Privacy Policy. We will retain and use your Personal Data to the
            extent necessary to comply with our legal obligations (for example,
            if we are required to retain your data to comply with applicable
            laws), resolve disputes, and enforce our legal agreements and
            policies.
          </p>
          <p>
            gamingplateform ENTERTAINMENT, LLC will also retain Usage Data
            for internal analysis purposes. Usage Data is generally retained for
            a shorter period of time, except when this data is used to
            strengthen the security or to improve the functionality of our
            Service, or we are legally obligated to retain this data for longer
            time periods.
          </p>
          <p>Transfer of Data</p>
          <p>
            Your information, including Personal Data, may be transferred to
            &mdash; and maintained on &mdash; computers located outside of your
            state, province, country or other governmental jurisdiction where
            the data protection laws may differ than those from your
            jurisdiction.
          </p>
          <p>
            If you are located outside United States and choose to provide
            information to us, please note that we transfer the data, including
            Personal Data, to United States and process it there.
          </p>
          <p>
            Your consent to this Privacy Policy followed by your submission of
            such information represents your agreement to that transfer.
          </p>
          <p>
            gamingplateform ENTERTAINMENT, LLC will take all steps reasonably
            necessary to ensure that your data is treated securely and in
            accordance with this Privacy Policy and no transfer of your Personal
            Data will take place to an organization or a country unless there
            are adequate controls in place including the security of your data
            and other personal information.
          </p>
          <p>Disclosure of Data</p>
          <p>Business Transaction</p>
          <p>
            If gamingplateform ENTERTAINMENT, LLC is involved in a merger,
            acquisition or asset sale, your Personal Data may be transferred. We
            will provide notice before your Personal Data is transferred and
            becomes subject to a different Privacy Policy.
          </p>
          <p>Disclosure for Law Enforcement</p>
          <p>
            Under certain circumstances, gamingplateform ENTERTAINMENT, LLC
            may be required to disclose your Personal Data if required to do so
            by law or in response to valid requests by public authorities (e.g.
            a court or a government agency).
          </p>
          <p>Legal Requirements</p>
          <p>
            gamingplateform ENTERTAINMENT, LLC may disclose your Personal
            Data in the good faith belief that such action is necessary to:
          </p>
          <ul>
            <li>
              <p>To comply with a legal obligation</p>
            </li>
            <li>
              <p>
                To protect and defend the rights or property of
                gamingplateform ENTERTAINMENT, LLC
              </p>
            </li>
            <li>
              <p>
                To prevent or investigate possible wrongdoing in connection with
                the Service
              </p>
            </li>
            <li>
              <p>
                To protect the personal safety of users of the Service or the
                public
              </p>
            </li>
            <li>
              <p>To protect against legal liability</p>
            </li>
          </ul>
          <p>Security of Data</p>
          <p>
            The security of your data is important to us, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Data, we cannot guarantee
            its absolute security.
          </p>
          <p>&quot;Do Not Track&quot; Signals</p>
          <p>
            We do not support Do Not Track (&quot;DNT&quot;). Do Not Track is a
            preference you can set in your web browser to inform websites that
            you do not want to be tracked.
          </p>
          <p>
            You can enable or disable Do Not Track by visiting the Preferences
            or Settings page of your web browser.
          </p>
          <p>
            Your Data Protection Rights Under General Data Protection Regulation
            (GDPR)
          </p>
          <p>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights. gamingplateform ENTERTAINMENT,
            LLC aims to take reasonable steps to allow you to correct, amend,
            delete, or limit the use of your Personal Data.
          </p>
          <p>
            If you wish to be informed what Personal Data we hold about you and
            if you want it to be removed from our systems, please contact us.
          </p>
          <p>
            In certain circumstances, you have the following data protection
            rights:
          </p>
          <ul>
            <li>
              <p>
                The right to access, update or to delete the information we have
                on you. Whenever made possible, you can access, update or
                request deletion of your Personal Data directly within your
                account settings section. If you are unable to perform these
                actions yourself, please contact us to assist you.
              </p>
            </li>
            <li>
              <p>
                The right of rectification. You have the right to have your
                information rectified if that information is inaccurate or
                incomplete.
              </p>
            </li>
            <li>
              <p>
                The right to object. You have the right to object to our
                processing of your Personal Data.
              </p>
            </li>
            <li>
              <p>
                The right of restriction. You have the right to request that we
                restrict the processing of your personal information.
              </p>
            </li>
            <li>
              <p>
                The right to data portability. You have the right to be provided
                with a copy of the information we have on you in a structured,
                machine-readable and commonly used format.
              </p>
            </li>
            <li>
              <p>
                The right to withdraw consent. You also have the right to
                withdraw your consent at any time where gamingplateform
                ENTERTAINMENT, LLC relied on your consent to process your
                personal information.
              </p>
            </li>
          </ul>
          <p>
            Please note that we may ask you to verify your identity before
            responding to such requests.
          </p>
          <p>
            You have the right to complain to a Data Protection Authority about
            our collection and use of your Personal Data. For more information,
            please contact your local data protection authority in the European
            Economic Area (EEA).
          </p>
          <p>Service Providers</p>
          <p>
            We may employ third party companies and individuals to facilitate
            our Service (&quot;Service Providers&quot;), to provide the Service
            on our behalf, to perform Service-related services or to assist us
            in analyzing how our Service is used.
          </p>
          <p>
            These third parties have access to your Personal Data only to
            perform these tasks on our behalf and are obligated not to disclose
            or use it for any other purpose.
          </p>
          <p>Analytics</p>
          <p>
            We may use third-party Service Providers to monitor and analyze the
            use of our Service.
          </p>
          <ul>
            <li>
              <p>Google Analytics</p>
            </li>
          </ul>
          <p>
            Google Analytics is a web analytics service offered by Google that
            tracks and reports website traffic. Google uses the data collected
            to track and monitor the use of our Service. This data is shared
            with other Google services. Google may use the collected data to
            contextualize and personalize the ads of its own advertising
            network.
          </p>
          <p>
            You can opt-out of having made your activity on the Service
            available to Google Analytics by installing the Google Analytics
            opt-out browser add-on. The add-on prevents the Google Analytics
            JavaScript (ga.js, analytics.js, and dc.js) from sharing information
            with Google Analytics about visits activity.
          </p>
          <p>
            For more information on the privacy practices of Google, please
            visit the Google Privacy &amp; Terms web page:
            https://policies.google.com/privacy?hl=en
          </p>
          <p>Behavioral Remarketing</p>
          <p>
            gamingplateform ENTERTAINMENT, LLC uses remarketing services to
            advertise on third party websites to you after you visited our
            Service. We and our third-party vendors use cookies to inform,
            optimize and serve ads based on your past visits to our Service.
          </p>
          <ul>
            <li>
              <p>Google AdWords</p>
            </li>
          </ul>
          <p>Google AdWords remarketing service is provided by Google Inc.</p>
          <p>
            You can opt-out of Google Analytics for Display Advertising and
            customize the Google Display Network ads by visiting the Google Ads
            Settings page: http://www.google.com/settings/ads
          </p>
          <p>
            Google also recommends installing the Google Analytics Opt-out
            Browser Add-on - https://tools.google.com/dlpage/gaoptout - for your
            web browser. Google Analytics Opt-out Browser Add-on provides
            visitors with the ability to prevent their data from being collected
            and used by Google Analytics.
          </p>
          <p>
            For more information on the privacy practices of Google, please
            visit the Google Privacy &amp; Terms web page:
            https://policies.google.com/privacy?hl=en
          </p>
          <ul>
            <li>
              <p>Facebook</p>
            </li>
          </ul>
          <p>Facebook remarketing service is provided by Facebook Inc.</p>
          <p>
            You can learn more about interest-based advertising from Facebook by
            visiting this page: https://www.facebook.com/help/164968693837950
          </p>
          <p>
            To opt-out from Facebook&apos;s interest-based ads follow these
            instructions from Facebook:
            https://www.facebook.com/help/568137493302217
          </p>
          <p>
            Facebook adheres to the Self-Regulatory Principles for Online
            Behavioral Advertising established by the Digital Advertising
            Alliance. You can also opt-out from Facebook and other participating
            companies through the Digital Advertising Alliance in the USA
            http://www.aboutads.info/choices/, the Digital Advertising Alliance
            of Canada in Canada http://youradchoices.ca/ or the European
            Interactive Digital Advertising Alliance in Europe
            http://www.youronlinechoices.eu/, or opt-out using your mobile
            device settings.
          </p>
          <p>
            For more information on the privacy practices of Facebook, please
            visit Facebook&apos;s Data Policy:
            https://www.facebook.com/privacy/explanation
          </p>
          <p>Payments</p>
          <p>
            We may provide paid products and/or services within the Service. In
            that case, we use third-party services for payment processing (e.g.
            payment processors).
          </p>
          <p>
            We will not store or collect your payment card details. That
            information is provided directly to our third-party payment
            processors whose use of your personal information is governed by
            their Privacy Policy. These payment processors adhere to the
            standards set by PCI-DSS as managed by the PCI Security Standards
            Council, which is a joint effort of brands like Visa, Mastercard,
            American Express and Discover. PCI-DSS requirements help ensure the
            secure handling of payment information.
          </p>
          <p>The payment processors we work with are:</p>
          <ul>
            <li>
              <p>PayPal or Payment cloud services</p>
            </li>
          </ul>
          <p>
            Their Privacy Policy can be viewed at
            https://www.paypal.com/webapps/mpp/ua/privacy-full
          </p>
          <p>Links to Other Sites</p>
          <p>
            Our Service may contain links to other sites that are not operated
            by us. If you click on a third party link, you will be directed to
            that third party&apos;s site. We strongly advise you to review the
            Privacy Policy of every site you visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </p>
          <p>Children&apos;s Privacy</p>
          <p>
            Our Service does not address anyone under the age of 18
            (&quot;Children&quot;).
          </p>
          <p>
            We do not knowingly collect personally identifiable information from
            anyone under the age of 18. If you are a parent or guardian and you
            are aware that your child has provided us with Personal Data, please
            contact us. If we become aware that we have collected Personal Data
            from children without verification of parental consent, we take
            steps to remove that information from our servers.
          </p>
          <p>Changes to This Privacy Policy</p>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            We will let you know via email and/or a prominent notice on our
            Service, prior to the change becoming effective and update the
            &quot;effective date&quot; at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
          <p>Contact Us</p>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p>By email: contact@gamingplateform.com</p>
          <p>
            <br />
          </p>
          <p>
            <br />
          </p>{' '}
        </p>
        {/* // win ton earn section end  */}
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

export default Privacy;
