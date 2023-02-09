import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  return (
   
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerbar}> 
        <div>
        <a className={styles.headerbar} href="https://www.freshboyzclub.com/#faq"> FAQ</a>
        <a className={styles.headerbar}  href="https://www.freshboyzclub.com/#roadmap">ROADMAP</a>
        <a className={styles.headerbar} href="https://www.freshboyzclub.com/#story">STORY</a> 
        <a className={styles.headerbar} href="https://www.freshboyzclub.com/#creators">CREATORS</a>
        </div>
        </div>
       <div> <a> <Image src="/IMG_4400 (1).png" alt="drop" width={92} height={92} /></a></div>
       
         <div>
         <a href="https://discord.gg/dtyXyZkqVJ">  <Image src="/discord.png" alt="discord" width={39} height={39}></Image></a>
         <a href="https://opensea.io/collection/fresh-boyz-club">  <Image src="/opensea.png" alt="discord" width={39} height={39}></Image></a>
         <a href=" https://twitter.com/freshboyzclub_">  <Image src="/twitter.png" alt="discord" width={39} height={39}></Image></a>

         </div>
       
      </div>

      {/* Top Section */}
      <br/><br/><br/><br/>
      {/* <h1 className={styles.h1}>WELCOME TO FRESHBOYZ ENGINE</h1> */}
      <br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div className={styles.nftBoxGrid}>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push(`/stake`)}
        >
          {/* Staking an NFT */}
          <Image src="/IMG_4400 (1).png" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
          <p className={styles.selectBoxDescription}>
            Use the staking engine <b>FRESHBOYZ</b>{" "}
            to stake your NFTs, and earn tokens <b>$FRSH</b>.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
