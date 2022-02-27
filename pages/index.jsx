import { useWeb3 } from '@3rdweb/hooks'
import Head from 'next/head'
import { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { client } from '../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

const Home = () => {
  const { address, connectWallet } = useWeb3()

  const welcomeUser = (username, toastHandler = toast) => {
    toastHandler.success(`Welcome back`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  }

  useEffect(() => {
    if (!address) return //IIFE (Immediately invoked functional expressions)
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)
      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    <div className="overflow-hidden">
      <Head>
        <title>OpenSea 1.0</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className={style.wrapper}>
        {address ? (
          <>
            <Header />
            <Hero />
          </>
        ) : (
          <div className={style.walletConnectWrapper}>
            <button
              className={style.button}
              onClick={() => connectWallet('injected')}
            >
              Connect Wallet
            </button>
            <div className={style.details}>
              You need Chrome to be <br />
              able to run this app
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
