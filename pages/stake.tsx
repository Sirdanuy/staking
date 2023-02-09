import React, { useState, useEffect } from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useNFTDrop,
  useToken,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
function Stake() {
  const nftDropContractAddress = "0xdC7E2528250c8739cb7d97299215ebC28b62c70C";
  const tokenContractAddress = "0x037140d79E2F0bBA44922dd2Ae7e18De7002ce7D";
  const stakingContractAddress = "0x58612FEff48f27a7BFA55Da8189B10D96784F9e0";

  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const nftDropContract = useNFTDrop(nftDropContractAddress);
  const tokenContract = useToken(tokenContractAddress);
  const { contract, isLoading, isError } = useContract(stakingContractAddress);

  // unstaked NFT
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  const [claimableRewards, setClaimableRewards,] = useState<BigNumber>();

  useEffect(() => {
    if (!contract) return;

    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedNfts(stakedNfts);
      console.log("setStakedNfts", stakedNfts);
    }

    if (address) {
      loadStakedNfts();
    }
  }, [address, contract, nftDropContract]);

  useEffect(() => {
    if (!contract || !address) {
      return;
    }

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);

  async function stakeNft(id: BigNumber) {
    if (!address) {
      return;
    }

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );

    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }

    const stake = await contract?.call("stake", id);
  }
  
  async function stakenft(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id);
  }


  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

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
      <br/><br/><br/><br/>
      <h1 className={styles.h1}>Stake Your NFTs</h1>

      <hr className={`${styles.divider} ${styles.spacerTop}`} />

      {!address ? (
        <button className={styles.mainButton} onClick={connectWithMetamask}>
          Connect Wallet
        </button>
      ) : (
        <>
          <h2>Your Tokens</h2>

          <div className={styles.tokenGrid}>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
              <p className={styles.tokenValue}>
                <b>
                  {!claimableRewards
                    ? "Loading..."
                    : ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenBalance?.symbol}
              </p>
            </div>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Current Balance</h3>
              <p className={styles.tokenValue}>
                <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
              </p>
            </div>
          </div>

          <button
            className={`${styles.mainButton} ${styles.spacerTop}`}
            onClick={() => claimRewards()}
          >
            Claim Rewards
          </button>

          <hr className={`${styles.divider} ${styles.spacerTop}`} />

          <h2>Your Staked NFTs</h2>
          <div className={styles.nftBoxGrid}>
            {stakedNfts?.map((nft) => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
                <button
                  className={`${styles.mainButton} ${styles.spacerBottom}`}
                  onClick={() => withdraw(nft.metadata.id)}
                >
                  Withdraw
                </button>
              </div>
            ))}
          </div>

          <hr className={`${styles.divider} ${styles.spacerTop}`} />

          <h2>Your Unstaked NFTs</h2>

          <div className={styles.nftBoxGrid}>
            {ownedNfts?.map((nft) => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
                <button
                  className={`${styles.mainButton} ${styles.spacerBottom}`}
                  onClick={() => stakeNft(nft.metadata.id)}
                >
                  Stake
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Stake;
console;