import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Rules() {
  return (
    <>
      <Grid className="far-apart-center" width="100%">
        <Typography component="span" sx={{ color: "white", fontSize: 24 }}>
          Rules
        </Typography>
      </Grid>
      <Box>
        <Box sx={{ flexGrow: 1, color: "white" }}>
          <Grid container mt={2} spacing={2}>
            <Grid item md={12}>
              <Typography component="p">
                Fantasy Esports lets you try your skills as a fantasy owner.
                After you join a league, you scout for and draft players,
                compete against other fantasy owners, and use all your skills to
                win the championship. Learning how to play fantasy esports is
                easy; conquering your competitors and becoming a champion is a
                different story.
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6">
                Fantasy Esports 101: Here&#39;s what happens in a fantasy
                esports season.
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography component="p">
                1. You join a league. You can join a public league, where anyone
                can sign up for a spot, or a private league, where you need an
                invitation to play. Some people, typically beginners, play just
                for fun and some play for money (in some cases, serious coin).
                Be sure to understand the type of league you join, along with
                its rules. League selection is an important factor, so don&#39;t
                take it lightly.
              </Typography>
            </Grid>
            <Grid item md={12} marginY={1.5}>
              <Typography component="p">
                2. You prepare for your league draft by scouting players. Before
                choosing your fantasy team, you need to research all the
                available players so you can pre-rank them according to your
                personal preference. Understanding your league’s scoring system
                and roster setup is critical to creating a bulletproof draft
                strategy.
              </Typography>
            </Grid>
            <Grid item md={12} marginY={1.5}>
              <Typography component="p">
                3. You build your fantasy esports team via the draft. The draft
                is the most fun and exciting day of the fantasy season. During
                the draft, each fantasy owner selects one GRAND PRIX player at a
                time until the rosters are complete. Fantasy football drafts can
                take place online, but some leagues — typically friends or co-
                workers — will conduct the draft in person. Remember to draft
                all of the correct positions, so that you can have a full team
                roster.
              </Typography>
            </Grid>
            <Grid item md={12} marginY={1.5}>
              <Typography component="p">
                4. Your team competes against another team every week. During
                the GRAND PRIX season, the real teams face each other and so do
                the fantasy teams in your league. The players&#39; real-time
                stats are converted into fantasy points by your league provider,
                and the fantasy team that scores the most points wins the game
                for the week. The goal is to win as many games as possible to
                make the playoffs.
              </Typography>
            </Grid>
            <Grid item md={12} marginY={1.5}>
              <Typography component="p">
                5. You make moves to improve your team. As a fantasy owner,
                you&#39;re in total control. You can drop players you think
                aren&#39;t good enough and replace them with free agents. If one
                of your starters gets injured, you can bench him and start a
                healthy player instead. You may even make a trade offer to
                another owner.
              </Typography>
            </Grid>
            <Grid item md={12} marginY={1.5}>
              <Typography component="p">
                6. Your team (hopefully) makes the playoffs and wins your
                league.
              </Typography>
            </Grid>
            <Grid item md={12} marginY={1.5}>
              <Typography component="p">
                Only the strong survive, and at the end of the fantasy season,
                the top teams square off in a single-elimination tournament to
                decide the league champion. The last team standing may win a
                trophy, a cash prize, or just honor; but make no mistake, there
                will be only one winner.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

/*

Only the strong survive, and at the end of the fantasy season, the top teams square off in a

single-elimination tournament to decide the league champion. The last team standing may

win a trophy, a cash prize, or just honor; but make no mistake, there will be only one

winner.
*/
