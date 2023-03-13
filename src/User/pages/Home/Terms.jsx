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

const Terms = () => {
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
          <h2>TERMS OF USE</h2>
          <ol>
            <li>
              <p>THIS IS AN AGREEMENT BETWEEN YOU AND gamingplateform.COM</p>
            </li>
          </ol>
          <p>
            This agreement (the "Agreement" and the "Terms") is a contract
            between You ("User," Users," "You" and "Your") and
            gamingplateform.com ("gamingplateform", the "Company", "Us",
            "We" and "Our) and governs Your use of the gamingplateform.com
            website located at http://www. gamingplateform.com, its content,
            the software and the associated materials made available through
            this website (collectively, the "Site").
          </p>
          <ol start='2'>
            <li>
              <p>AGREEMENT</p>
            </li>
          </ol>
          <p>
            Your establishment of a Sample Skill Challenge Account under Section 7,
            including any User name or other information (&quot;Your Skill
            Challenge Account&quot; or &quot;Your Account&quot;); any subsequent
            log-in to Your Skill Challenge Account (&quot;Log-in&quot;); or any
            access, entry or participation in any skill challenge, contest,
            tournament, promotion, event or the like (collectively, &quot;Skill
            Challenge&quot; or &quot;Skill Challenges&quot;) facilitated by or
            associated with the Site in any way signifies Your constructive and
            actual notice and knowledge of and Your agreement to be bound by the
            most current version of the Terms as posted on the Site. If you do
            not wish to be bound by this Agreement, do not establish a Sample Skill
            Challenge Account, and do not use the Site or Services or
            participate in any Skill Challenges. If you have already established
            a Sample Skill Challenge Account and you do not wish to continue to be
            bound by this Agreement, you should terminate Your Sample Skill
            Challenge Account in accordance with Section 18 of this Agreement.
          </p>
          <p>
            From time to time, gamingplateform.com may define and post on the
            Site additional gamingplateform.com Skill Challenge specific
            terms, codes of conduct or guidelines that govern such specified
            Skill Challenge. In the event of a discrepancy between these Terms
            and any other writing posted on the Site by gamingplateform.com,
            including the GENERAL Rules and the Privacy Policy, these Terms
            shall control. In no way shall this provision be construed to
            incorporate, acknowledge or make any recommendation regarding
            third-party Terms and Conditions, for example, terms and conditions
            that may govern Your use of any third-party equipment, games or
            content. It is solely Your responsibility to ensure that Your use of
            any and all third-party equipment, games or content is in compliance
            with any and all third-party requirements.
          </p>
          <p>
            You understand and accept that gamingplateform.com is unable to
            provide you with any legal advice or assurances and that it is your
            sole responsibility to ensure that at all times you comply with all
            laws that govern you, civil and criminal.&nbsp;
          </p>
          <ol start='3'>
            <li>
              <p>LEGAL COMPLIANCE</p>
            </li>
          </ol>
          <p>
            You are subject to, and are solely responsible for obeying all laws
            of the state, province and/or country in which You reside and from
            which You access the Site, Log-In to the Site or participate in any
            Skill Challenge. You agree to only participate in the Skill
            Challenges only after You have determined in good-faith that You are
            in compliance with state, local and other governing laws and
            regulations.&nbsp;
          </p>
          <p>
            Participation within the United States of America (U.S.)
            <br />
            Participation in fee-based tournaments for prizes is prohibited in
            the following U.S. states, without limitation: Arizona, Iowa,
            Louisiana, Mississippi, Montana, Nevada, and South Dakota. The
            foregoing list shall not be construed to imply or suggest that Your
            participation in Skill Challenges from an unlisted state is legal
            under any applicable laws or regulations. VOID WHERE PROHIBITED OR
            RESTRICTED BY LAW.&nbsp;
          </p>
          <p>
            Participation outside the U.S.
            <br />
            Participation in fee-based tournaments for prizes may be prohibited
            in Your jurisdiction and it is Your sole responsibility to ensure
            compliance with such laws. VOID WHERE PROHIBITED OR RESTRICTED BY
            LAW.
          </p>
          <p>
            You agree to hold Us harmless from any liability such that We cannot
            be held liable if laws applicable to You restrict or prohibit Your
            participation in any Skill Challenge or contests arranged and
            established through the Site or otherwise. We make no
            representations or warranties, implicit or explicit, as to Your
            legal right to participate in any Skill Challenge facilitated nor
            shall any person affiliated, or claiming affiliation with Us, have
            authority to make such representations or warranties.&nbsp;
          </p>
          <ol start='4'>
            <li>
              <p>
                SITE SERVICES (the &quot;Service&quot; or &quot;Services&quot;)
              </p>
            </li>
          </ol>
          <p>
            gamingplateform.com offers the Site as a common portal for Users
            to arrange, record and track Skill Challenges, as defined below, and
            related information, including but not limited to, Skill Challenge
            Entrants, fees, pre-designated prizes and Skill Challenge
            results.&nbsp;
          </p>
          <p>
            gamingplateform.com does not provide the Site or Services for
            Skill Challenges based on sporting or gambling events, including any
            games of chance. Instead, gamingplateform.com provides a forum
            for You to arrange, conduct and track head-to-head tournaments
            against other Users solely in connection with games of skill.&nbsp;
          </p>
          <ol>
            <li>
              <p>Posted Skill Challenges</p>
            </li>
          </ol>
          <p>
            &quot;Posted Skill Challenges&quot; are facilitated through and
            posted on the gamingplateform.com website by either
            gamingplateform.com or any User who creates and maintains a Skill
            Challenge Account under Section 7. Posted Skill challenges provide a
            forum for Users to participate in a Skill Challenge for a
            pre-designated &quot;Prize&quot; with other Users by paying a
            &quot;Skill Challenge Entry Fee&quot; and a &quot;
            gamingplateform.com Service Fee&quot; (or collectively,
            &quot;Skill Challenge Tournament Fee&quot;) to
            gamingplateform.com.&nbsp;
          </p>
          <p>
            The Prize will be the sum of all Skill Challenge Entry Fees paid
            under this Section and Section 4.A., by each &quot;Skill Challenge
            Entrant.&quot;&apos;&nbsp;
          </p>
          <ol>
            <li>
              <p>
                &quot; gamingplateform.com Posted Skill Challenges&quot; are
                Posted Skill Challenges posted on the gamingplateform.com
                website by gamingplateform.com.
              </p>
            </li>
            <li>
              <p>
                &quot;User Posted Skill Challenges&quot; are Posted Skill
                Challenges posted on the gamingplateform.com website by any
                User who creates and maintains a Skill Challenge Account under
                Section 7. Any User who creates and maintains a Skill Challenge
                Account under Section 7 may invite another User or Users to
                participate in a Skill Challenge for a pre-designated Prize by
                paying a Skill Challenge Entry Fee and a gamingplateform.com
                Service Fee (or collectively, Skill Challenge Tournament Fee) to
                gamingplateform. Prior to posting any such invitation to a
                Skill Challenge for a Prize, You must have sufficient funds in
                Your Skill Challenge Account to cover the Skill Challenge
                Tournament Fee. Without exception, creating a User Posted Skill
                Challenge shall automatically enter the User who created that
                Posted Skill Challenge into that Posted Skill Challenge.
              </p>
            </li>
            <li>
              <p>
                Accepting A Posted Skill Challenge (&quot;Accepted Skill
                Challenge&quot;)
              </p>
            </li>
          </ol>
          <p>
            Any User who creates and maintains a Skill Challenge Account under
            Section 7 may enter a Posted Skill Challenge by paying the Skill
            Challenge Tournament Fee to gamingplateform.com. Prior to
            entering the foregoing Skill Challenge, You must have sufficient
            funds in Your Skill Challenge Account to cover the Skill Challenge
            Tournament Fee. Upon entry of a Posted Skill Challenge,
            gamingplateform.com will immediately withdraw the Skill Challenge
            Tournament Fee from Your Skill Challenge Account.&nbsp;
          </p>
          <p>
            The first User to enter a gamingplateform.com Posted Skill
            Challenge, or the User who creates a User Posted Skill Challenge,
            will define a &quot;Skill Challenge Timeframe,&quot; which shall
            define when a Posted Skill Challenge shall be completed by the Skill
            Challenge Entrants.&nbsp;
          </p>
          <p>
            When only one User has entered a Posted Skill Challenge the Skill
            Challenge can be cancelled at any time and, notwithstanding any
            provision herein to the contrary, the Skill Challenge Tournament Fee
            will be credited to the Account from which it was originally
            drawn.&nbsp;
          </p>
          <p>
            Once two or more Users enter a Posted Skill Challenge, the Skill
            Challenge immediately converts to an &quot;Accepted Skill
            Challenge,&quot; and gamingplateform.com will immediately
            withdraw the Skill Challenge Tournament Fee from all Accounts of all
            Skill Challenge Entrants. The Prize will be the sum of all Skill
            Challenge Entry Fees paid under Sections 4.A. and 4.B., by each
            &quot;Skill Challenge Entrant.&quot; Once a Posted Skill Challenge
            becomes an Accepted Skill Challenge, the gamingplateform.com
            Service Fee will not be refunded at any time or for any reason to
            any Skill Challenge Entrants; however, upon mutual agreement
            indicated by all Skill Challenge Entrants to cancel the Accepted
            Skill Challenge pursuant to section 4.H., all Skill Challenge Entry
            Fees collected for the Canceled Accepted Skill Challenge will be
            credited to the Skill Challenge Accounts from which they were
            originally drawn.&nbsp;
          </p>
          <ol start='2'>
            <li>
              <p>Rules Governing Each Accepted Skill Challenge</p>
            </li>
          </ol>
          <p>
            All Skill Challenges are governed by the &quot;GENERAL Rules&quot;.
            It is Your responsibility to ensure that for every Skill Challenge
            You participate in, You understand and will abide by the Skill
            Challenge Rules at all times, and that you review the Skill
            Challenge Rules from time to time for updates. Your failure to
            follow the most current Skill Challenge Rules will result in an
            immediate and automatic forfeiture of any Posted or Accepted Skill
            Challenge. Further, if gamingplateform.com learns of any
            User&apos;s failure to follow the Skill Challenge Rules,
            gamingplateform.com reserves the right to terminate that
            User&apos;s Skill Challenge Account pursuant to Section 18 of this
            Agreement.
          </p>
          <ol start='3'>
            <li>
              <p>Play Of The Accepted Skill Challenge</p>
            </li>
          </ol>
          <p>
            An Accepted Skill Challenge shall be completed by the Skill
            Challenge Entrants in accordance with the Skill Challenge Rules at a
            mutually agreed upon time within the Skill Challenge
            Timeframe.&nbsp;
          </p>
          <p>
            Failure to meet this timeframe will automatically result in a
            cancellation of the Accepted Skill Challenge, as provided in Section
            4.H. of this Agreement, and all Skill Challenge Entry Fees collected
            for the Canceled Accepted Skill Challenge will be credited to the
            Skill Challenge Accounts from which they were originally drawn. No
            gamingplateform.com Service Fees are refunded at any time or for
            any reason after an Accepted Skill Challenge is established.
          </p>
          <ol start='4'>
            <li>
              <p>
                skill challenge results (&quot;Skill Challenge Results&quot;)
              </p>
            </li>
          </ol>
          <p>
            All Skill Challenge Results must be determined in strict accordance
            with the GENERAL Rules.&nbsp;
          </p>
          <p>
            All Skill Challenge Results must be reported within two (2) hours
            following the expiration of the Skill Challenge Timeframe. Failure
            to meet this timeframe will automatically result in a cancellation
            of the Accepted Skill Challenge, as provided in Section 4.H. of this
            Agreement, and all Skill Challenge Entry Fees collected for the
            Canceled Accepted Challenge will be credited to the Skill Challenge
            Accounts from which they were originally drawn. No
            gamingplateform.com Service Fees are refunded at any time or for
            any reason after an Accepted Skill Challenge is established.
          </p>
          <p>
            Subject to this Agreement, if each Skill Challenge Entrant reports
            the same Skill Challenge Result, the result will be considered a
            &quot;Verified Result&quot; and the winner a &quot;Verified
            Winner.&quot; If there is a discrepancy or conflict between any
            reports of the Skill Challenge Results, the Skill Challenge Results
            are otherwise contested, or if no Skill Challenge Entrants or only
            one Skill Challenge Entrant reports a result, the result will be
            considered a &quot;Disputed Result.&quot; gamingplateform.com
            will attempt to convert each Disputed Result to a Verified Result
            using the Disputed Result Guidelines provided in Section 4.F.
            Disputed Results will be tracked, monitored and publicly displayed
            as provided in Section 4.G.
          </p>
          <p>
            All Skill Challenge Results may be audited or verified by
            gamingplateform.com, which may occur within
            gamingplateform.com&apos;s sole discretion for any reason
            whatsoever.
          </p>
          <ol start='5'>
            <li>
              <p>Disputed Results</p>
            </li>
          </ol>
          <p>
            A Disputed Result occurs when no Skill Challenge Entrants or only
            one Skill Challenge Entrant reports a result; or when there is a
            discrepancy or conflict between reports of any Skill Challenge
            Results from any of the Skill Challenge Entrants in the same Skill
            Challenge.&nbsp;
          </p>
          <ol>
            <li>
              <p>No User Reports a Result</p>
            </li>
          </ol>
          <p>
            Upon the conclusion of two (2) hours following the expiration of the
            Skill Challenge Timeframe, if no Skill Challenge Entrants have
            reported Skill Challenge Results, no Verified Winner will be
            determined, the Accepted Skill Challenge will be cancelled
            automatically as provided in Section 4.H. of this Agreement, and all
            Skill Challenge Entry Fees collected for the Canceled Accepted
            Challenge will be credited to the Skill Challenge Accounts from
            which they were originally drawn. No gamingplateform.com Service
            Fees are refunded at any time or for any reason after an Accepted
            Skill Challenge is established.
          </p>
          <ol>
            <li>
              <p>One User Reports a Result</p>
            </li>
          </ol>
          <p>
            Upon the conclusion of two (2) hours following the expiration of the
            Skill Challenge Timeframe, if only one Skill Challenge Entrant has
            reported the Skill Challenge Result, the Verified Winner will be
            determined in accordance with the single report and the Prize will
            be awarded accordingly.
          </p>
          <ol start='2'>
            <li>
              <p>Users Report Conflicting Results</p>
            </li>
          </ol>
          <p>
            If there is a discrepancy between any of the Skill Challenge Results
            reported between two or more Skill Challenge Entrants,
            gamingplateform.com will use commercially reasonable efforts to
            determine the Verified Winner and award the Prize accordingly.
            gamingplateform.com uses a proprietary process to determine the
            Verified Winner and Our judgment as to the Verified Winner will be
            considered the final judgment, therefore, gamingplateform.com
            shall not be required to disclose how the Verified Winner is
            determined. gamingplateform.com reserves the right to suspend,
            terminate or otherwise cancel the Skill Challenge Account of the
            Skill Challenge Entrant who submitted a report contrary to the
            Verified Winner as determined by gamingplateform.com. Your only
            recourse is to terminate Your Skill Challenge Account and cease
            using the Services. Any time conflicting results are reported under
            this Section, gamingplateform.com, in its sole discretion, may
            attribute such conflicting results to Your Skill Challenge Account
            and publicly display the same in Your Skill Challenge History and
            Your Skill Challenge Account pursuant to Section 4.G.&nbsp;
          </p>
          <p>
            In certain instances, gamingplateform.com may not be able to
            determine a Verified Winner, at which time the Accepted Skill
            Challenge will automatically be deemed a Canceled Accepted Skill
            Challenge, as provided in Section 4.H. of this Agreement, and all
            Skill Challenge Entry Fees collected for the canceled Accepted Skill
            Challenge will be credited to the Skill Challenge Accounts from
            which they were originally drawn. No gamingplateform.com Service
            Fees are refunded at any time or for any reason after an Accepted
            Skill Challenge is established.&nbsp;
          </p>
          <ol>
            <li>
              <p>Tracking And Public Display Of Disputed Results</p>
            </li>
          </ol>
          <p>
            gamingplateform.com will record and publicly display all disputed
            results incurred by You and associated with Your Skill Challenge
            Account. By displaying such Disputed Results, other Users can
            determine Your Skill Challenge worthiness and credibility. If You
            accumulate over three (3) Disputed Results in any thirty (30) day
            period, gamingplateform.com may suspend or terminate Your Skill
            Challenge Account at its sole discretion. Upon incurring any
            Disputed Result, You will have twenty-four (24) hours to comment or
            otherwise offer reasons for accumulating a Disputed Result which
            will be publicly provided to all Users of gamingplateform.com. In
            this regard, it is Your responsibility to leave prompt feedback
            pursuant to Sections 10 and 11 hereunder for any perceived foul play
            by any Challenge Entrants You have previously Challenged.
          </p>
          <ol start='2'>
            <li>
              <p>
                Cancellation Of Accepted Skill Challenges (&quot;Canceled
                Accepted Skill Challenge&quot;)
              </p>
            </li>
          </ol>
          <p>
            An Accepted Skill Challenge shall be deemed a Canceled Accepted
            Skill Challenge in the following Situations:&nbsp;
          </p>
          <ol>
            <li>
              <p>
                Accepted Skill Challenges may be canceled upon the mutual
                request and agreement of ALL Skill Challenge Entrants;
              </p>
            </li>
            <li>
              <p>
                When no Skill Challenge Results are reported to
                gamingplateform.com within two (2) hours following the
                expiration of the Skill Challenge Timeframe; and/or
              </p>
            </li>
            <li>
              <p>
                When multiple Skill Challenge Entrants Report conflicting
                results and gamingplateform.com can not determine a Verified
                Winner, pursuant to Section 4.F of this Agreement.
              </p>
            </li>
          </ol>
          <p>
            All Skill Challenge Entry Fees collected for any Canceled Accepted
            Skill Challenge shall be credited to the Skill Challenge Accounts
            from which they were originally drawn. No gamingplateform.com
            Service Fees are refunded at any time or for any reason after an
            Accepted Skill Challenge is established.
          </p>
          <ol start='3'>
            <li>
              <p>
                Deposit Of Prize Into Skill Challenge Account Of The Verified
                Winner.
              </p>
            </li>
          </ol>
          <p>
            Subject to Section 7, Section 8, Section 9 and Section 21, the Prize
            will be credited by the Company to the Account of the Verified
            Winner within a commercially reasonable time.&nbsp;
          </p>
          <ol start='2'>
            <li>
              <p>ELIGIBILITY FOR SERVICES AND YOUR RESPONSIBILITIES</p>
            </li>
          </ol>
          <p>
            To create a Skill Challenge Account, Log-In and/or to participate in
            any Skill Challenge or related Site Services, You must qualify and
            agree to the conditions set forth below. Failure to qualify and
            continuously abide by any of the following conditions constitutes a
            breach of this Agreement. Specifically, You agree that:&nbsp;
          </p>
          <ol>
            <li>
              <p>
                You are a natural person, at least 18 years old, or the age of
                legal consent for engaging in Skill Challenges under the laws of
                any jurisdiction that applies to You, whichever is greater. We
                expressly reserve the right to request proof of age, at any
                time;&nbsp;
              </p>
            </li>
            <li>
              <p>
                All information that You provide in Your registration form for
                the purposes of establishing Your Skill Challenge Account is
                true and correct and You will promptly notify us of any changes
                to such information;
              </p>
            </li>
            <li>
              <p>
                You acknowledge that in establishing Your Skill Challenge
                Account You have provided us with certain personal information
                about You (including details regarding Your method of payment).
                While we normally keep this information confidential, You agree
                that it may be necessary, from time to time, for Us to disclose
                certain personal information to third parties and You consent to
                all such disclosures. Please see our Privacy Policy for further
                information.
              </p>
            </li>
            <li>
              <p>
                Your Skill Challenge Account is for Your sole use only and must
                not be used by any third party. You shall not allow any third
                party to use Your Skill Challenge Account, password, Log-In or
                User ID to access or use the Site to arrange, enter, and/or
                participate in Skill Challenges, or for any other purposes. Nor
                shall You reveal to any person Your means of payment to access
                or use the Site, to arrange, enter, and/or participate in Skill
                Challenges. We take no responsibility for any third party access
                to Your Skill Challenge Account;
              </p>
            </li>
            <li>
              <p>
                You have verified and determined that Your use of the Site
                Services does not violate any law or regulation in any
                jurisdiction that applies to You. It is Your sole responsibility
                to ensure that this is the case;
              </p>
            </li>
            <li>
              <p>
                You fully understand the methods, rules and procedures of the
                Site Services, and Your use of the Site and Services will always
                comply fully with this Agreement, the Privacy Policy and the
                Skill Challenge Rules;
              </p>
            </li>
            <li>
              <p>
                You will not engage in any conduct that injures or may injure
                the business, reputation or goodwill of the Company;
              </p>
            </li>
            <li>
              <p>
                You are fully aware that there is a risk of losing money by
                using the Site to arrange, enter, and/or participate in Skill
                Challenges and that You are solely responsible for any such
                loss;
              </p>
            </li>
            <li>
              <p>
                Your Skill Challenge Account is for Your personal use only and
                it will not be used by You for commercial purposes or in the
                course of any trade or business;
              </p>
            </li>
            <li>
              <p>
                You possess the legal authority to enter into this Agreement
                including the authority to accept all of these Terms;
              </p>
            </li>
            <li>
              <p>
                You shall not infringe or encroach upon
                gamingplateform.com&apos;s or any third party&apos;s
                personal, contractual or proprietary rights, including, without
                limitation, patents, trademarks, copyrights, rights of privacy
                or publicity or trade secrets;&nbsp;
              </p>
            </li>
            <li>
              <p>
                You are physically located in a U.S. state or a jurisdiction
                located outside the U.S. in which participation in the Skill
                Challenges is not prohibited by the law of that State or
                jurisdiction. Participation in fee-based tournaments for prizes
                is prohibited in the following states, without limitation:
                Arizona, Iowa, Louisiana, Mississippi, Montana, Nevada, and
                South Dakota. The foregoing list shall not be construed to imply
                or suggest that Your participation in Skill Challenges from an
                unlisted state or jurisdiction is legal under any applicable
                laws or regulations.
              </p>
            </li>
            <li>
              <p>
                You will not use the Site or Services for gambling, or to
                otherwise participate in games of chance; should you learn that
                any User is soliciting participation in gambling, you will
                immediately notify gamingplateform.com in writing;&nbsp;
              </p>
            </li>
            <li>
              <p>
                You understand that gamingplateform.com may monitor Your
                Internet access location, without creating an obligation to do
                so, and may use techniques which are intended to block or
                restrict access from a jurisdiction in which participation in
                the Site Services and/or Skills Challenges are illegal or
                restricted;
              </p>
            </li>
            <li>
              <p>
                You will not mask your identify in any way, including without
                limitation, IP masking by accessing the Site Services over any
                type of Proxy Server, through IP masking software or the like;
                and
              </p>
            </li>
            <li>
              <p>
                You understand that We have no ability to control the outcomes
                of your Skill Challenges, and We only provide the Site as a
                facility to match Challenge Entrants and award the Prize.
              </p>
            </li>
          </ol>
          <p>
            The laws and regulations governing Tournaments with entry fees
            and/or prizes (cash or otherwise) are determined by individual
            states and/or local jurisdictions. We DO NOT warrant that our Site
            and/or Services are in compliance with all the laws and regulations
            in any localities, including Your locality. It is Your
            responsibility to ensure compliance with the laws and regulations of
            Your locale. Please be certain to use the Services and participate
            in the Skill Challenges only after You have determined in good-faith
            that they are in compliance with state, local and other governing
            laws and regulations.
          </p>
          <ol start='3'>
            <li>
              <p>PERSONS NOT ELIGIBLE</p>
            </li>
          </ol>
          <p>
            Notwithstanding Section 5, the following persons are ineligible to
            arrange, enter, establish, and/or participate in any Skill Challenge
            through use of the Site, or to receive any Skill Challenge Prize
            arranged or established through use of the Site or by
            gamingplateform.com:&nbsp;
          </p>
          <ul>
            <li>
              <p>
                Except with respect to arranging, entering, establishing and/or
                participating in any Skill Challenge for demonstration purposes,
                employees, immediate family of employees, agents, and
                contractors of gamingplateform.com (including its parent
                companies, subsidiaries and affiliates), and those of any other
                manufacturer or developer of the games or equipment used for the
                Skill Challenges arranged or established through use of the Site
                (i.e., any person with access to non-public information
                regarding the operation of any Skill Challenge arranged or
                established through use of the Site).&nbsp;
              </p>
            </li>
            <li>
              <p>
                Participation in fee-based tournaments for prizes is prohibited
                in the following U.S. states, without limitation: Arizona, Iowa,
                Louisiana, Mississippi, Montana, Nevada, and South Dakota. The
                foregoing list shall not be construed to imply or suggest that
                Your participation in Skill Challenges from an unlisted state is
                legal under any applicable laws or regulations.
              </p>
            </li>
          </ul>
          <ol start='2'>
            <li>
              <p>YOUR SKILL CHALLENGE ACCOUNT</p>
            </li>
          </ol>
          <p>
            You may only have one (1) Skill Challenge Account. You are
            prohibited from holding more than one Account. Your single Skill
            Challenge Account must be registered under Your current full legal
            name, Your email address and your current permanent residential
            address. Should You attempt to create more than one (1) Skill
            Challenge Account under Your current legal name or any other name,
            to use the Services under any other User&apos;s Skill Challenge
            Account, or to create an Account using a name other than Your
            current legal name, we will be entitled to immediately terminate all
            of such Skill Challenge Accounts under Section 21 of this Agreement.
          </p>
          <p>
            You must choose a Log-In and password during Account registration.
            You are solely responsible for all actions taken using Your Log-In
            and password. You must make every effort to keep Your password safe
            and should not disclose it to anyone. You shall not permit, either
            directly or indirectly, any other person to use Your Log-In or
            password. We are not responsible for any losses or problems You
            suffer as a result of Your disclosure of Your Log-In or password
            information to anyone else.
          </p>
          <p>
            To access the Services outlined under Section 4 of these Terms, You
            must have previously established a valid User Account as provided
            herein. Further, You must meet all the conditions described
            throughout these Terms and You must have money available in Your
            Skill Challenge Account sufficient to accept or propose a Skill
            Challenge or otherwise post a Skill Challenge Tournament Fee.
          </p>
          <p>
            You agree and understand that We collect data relating to Your
            Log-In, Your Skill Challenges, and Your other Account activity,
            including without limitation, Your Skill Challenge Results (e.g.,
            Your win/loss record), the Challenge Entrants You have previously
            participated in a Skill Challenge with, Your Disputed Results and
            the Prizes awarded to You. We make this information public so that
            other Users may attempt to assess Your skill level and history using
            the Site to arrange, enter, establish, and participate in Skill
            Challenges against You and/or other Users.
          </p>
          <ol start='3'>
            <li>
              <p>U.S. FEDERAL REPORTING REQUIREMENTS</p>
            </li>
          </ol>
          <p>
            If Your total Prizes from gamingplateform.com in any given year
            reach $600, and Your participation occurred from within the U.S.,
            gamingplateform.com will request that You submit Your social
            security number, and such other information as
            gamingplateform.com, in its sole discretion, may require in order
            to send You a Form 1099 in compliance with the U.S. federal income
            tax reporting requirements. Failure to provide Your social security
            number and other requested information at that time may result in
            termination of Your Skill Challenge Account and Site privileges by
            gamingplateform.com and gamingplateform.com&apos;s inability
            to credit Your Skill Challenge Account, distribute the balance of
            Your Skill Challenge Account to You, or distribute any winnings to
            You in excess of $600.
          </p>
          <ol start='4'>
            <li>
              <p>VERIFICATION OF YOUR ACCOUNT INFORMATION</p>
            </li>
          </ol>
          <p>
            gamingplateform.com reserves the right to conduct a review, at
            any time, to validate Your Skill Challenge Account information,
            collected under Section 7 and Section 8, to ensure that Your
            participation in the gamingplateform.com Skill Challenges and
            Your financial transactions do not breach this Agreement and/or any
            applicable law. You authorize us and our agents to make any
            inquiries of You and for us to use and disclose to any third party
            we consider necessary to validate this information, including but
            not limited to, credit reports and information in third-party
            databases. To facilitate the foregoing validation, You agree to
            provide sufficient information or documentation as
            gamingplateform.com, in its discretion, may request. If you do
            not provide such information within thirty (30) days of our request,
            your responses are incomplete or otherwise insufficient, or
            gamingplateform.com cannot verify the information applicable to
            Your Skill Challenge Account submitted pursuant to Section 7 or
            Section 8, Your Skill Challenge Account will be terminated pursuant
            to Section 21, and all funds remaining in Your Skill Challenge
            Account will become forfeited.
          </p>
          <ol start='5'>
            <li>
              <p>ACCOUNT DEPOSITS</p>
            </li>
          </ol>
          <p>
            You may deposit funds in Your Skill Challenge Account using Pay-Pal
            or other means of payment that We may approve from time to time, as
            defined in Section 12. All payments into Your Skill Challenge
            Account must be made from a payment source on which You are the
            named Account holder.
          </p>
          <p>
            You agree that the Site is not liable for any loss caused by any
            unauthorized use of Your Pay-Pal Account, Your credit card or any
            other method of payment by a third party in connection with the
            Site. You waive Your right to dispute any payment made into Your
            Account and You will personally bear all costs.
          </p>
          <p>
            Any attempt to defraud the Site through the use of credit cards or
            other methods of payment, regardless of the outcome, or any failure
            by You to honor charges or requests for payment will result in
            immediate termination of Your Skill Challenge Account, forfeiture of
            any Prizes to which You are otherwise entitled, and civil and/or
            criminal prosecution.
          </p>
          <p>
            In the case of suspected or fraudulent payment, including use of
            stolen Pay-Pal credentials, by anyone, or any other fraudulent
            activity, We reserve the right to block a User&apos;s Account. We
            shall be entitled to inform any relevant authorities or entities
            (including credit reference agencies) of any payment fraud or other
            unlawful activity, and may employ collection services to recover
            payments. We reserve the right to run credit checks on any User on
            the basis of the information provided to us on registration.
          </p>
          <ol start='6'>
            <li>
              <p>ACCOUNT WITHDRAWALS</p>
            </li>
          </ol>
          <p>
            Subject to express provisions to the contrary as set forth herein,
            at any time, You may submit a &quot;Withdrawal Request&quot; for a
            distribution of some or all of the balance (&quot;Distribution
            Amount&quot;) of your Skill Challenge Account. Your Withdrawal
            Request will be processed within a commercially reasonable time.
          </p>
          <p>
            For each Withdrawal Request submitted by You, a transactional
            Withdrawal Fee will be debited to Your requested Distribution Amount
            and, within a reasonable time, You will receive a &quot;Distribution
            Payout&quot; equal to the Distribution Amount less the Withdrawal
            Fee. There is a there is a $3 Transaction Processing Fee on all
            Paypal withdrawals and a $5 Transaction Processing Fee on all Check
            withdrawals. In certain circumstances we reserve the right to and
            may refund the Distribution Amount to the credit card used to make
            deposits instead of issuing the Distribution Amount through Paypal
            or Check.
          </p>
          <p>
            Should You elect to request any distribution of the balance of Your
            Skill Challenge Account, gamingplateform.com, at its sole
            discretion, may require additional personal or other information
            such as Your full legal name, current permanent residential address,
            phone number, email address, alias, Username, password, and social
            security number sufficient to a) generate payment, b) give You
            access to web-based information, and c) ensure compliance with legal
            reporting requirements.
          </p>
          <p>
            In the case of suspected or fraudulent payment, including use of
            stolen Pay-Pal credentials, by anyone, or any other fraudulent
            activity, We reserve the right to block a User&apos;s Account. We
            shall be entitled to inform any relevant authorities or entities
            (including credit reference agencies) of any payment fraud or other
            unlawful activity, and may employ collection services to recover
            payments. We reserve the right to run credit checks on any User on
            the basis of the information provided to us on registration.
          </p>
          <p>
            Any Bonus Cash credits to your Skill Challenge Account are not
            eligible for withdrawal.
          </p>
          <ol start='7'>
            <li>
              <p>PROCESSING OF ACCOUNT DEPOSITS AND WITHDRAWALS</p>
            </li>
          </ol>
          <p>
            gamingplateform.com may use third-party electronic payment
            processors and/or financial institutions (&apos;ESPs&apos;) to
            process financial transactions. You irrevocably authorize us, as
            necessary, to instruct such ESPs to handle deposits (as defined
            under Section 10) and withdrawals (as defined under Section 11) from
            Your Skill Challenge Account and you irrevocably agree that
            gamingplateform.com may give such instructions on your behalf in
            accordance with your requests as submitted on the
            gamingplateform.com website. You agree to be bound by the terms
            and conditions of use of each applicable ESP, and in the event or
            conflict between this Agreement and the ESP&apos;s terms and
            conditions then this Agreement shall prevail.&nbsp;
          </p>
          <ol start='8'>
            <li>
              <p>PROHIBITED USES OF THE SITE AND SERVICES</p>
              <ul>
                <li>
                  <p>Illegal Funds</p>
                </li>
              </ul>
            </li>
          </ol>
          <p>
            By entering into this Agreement and using the Site Services, You
            declare that the source of funds used by You on the Site is not
            illegal and that You will not use the Site or Services in any way as
            a money transfer system. You will not use the Service for any
            unlawful activity or prohibited transaction under the laws of any
            jurisdiction that applies to You. If the Company suspects that You
            may be engaging in or have engaged in fraudulent, unlawful or
            improper activity, including without limitation, money laundering
            activities, Your access to the Service may be suspended or
            terminated immediately and/or Your Account blocked, and the Company
            shall be entitled to inform relevant authorities. You will cooperate
            fully with the Company to investigate any suspected unlawful,
            fraudulent or improper activity.&nbsp;
          </p>
          <ul>
            <li>
              <p>Collusion</p>
            </li>
          </ul>
          <p>
            Collusion occurs when two or more Users attempt to gain an unfair
            advantage by sharing knowledge of the Skill Challenges or other
            information to other Users&apos; disadvantage. Any User who attempts
            to collude or colludes with any other User while using the Service
            may be permanently banned from using the Service and their Account
            may be terminated immediately. The Company will use commercially
            reasonable efforts to investigate complaints registered against
            Users suspected of collusion. If the Company is informed during play
            about suspected collusive behavior, it may, in its sole discretion,
            terminate suspected Users&apos; access to the Service and/or block
            their Accounts. However, under no circumstances shall the Company be
            liable for any loss, whatsoever, sustained by You as a result of the
            collusive, or otherwise unlawful activity of any person using the
            Service and no User shall have the right to require the Company to
            take any other steps against Users suspected of collusion, cheating
            or any other form of fraud.
          </p>
          <ul>
            <li>
              <p>Abuse</p>
            </li>
          </ul>
          <p>
            By entering into this Agreement, You agree that You will not use any
            technique other than pure skill during a Skill Challenge. Such
            techniques may include, but are not limited to, establishing
            multiple Accounts, the use of program codes or commands or any
            adapted hardware or software to assist play, the impersonation of
            another User or Account, or deliberately losing games for the
            purpose of getting a competitive advantage. For a more exhaustive
            discussion of prohibited techniques, refer to the Skill Challenge
            Rules located at&nbsp;gamingplateform.COM/RULES.
          </p>
          <ol start='9'>
            <li>
              <p>FEEDBACK/REVIEW SYSTEM</p>
            </li>
          </ol>
          <p>
            Under this Agreement, You accept and understand that You and Your
            Account will be subject to feedback and reviews submitted by Skill
            Challenge Entrants from Your previous Skill Challenges. For purposes
            of this Agreement, the terms &quot;Material&quot; and
            &quot;Content&quot; when used in relation to material and content
            posted by a User shall include any type of Material or Content,
            including without limitation, verbal, audio and visual.&nbsp;
          </p>
          <p>
            The Site provides a forum for Skill Challenge Entrants to post
            Material, such as comments, feedback or ratings to rate any previous
            adversaries that they have challenged, including their subjective
            rating of their ability. Upon completion of a Skill Challenge, each
            Skill Challenge Entrant will have the opportunity to submit publicly
            available feedback relating to the Skill Challenge and their
            opponent.
          </p>
          <p>
            gamingplateform.com will remove feedback ratings and
            comments:&nbsp;
          </p>
          <ul>
            <li>
              <p>
                if such Material violates the terms of this Agreement, and
                gamingplateform.com receives satisfactory notification of the
                same;
              </p>
            </li>
            <li>
              <p>upon mutual agreement of each User; or&nbsp;</p>
            </li>
            <li>
              <p>
                if gamingplateform.com is legally obligated by court order or
                Judgment, or pursuant to a settlement agreement resolving a
                lawsuit.&nbsp;
              </p>
            </li>
          </ul>
          <p>
            Users should use caution and good judgment when submitting feedback
            or ratings for another User, because:&nbsp;
          </p>
          <ul>
            <li>
              <p>
                Feedback or ratings cannot be edited or removed once they have
                been submitted. Feedback and ratings generally become a
                permanent part of a User&apos;s record and are publicly
                viewable.
              </p>
            </li>
            <li>
              <p>
                Users can be held legally responsible for damages to another
                User&apos;s reputation if a court were to find that the feedback
                or ratings constitute libel or defamation. Under federal law
                (the Communications Decency Act) because gamingplateform.com
                does not censor feedback or ratings or investigate them for
                accuracy, gamingplateform.com is not legally responsible for
                the feedback or ratings that are posted on the Site, even if the
                feedback or ratings are defamatory. However, this Communications
                Decency Act does not protect any person who leaves feedback or
                ratings from liability.
              </p>
            </li>
          </ul>
          <p>
            Feedback or ratings that violate the terms of this Agreement, or
            that meet any of the circumstances described below or in the Abuse
            portion of Section 20, may be subject to removal.
          </p>
          <ul>
            <li>
              <p>
                gamingplateform.com is provided with a valid court order
                finding that the disputed feedback or ratings are slanderous,
                libelous, defamatory or otherwise illegal.
              </p>
            </li>
            <li>
              <p>
                The feedback or ratings contain profane, vulgar, obscene, or
                racist language or adult Material. Inflammatory language, such
                as &quot;fraud, liar, cheater, scam artist, con man&quot; etc.,
                while strongly discouraged, will not be removed.
              </p>
            </li>
            <li>
              <p>
                The feedback or rating contains personal identifying information
                about another User, including real name, address, phone number,
                or e-mail address.
              </p>
            </li>
            <li>
              <p>
                The feedback or rating makes reference to law enforcement
                organization investigation.
              </p>
            </li>
            <li>
              <p>The feedback or rating contains links or scripts.</p>
            </li>
            <li>
              <p>
                Feedback or ratings posted or submitted by a User who provided
                gamingplateform.com with false contact information and could
                not be contacted.
              </p>
            </li>
            <li>
              <p>
                Feedback or ratings posted or submitted by Users who are
                indefinitely suspended for certain policy violations within 90
                days of registration. gamingplateform.com believes that Users
                who are indefinitely suspended soon after registration
                shouldn&apos;t be able to permanently impact another Account.
              </p>
            </li>
            <li>
              <p>
                gamingplateform.com will automatically remove feedback from
                Users indefinitely suspended within 90 days of registration. Not
                all suspension types qualify for automatic feedback removal.
              </p>
            </li>
          </ul>
          <p>
            Violations of these provisions may result in a range of actions,
            including without limitation, Account termination, limits on Account
            privileges, Account suspension and/or feedback or rating removal.
            Negative feedback or ratings intended for another User will be
            considered for removal only in situations where the User responsible
            for the mistaken posting informs gamingplateform.com of the error
            and has already placed the same feedback for the correct User.
          </p>
          <ol start='10'>
            <li>
              <p>CHAT SYSTEM</p>
            </li>
          </ol>
          <p>
            The Site provides a chat forum for Users to connect and chat (the
            &quot;Chat System&quot;). Users wishing to post Material on the Chat
            System must strictly adhere to the policies outlined herein.&nbsp;
          </p>
          <p>
            Any violation of these provisions may result in a range of actions,
            including without limitation, Account termination, fines, limits on
            Account privileges, and/or Account suspension.
          </p>
          <ol start='11'>
            <li>
              <p>DISCLOSURES</p>
            </li>
          </ol>
          <p>Odds of Winning</p>
          <p>
            You recognize and understand that the outcomes of Skill Challenges
            are directly related to the skill level of the Skill Challenge
            Entrants, and are fully outside of control of
            gamingplateform.com. It is impossible for gamingplateform.com
            to assess Your odds of winning. Skill Challenge Entrants are solely
            responsible for determining the Skill Challenges in which they enter
            and participate through use of the Site.
          </p>
          <p>Verified Winner Determination</p>
          <p>
            Skill Challenge Entrants are responsible for managing and reporting
            the Skill Challenge Results to determine the Verified Winner. As
            outlined in Section 4, gamingplateform.com may act as a
            third-party arbiter for Disputed Results to determine a Verified
            Winner and award a Prize, or if not, convert the Accepted Skill
            Challenge to a Canceled Accepted Skill Challenge.
          </p>
          <ol start='12'>
            <li>
              <p>WE DISCLAIM ALL OBLIGATIONS TO YOU</p>
            </li>
          </ol>
          <p>
            gamingplateform.com has no obligation to check whether Users are
            using the Site Services in accordance with this Agreement or any
            other agreement.
          </p>
          <p>
            Under no circumstances shall gamingplateform.com be obligated to
            investigate or pursue any complaints made by a User against any
            other User using the Site or Services or to take any other action in
            connection therewith, or take any action against a User for any
            reason, including without limitation, for violating the terms of
            this Agreement. gamingplateform.com may, in its sole discretion,
            decide to take appropriate action against any person it suspects to
            be engaging in any unlawful activity or otherwise violating the
            terms of this Agreement, but is under no obligation to do so.
          </p>
          <p>
            You will not be entitled to a refund from the Company for any sums
            You believe to be owed to You as a result of any other User&apos;s
            misconduct, unlawful behavior or otherwise, whether or not the
            Company pursues any action against such User. It is Your sole
            responsibility to resolve such issues without involving
            gamingplateform.com.
          </p>
          <ol start='13'>
            <li>
              <p>RELEASE</p>
            </li>
          </ol>
          <p>
            If You have a dispute with one or more Users, You release us (and
            our officers, directors, agents, subsidiaries, joint ventures and
            employees) from all claims, demands and damages (actual and
            consequential) of every kind and nature, known and unknown, arising
            out of or in any way connected with such disputes. If You are a
            California resident, You acknowledge and waive the effect of
            California Civil Code 1542, which says: &quot;A general release does
            not extend to claims which the creditor does not know or suspect to
            exist in his favor at the time of executing the release, which if
            known by him must have materially affected his settlement with the
            debtor.&quot;&nbsp;
          </p>
          <ol start='14'>
            <li>
              <p>WE MAKE NO WARRANTY</p>
            </li>
          </ol>
          <p>
            OUR SITE SERVICES ARE PROVIDED &quot;AS-IS,&quot; &quot;WITH ALL
            FAULTS&quot; AND &quot;AS AVAILABLE.&quot; WE GIVE NO EXPRESS
            WARRANTIES, GUARANTEES OR CONDITIONAL WARRANTIES. TO THE EXTENT
            PERMITTED BY LAW, WE EXCLUDE ANY AND ALL IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANLIKE
            EFFORT AND NON-INFRINGEMENT.
          </p>
          <ol start='15'>
            <li>
              <p>OUR LIABILITY IS LIMITED</p>
            </li>
          </ol>
          <p>
            As Our maximum liability for any violation of this Agreement, You
            can recover from Us only direct damages up to an amount equal to
            Your most recent gamingplateform.com Service Fee. You cannot
            recover any other damages, including consequential, lost profits,
            special, indirect or incidental damages. This limited remedy applies
            to any matter related to the Site even if this remedy does not fully
            compensate Your for any losses, and whether or not We knew or should
            have known about the possibility of damages.&nbsp;
          </p>
          <p>
            Note: Some states, countries, provinces and/or localities do not
            allow for limitation of incidental, consequential, or other damages,
            so the above limitation may not apply to You.
          </p>
          <p>
            In the event that You have any right, claim or action against any
            other User arising from the User&apos;s use of the Site, You agree
            to pursue such right, claim or action independently of and without
            recourse to Us, and You release and agree to hold Us harmless from
            and against any and all claims, liability, damages, losses, costs
            and expenses including legal fees known and unknown, arising from or
            in any way connected with such right, claim or action.
          </p>
          <p>
            We shall not be liable for any acts or omissions made by any
            Internet Service Provider (&quot;ISP&quot;) with whom Users have
            contracted to gain access to the server that hosts the Site.
          </p>
          <ol start='16'>
            <li>
              <p>TERM AND TERMINATION</p>
            </li>
          </ol>
          <p>Generally</p>
          <p>
            You may terminate Your Skill Challenge Account at any time by giving
            us thirty (30) days prior written notice to the e-mail address
            CONTACT@ gamingplateform.COM.&nbsp;
          </p>
          <p>
            We expressly reserve the right to terminate Your Skill Challenge
            Account (including Your Log-In and password) for any reason,
            including without limitation, violation of any terms or conditions
            of this Agreement, or if You have breached any of the Terms, or Your
            use of the Services have been in any way improper or breach the
            spirit of this Agreement.
          </p>
          <p>
            If Your Skill Challenge Account is terminated by either You or us,
            We will pay You the balance outstanding in Your Account in
            accordance with Section 11, notwithstanding express provisions to
            the contrary as set forth herein.
          </p>
          <p>Termination for Violation of Terms</p>
          <p>
            If We terminate Your Skill Challenge Account for violating any of
            the Terms, in addition to the Withdrawal Fee, a Termination Fee will
            be subtracted from Your Account. The Termination Fee is $5.00
            (U.S.).
          </p>
          <p>Termination for Latency</p>
          <p>
            If Your Skill Challenge Account has a balance less than or equal to
            $15.00 (U.S.) and Your Account experiences no activity for sixty
            (60) consecutive days, Your Account will be automatically
            terminated, and the balance in Your Skill Challenge Account will be
            considered an administrative charge and will immediately become
            property of gamingplateform.com.&nbsp;
          </p>
          <p>
            If Your Skill Challenge Account has a balance greater than $15.00
            (U.S.), upon sixty (60) consecutive days of inactivity, a $15.00
            (US) administrative charge will be deducted from Your Account. For
            every subsequent thirty (30) consecutive days of inactivity, a
            $10.00 (US) administrative charge will be deducted from Your
            Account.&nbsp;
          </p>
          <p>
            You can avoid Termination and the Termination fee that may arise
            from latency by notifying Us, in writing, before the foregoing sixty
            (60) day latency occurs. Written notification under this section
            should be directed to&nbsp;CONTACT@&nbsp;gamingplateform.COM.
          </p>
          <p>Disbursement of Account Balance Upon Termination</p>
          <p>
            Upon termination, an automatic Withdrawal Request will be entered
            pursuant to section 11 for any balance remaining in Your Account.
            All Account disbursements that may be processed due to termination
            are subject to Sections 7, Section 8 and Section 9.
          </p>
          <ol start='17'>
            <li>
              <p>INTELLECTUAL PROPERTY</p>
            </li>
          </ol>
          <p>
            When You submit any information, Content, feedback or ratings
            (collectively, &quot;Submissions&quot;), You grant us a
            non-exclusive, worldwide, perpetual, irrevocable, royalty-free,
            sub-licensable (through multiple tiers) right to use such
            Submissions and to exercise the related copyright, publicity, and
            database rights You have in the Submissions, in any media known now
            or in the future. (We need these rights to host and display Your
            Submissions.)&nbsp;
          </p>
          <p>
            You may not copy, download, modify or create derivate works, rent,
            lease, loan, distribute, re-use, adapt, publish, transmit, attempt
            to decompile, decipher, disassembly, reverse engineer, decrypt or
            otherwise use or exploit any software or other works or content from
            the Site unless We have expressly allowed You to do so. You agree
            that all proprietary rights, including all trademark, copyright,
            patent or trade secret rights, inherent in such software, works and
            content is owned by Us or applicable third parties.
          </p>
          <p>Reporting Infringements or Other Concerns</p>
          <p>
            If You believe that the Site or any software, work or content on the
            Site infringes any copyright, trademark, patent, trade secret or
            other intellectual property right, or if You have other material
            concerns regarding the Site, privacy or the like, You may notify our
            designated agent by using the contact information below:CONTACT@
            gamingplateform.COM.
          </p>
          <p>
            The terms gamingplateform.com and Sample gamingplateform are the
            trademarks, service marks and/or trade names of gamingplateform
            ENTERTAINMENT LLC. You obtain no rights in such copyright material
            or trade or service marks and must not use them without the
            gamingplateform.com&apos;s written permission.
          </p>
          <ol start='18'>
            <li>
              <p>ABUSE</p>
            </li>
          </ol>
          <p>
            Without limiting other remedies, We may limit, suspend, or terminate
            access and use of our Site or Services, and Accounts, prohibit
            access to the Site, remove hosted Content, and take technical and
            legal steps to keep any User off the Site if We think that such User
            is creating problems, possible legal liabilities, or acting
            inconsistently with the letter or spirit of these Terms and
            Condition or Our policies.
          </p>
          <p>
            The following are common examples of violations that may result in
            immediate removal, warning, sanction, Account termination, or
            suspension from the Site:
          </p>
          <ul>
            <li>
              <p>
                Posting Material of any third party, including proprietary
                Material;
              </p>
            </li>
            <li>
              <p>
                Advocating or proposing illegal activity or discussing an intent
                to commit an illegal act;
              </p>
            </li>
            <li>
              <p>
                Including another individual&apos;s contact information and/or
                email address in a post.
              </p>
            </li>
            <li>
              <p>
                Including pornography, indecency, profanity, vulgarity, hate
                speech, disruptive, or hostile comments, interpersonal disputes,
                or threats of violence in a post;
              </p>
            </li>
            <li>
              <p>
                Seeking to exploit or harm children by exposing them to
                inappropriate Content, asking for personally identifiable
                information or the like;
              </p>
            </li>
            <li>
              <p>
                Impersonating or misrepresenting Your connection to any other
                entity or person or otherwise manipulating headers or
                identifiers to disguise the origin of the Content;
              </p>
            </li>
            <li>
              <p>
                Using JavaScript or active code, making repetitive posts, or
                otherwise taking actions that interfere with Site operations;
              </p>
            </li>
            <li>
              <p>
                Impersonating or attempting to impersonate
                gamingplateform.com staff or other Users;
              </p>
            </li>
            <li>
              <p>
                Encouraging others to violate gamingplateform.com policies or
                the gamingplateform.com Terms and Conditions;
              </p>
            </li>
            <li>
              <p>
                Using the Site for commercial purposes, including advertising
                any commercial endeavor (e.g., offering for sale products or
                services) except as may be specifically authorized by
                gamingplateform.com;
              </p>
            </li>
            <li>
              <p>Soliciting funds, investors, advertisers or sponsors;</p>
            </li>
            <li>
              <p>
                Submitting any programs that contain viruses, worms and/or
                Trojan horses or any other computer code, files or programs
                designed to interrupt, redirect, destroy or limit the
                functionality of any computer software or hardware or
                telecommunications;
              </p>
            </li>
            <li>
              <p>
                Disrupting the normal flow of dialogue, causing a screen to
                scroll faster than other Users are able to type, or otherwise
                act in a way which affects the ability of other people to engage
                in real time activities via the Site;
              </p>
            </li>
            <li>
              <p>Posting or uploading MP3 formatted files;</p>
            </li>
            <li>
              <p>
                Posting any information containing hyper-links to other sites
                that contain Content that otherwise violates this Agreement, or
                falls within the descriptions of Abuse set forth herein;
              </p>
            </li>
            <li>
              <p>
                Refusing to follow gamingplateform.com staff instructions;
              </p>
            </li>
            <li>
              <p>Posting email Content from private parties;</p>
            </li>
            <li>
              <p>
                Discussing or reposting deleted posts or warning letters, or
                discussion of sanctioned or no longer registered Users; and/or
              </p>
            </li>
            <li>
              <p>
                Using the Site or Services for gambling, or to otherwise
                participate in games of chance.
              </p>
            </li>
          </ul>
          <ol start='19'>
            <li>
              <p>MISCELLANEOUS</p>
            </li>
          </ol>
          <p>Modification Of The Terms</p>
          <p>
            We may modify any portion of the Terms, without notice, at any time.
            A printable version of the most current form of the Terms is
            available on the gamingplateform.com website. Following such
            modification, Your continued use of the Site or Services signifies
            Your acceptance of the modifications and You understand and accept
            that You become immediately bound thereby. You are solely
            responsible for periodically reviewing these Terms and Conditions
            for any such modifications.
          </p>
          <p>Modification Of The Services</p>
          <p>
            We may modify or terminate the Services or elements (e.g., Skill
            Challenges offered or the like) at any time.
          </p>
          <p>Assignment</p>
          <p>
            We may assign this agreement, in whole or in part, at any time with
            or without notice to You. You may not assign this agreement, or any
            part of it, to any other party. Any attempt by You to do so is void,
            and Your Account may be deemed terminated subject to Section 18.
            Instead, You may terminate Your Account. The other party may then
            establish an Account and enter into a contract with Us.
          </p>
          <p>Choice Of Law</p>
          <p>
            This Agreement shall be construed, enforced and governed by the laws
            of the State of Michigan and applicable federal law. You agree to
            accept the exclusive jurisdiction of the state and federal courts
            located in Oakland County, Michigan, U.S.A. and You shall only bring
            suit against Us for any dispute arising out of this Agreement in a
            court of law in the state and federal courts located in Oakland
            County, Michigan, U.S.A. This Agreement shall not be governed by the
            United Nations Convention on Contracts for the International Sale of
            Goods, the application of which is expressly disclaimed. No party
            shall make a motion to dismiss or transfer any case filed in
            accordance with this subsection on the basis of improper venue,
            personal jurisdiction, or of the convenience of any party or
            witness.
          </p>
          <p>Indemnity</p>
          <p>
            You agree to indemnify, defend, and hold harmless
            gamingplateform.com against all claims, liability, damages, costs
            and expenses, including reasonable legal fees and expenses, arising
            out of or related to (1) a breach of this Agreement, (2) Your use of
            this Site or Services either alone or in combination with any other
            material, (3), Your failure to abide by any restriction regarding
            the use of any Skill Game Challenges or Submissions, or (4) any
            claim by a third party related to the use of Skill Game Challenges
            or Submissions, alone or in combination with any other material. In
            any dispute between gamingplateform.com and You,
            gamingplateform.com shall be entitled to recover its reasonable
            attorneys&apos; fees, legal expert fees, and other legal expenses
            from You.
          </p>
          <p>No Agency</p>
          <p>
            No agency, partnership, joint venture, employee-employer or
            franchiser-franchisee relationship is intended or created by this
            Agreement.
          </p>
          <p>Severability</p>
          <p>
            If any provision of this Agreement is held by a court of competent
            jurisdiction to be invalid, void or unenforceable for whatever
            reason, the remaining provisions not so declared shall nevertheless
            continue in full force and effect without being impaired in any
            manner whatsoever.
          </p>
          <p>Waiver</p>
          <p>
            No term or condition of this Agreement shall have been deemed to
            have been waived, nor shall there be an estoppel against the
            enforcement of this Agreement, except by written instrument of the
            party to be charged with such waiver or estoppel. No such written
            waiver shall be deemed a continuing waiver unless specifically
            stated therein, and each such waiver shall operate only to the
            specific term or condition waived and shall not constitute a waiver
            of such term or condition for the future or as any other than that
            specifically waived.
          </p>
          <p>Links</p>
          <p>
            Our Site may link to other websites that are not under
            gamingplateform.com&apos;s control. These links do not imply
            endorsement by gamingplateform.com and We are not responsible for
            the availability of or the Content contained in any linked website.
          </p>
          <p>Third Party Advertising</p>
          <p>
            From time to time, gamingplateform.com may display or otherwise
            make available promotions, advertisements and/or offers provided by
            third-parties (&quot;Third Party Promotions&quot;). You understand
            and agree to hold gamingplateform.com harmless and agree that
            gamingplateform.com shall have no liability whatsoever for such
            Third Party Promotions. If You participate in, click on, or
            otherwise link to such Third Party Promotions You do so solely at
            Your own risk. Your sole remedy in connection with such Third Party
            Promotions will be with the third party.
          </p>
          <p>Privacy</p>
          <p>
            We use Your information only as described in the
            gamingplateform.com Privacy Policy. We view protection of
            Users&apos; privacy as a very important community principle. We
            store and process Your information on computers located in the U.S.
            that are protected by physical as well as technological security
            devices. You can access and modify the information You provide us
            and choose not to receive certain communications by signing-in to
            Your Account. For a complete description of how We use and protect
            Your personal information, see the gamingplateform.com Privacy
            Policy. If You object to Your information being transferred or used
            in this way please do not use our Services.
          </p>
          <p>
            This Site may contain or use technology that provides
            gamingplateform.com with information regarding Your use of the
            Site, or which permits gamingplateform.com to audit Your
            compliance with this Agreement via the use of software designed
            therefor. GamerSaloon.com may collect general statistical
            information about Your accessing or viewing the Site such as, but
            not limited to, the total number of visitors, most-accessed services
            or areas on the website, Your IP address, etc.
            gamingplateform.com may use such data to better serve You and to
            improve the Site features.
          </p>
          <p>
            gamingplateform.com may collect User e-mail addresses. You hereby
            consent to receive communication from gamingplateform.com and any
            affiliated party by e-mail. Such communication may include marketing
            information, updates about the services provided on this website, or
            other information.
          </p>
          <p>
            <br />
          </p>
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

export default Terms;
