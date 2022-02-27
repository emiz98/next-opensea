import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { route } from 'next/dist/server/router'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../components/Header'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import NFTImage from '../../components/nft/NFTImage'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex items-center `,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState()
  const router = useRouter()

  //Get NFT Module
  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_TOKEN}`
    )
    return sdk.getNFTModule('0xFF7e84eb0A8D2B5f6E0045FA30EFAE9d6f2E92D7')
  }, [provider])

  //Get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)
      setSelectedNft(selectedNftItem)
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

  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  return (
    <div className="overflow-hidden">
      <Head>
        <title>OpenSea 1.0</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={`${style.topContent} flex-col lg:flex-row`}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
