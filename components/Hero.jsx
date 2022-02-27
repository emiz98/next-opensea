import React from 'react'

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 p-10 before:bg-[url('/hero.png')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex relative justify-center flex-wrap items-center`,
  copyContainer: `w-full md:w-1/2`,
  title: `tracking-tighter text-[30px] relative text-center lg:text-left text-white md:text-[46px] font-bold lg:tracking-normal`,
  description: `text-md text-center font-semibold text-[#8a939b] container-[400px] lg:text-left lg:text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex justify-center lg:justify-start`,
  accentedButton: `px-5 py-2 relative text-lg font-semibold lg:px-12 lg:py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: `px-5 py-2 relative text-lg font-semibold lg:px-12 lg:py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `my-12 lg:mt-0 rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, collect, and sell extraordinary NFTs
            </div>
            <div className={style.description}>
              OpenSea is the world's first and largest NFT marketplace
            </div>
            <div className={style.ctaContainer}>
              <button className={style.accentedButton}>Explore</button>
              <button className={style.button}>Create</button>
            </div>
          </div>
          <div className={style.cardContainer}>
            <img className="rounded-t-lg" src="/hero.png" alt="" />
            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full object-contain"
                src="/hero_profile.png"
                alt=""
              />
              <div className={style.author}>
                <div className={style.name}>Jolly</div>
                <a className="text-[#1868b7]" href="#">
                  hola-kanola
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
