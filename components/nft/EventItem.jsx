import React from 'react'
import { BsFillCartFill } from 'react-icons/bs'

const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl`,
  eventName: `hidden lg:flex text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `mr h-5 lg:mr-2`,
  accent: `text-[#2081e2]`,
}

const EventItem = ({ event }) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          <BsFillCartFill />
        </div>
        <div className={style.eventName}>Sale</div>
      </div>

      <div className={`${style.eventPrice} flex-[2]`}>
        <img className={style.ethLogo} src="/eth_logo.png" alt="" />
        <div className={style.eventPriceValue}>{event.price}</div>
      </div>

      <div className={`${style.accent} hidden flex-[3] lg:inline-flex`}>
        {event.from}
      </div>
      <div className={`${style.accent} hidden flex-[3] lg:inline-flex`}>
        {event.to}
      </div>
      <div className={`${style.accent} flex-[3]`}>{event.date}</div>
    </div>
  )
}

export default EventItem
