import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";

export default function FantasyLeagues() {
  return (
    <Box sx={{ flexGrow: 1, color: "white" }}>
      <Grid container mt={2} spacing={2}>
        <Grid item md={12}>
          <div style={{ textAlign: 'justify' }}>
            <p>Fantasy Esports lets you try your skills as a fantasy owner. After you join a league, you scout for and draft players, compete against other fantasy owners, and use all your skills to win the championship. Learning how to play fantasy esports is easy; conquering your competitors and becoming a champion is a different story.</p>

            <p>Fantasy Esports 101: Here&apos;s what happens in a fantasy esports season.</p>
            <ol>
              <li>
                <p>You join a league.</p>
              </li>
            </ol>
            <p>You can join a public league, where anyone can sign up for a spot, or a private league, where you need an invitation to play. Some people, typically beginners, play just for fun and some play for money (in some cases, serious coin). Be sure to understand the type of league you join, along with its rules. League selection is an important factor, so don&apos;t take it lightly.</p>
            <ol start="2">
              <li>
                <p>You prepare for your league draft by scouting players.</p>
              </li>
            </ol>
            <p>Before choosing your fantasy team, you need to research all the available players so you can pre-rank them according to your personal preference. Understanding your league&rsquo;s scoring system and roster setup is critical to creating a bulletproof draft strategy.</p>
            <ol start="3">
              <li>
                <p>You build your fantasy esports team via the draft.</p>
              </li>
            </ol>
            <p>The draft is the most fun and exciting day of the fantasy season. During the draft, each fantasy owner selects one GRAND PRIX player at a time until the rosters are complete. Fantasy football drafts can take place online, but some leagues &mdash; typically friends or co-workers &mdash; will conduct the draft in person. Remember to draft all of the correct positions, so that you can have a full team roster.</p>
            <ol start="4">
              <li>
                <p>Your team competes against another team every week.</p>
              </li>
            </ol>
            <p>During the GRAND PRIX season, the real teams face each other and so do the fantasy teams in your league. The players&apos; real-time stats are converted into fantasy points by your league provider, and the fantasy team that scores the most points wins the game for the week. The goal is to win as many games as possible to make the playoffs.</p>
            <ol start="5">
              <li>
                <p>You make moves to improve your team.</p>
              </li>
            </ol>
            <p>As a fantasy owner, you&apos;re in total control. You can drop players you think aren&apos;t good enough and replace them with free agents. If one of your starters gets injured, you can bench him and start a healthy player instead. You may even make a trade offer to another owner.</p>
            <ol start="6">
              <li>
                <p>Your team (hopefully) makes the playoffs and wins your league.</p>
              </li>
            </ol>
            <p>Only the strong survive, and at the end of the fantasy season, the top teams square off in a single-elimination tournament to decide the league champion. The last team standing may win a trophy, a cash prize, or just honor; but make no mistake, there will be only one winner.</p>


          </div>

        </Grid>

      </Grid>
    </Box>
  );
}
