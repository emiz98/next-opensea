import { useWeb3 } from '@3rdweb/hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { useState, useMemo } from 'react'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { client } from '../../lib/sanityClient'
import { useEffect } from 'react'
import Header from '../../components/Header'
import NFTCard from '../../components/NFTCard'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import Head from 'next/head'

const style = {
  bannerImageContainer: `h-[30vh] w-screen overflow-hidden flex justify-center items-center `,
  bannerImage: `object-cover h-full w-full`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `hidden lg:flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-4xl lg:text-5xl font-bold mb-4 text-center`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-full lg:w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-xl lg:text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `hidden lg:flex h-6 mr-2`,
  statName: `text-sm lg:text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

function Collection() {
  const router = useRouter()
  const { provider } = useWeb3()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_TOKEN}`
    )
    return sdk.getNFTModule(collectionId)
  }, [provider])

  //Get all the NFTs inside the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      setNfts(nfts)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_TOKEN}`
    )
    return sdk.getMarketplaceModule(
      '0x834793E4827EB7d5F9440592f3A820025cDfeb3f'
    )
  }, [provider])

  //Get all listings inside a collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  //Get collection data from sanity
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress=="${collectionId}"]{
        "imageUrl": profileImage.asset->url,
        "bannerImage":bannerImage.asset->url,
        volumeTraded,
        createdBy,
        contractAddress,
        "creator":createdBy->userName,
        title,
        floorPrice,
        "allOwners":owners[]->,
        description
      }`
    const collectionData = await sanityClient.fetch(query)
    setCollection(collectionData[0])
    console.log(collectionData)
  }

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  return (
    <div className="overflow-hidden ">
      <Head>
        <title>OpenSea 1.0</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImage
              ? collection.bannerImage
              : 'https://via.placeholder.com/200'
          }
          alt=""
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
            alt=""
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider}></div>
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider}></div>
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider}></div>
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>

        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{' '}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>

        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>Owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img className={style.ethLogo} src="/eth_logo.png" alt="" />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>Floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img className={style.ethLogo} src="/eth_logo.png" alt="" />
                {parseFloat(collection?.volumeTraded / 1000).toFixed(1)}K
              </div>
              <div className={style.statName}>Volume traded</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {nfts.map((nftItem, id) => (
            <NFTCard
              key={id}
              nftItem={nftItem}
              title={collection?.title}
              listings={listings}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
