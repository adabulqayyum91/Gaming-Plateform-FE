import React from 'react'
import classes from './WinCard.module.css';

function WinCard() {
  return (
   <>
    <div className={classes.div}>
        <div style={{margin:10}}>
        <div className={classes.img}/>
      <h1 className={classes.text}>Tournaments | League | Ladders</h1>
      <h2 className={classes.paragraph}>Organize or Compete in any of our Tournaments, Leagues or ladders and win prizes</h2>
      <button className={classes.btn} ><h5 className={classes.internalTExt}>
        Get Started
        </h5></button>
        </div>
      
    </div>
    <div className={classes.div}>
        <div style={{margin:10}}>
        <div className={classes.img}/>
      <h1 className={classes.text2}>Play Anytime</h1>
      <h2 className={classes.paragraph}>Play anywhere anytime in different modes of game</h2>
      <button className={classes.btn} ><h5 className={classes.internalTExt}>
        Get Started
        </h5></button>
        </div>
      
    </div>
    <div className={classes.div}>
        <div style={{margin:10}}>
        <div className={classes.img}/>
      <h1 className={classes.text3}>Challenge</h1>
      <h2 className={classes.paragraph}>Can challenge and compete with any player across the platform</h2>
      <button className={classes.btn} ><h5 className={classes.internalTExt}>
        Get Started
        </h5></button>
        </div>
      
    </div>
   </>
   
  );
}

export default WinCard;