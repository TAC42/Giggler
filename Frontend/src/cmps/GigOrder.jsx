import clock from "../assets/img/svg/clock.icon.svg"
import refresh from "../assets/img/svg/refresh.icon.svg"
import checkmark from "../assets/img/svg/checkmark.icon.svg"
import arrow from "../assets/img/svg/arrow.icon.svg"

export function GigOrder() {

    function onContinue(){
        console.log('continue!')
    }

  return (
    <section className="gig-order">
      <div className="title">
        <span>Order Details</span>
        <span>US$10000</span>
      </div>
      <p>
        1 custom logo+high resolution file+3d mockup+logo transparency+ 300dpi
      </p>
      <div className="shipping-info">
        <div className="inside-shipping">
          <img src={clock}/>
          <span> 1 Days Delivery</span>
        </div>
        <div className="inside-shipping">
          <img src={refresh}/>
          <span>Unlimited Revisions</span>
        </div>
      </div>
      <ul>
        <li>
          <img src={checkmark}/>
          1 concept included
          </li>
        <li>
          <img src={checkmark}/>
          Logo transparency
          </li>
        <li>
          <img src={checkmark}/>
          Vector file
          </li>
        <li>
          <img src={checkmark}/>
          Printable file</li>
        <li>
          <img src={checkmark}/>
          Include 3D mockup
          </li>
        <li>
          <img src={checkmark}/>
          Include source file
          </li>
        <li>
          <img src={checkmark}/>
          Include social media kit
          </li>
      </ul>
      <div className="continue">
      <button onClick={onContinue}>
        Continue <img src={arrow}/>
      </button>
      </div>
    </section>
  )
}