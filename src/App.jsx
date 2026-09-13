import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CalendarDays, ChevronDown, Clock3, Fuel, Mail, MapPin, Menu, Phone, Send, Settings2, ShieldCheck, UserRound, UsersRound, X } from 'lucide-react'
import innova from './assets/innova.png'
import swift from './assets/Swift.png'
import ciaz from './assets/Ciaz.png'
import etios from './assets/Etios.png'
import './App.css'

const fleet = [
  { name: 'Innova Crysta', image: innova, description: 'Spacious. Powerful. Perfect for Every Journey.', detail: 'The Toyota Innova Crysta offers unmatched comfort, ample space and a smooth ride, making it ideal for corporate travel, family trips and outstation journeys.', seats: '7 + 1', luggage: '4–5', fuel: 'Diesel', transmission: 'Automatic / Manual' },
  { name: 'Swift Dzire', image: swift, description: 'Smart, efficient, and ready for the city.', detail: 'A refined compact sedan for airport transfers, quick meetings, and comfortable everyday city travel.', seats: '4 + 1', luggage: '2–3', fuel: 'Petrol', transmission: 'Manual / Automatic' },
  { name: 'Ciaz', image: ciaz, description: 'Executive comfort with effortless style.', detail: 'A quiet, comfortable sedan for business commutes, guest pickups and elegant journeys around town.', seats: '4 + 1', luggage: '3–4', fuel: 'Petrol', transmission: 'Manual' },
  { name: 'Etios', image: etios, description: 'Dependable travel, made simple.', detail: 'A dependable choice for practical travel with generous space and the care of a professional driver.', seats: '4 + 1', luggage: '3–4', fuel: 'Diesel', transmission: 'Manual' },
]

const services = ['24-hour Fleet Services in Bangalore', 'Airport Transfers', 'Local City Cabs (4 Hour / 8 Hour Packages)', 'Outstation Travel']
const clients = ['PWC', 'Manipal Technologies Ltd', 'Verint CES India', 'Hardcastle Restaurant Pvt Ltd', 'Indium Capital Advisors Pvt Ltd', 'Measurement Solutions Pvt Ltd', 'Hungama Digital Media Pvt Ltd', 'Qlik.com', 'Usha Martin Ltd', 'BALCO', 'Vialto Partners', 'Hindustan Zinc', 'Center for Creative Leadership']
const goals = ['Efficient routing and scheduling.', 'Comprehensive pick-up and drop facilities.', 'SOS assistance and standby vehicle services for breakdowns.', 'Ongoing security checks on drivers and vehicles.', '24-hour dedicated support staff.', 'Transportation solutions tailored for business travelers.', 'Rigorous chauffeur selection involving security checks and police verification.']
const leaders = [
  { name: 'Mr. Gokul Palimar', role: 'Proprietor' },
  { name: 'Mr. Shivaprasad Rao', role: 'Operations Head' },
  { name: 'Mr. Dinesh Kumar', role: 'Operations Manager' },
  { name: 'Mr. Vinod Gowda', role: 'Operations Manager' },
  { name: 'Mr. Nikhil Poojary', role: 'Operations Executive' },
]

function Spec({ icon, value, label }) {
  return <div className="spec"><span className="spec-icon">{icon}</span><strong>{value}</strong><small>{label}</small></div>
}

function App() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingStatus, setBookingStatus] = useState('idle')
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', pickup: '', drop: '' })
  const car = fleet[active]
  const move = (direction) => setActive((active + direction + fleet.length) % fleet.length)
  const openBooking = () => { setBookingStatus('idle'); setBookingOpen(true) }
  const bookingReturnUrl = window.location.origin + window.location.pathname + '?booking=sent'
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('booking') === 'sent') {
      setBookingStatus('success')
      setBookingOpen(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  return (
    <main className="site-shell">
      <section className="hero-section" id="home">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        <header className="navbar">
          <a className="brand" href="#home" aria-label="Adithya Travels home"><span className="brand-mark">at<span className="brand-car">▰</span></span><span className="brand-name">ADITHYA TRAVELS</span><span className="brand-tagline">On-time · Genuine · Safe Drive</span></a>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            {['Home', 'Our Fleet', 'Services', 'About Us', 'Contact'].map((item) => <a className={item === 'Home' ? 'active' : ''} href={`#${item.toLowerCase().replace(' ', '-')}`} key={item} onClick={(event) => { setMenuOpen(false); if (item === 'Contact') { event.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) } }}>{item}</a>)}
          </nav>
          <button className="book-top" type="button" onClick={openBooking}><Phone size={17} fill="currentColor" /> Book a Ride</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </header>
        <div className="hero-copy"><p className="eyebrow">PREMIUM CAR RENTAL SERVICES</p><h1>Travel<br />Your Way</h1><p className="subtitle">Comfortable. Reliable. Always On Time.</p><span className="gold-line" /><p className="trust-note">TRUSTED<br />FOR A SMOOTHER<br />TOMORROW</p></div>
        <div className="vehicle-stage"><div className="stage-glow" /><img className={`hero-car car-${active}`} src={car.image} alt={car.name} /></div>
        <aside className="benefits"><div><ShieldCheck /><span>Safe<br />Journeys</span></div><div><Clock3 /><span>On-time<br />Service</span></div><div><UsersRound /><span>Professional<br />Drivers</span></div></aside>
        <button className="round-arrow previous" onClick={() => move(-1)} aria-label="Previous vehicle"><ArrowLeft /></button><button className="round-arrow next" onClick={() => move(1)} aria-label="Next vehicle"><ArrowRight /></button>
        <div className="fleet-tabs" id="our-fleet">{fleet.map((item, index) => <button key={item.name} onClick={() => setActive(index)} className={active === index ? 'fleet-tab selected' : 'fleet-tab'}><img src={item.image} alt="" /><span>{item.name}</span></button>)}</div>
      </section>
      <section className="vehicle-details" aria-live="polite">
        <div className="vehicle-summary"><h2>{car.name}</h2><p className="lead">{car.description}</p><p>{car.detail}</p></div>
        <div className="spec-grid"><Spec icon={<UsersRound />} value={car.seats} label="Seating Capacity" /><Spec icon={<BriefcaseBusiness />} value={car.luggage} label="Luggage Capacity" /><Spec icon={<Fuel />} value={car.fuel} label="Fuel Type" /><Spec icon={<Settings2 />} value={car.transmission} label="Transmission" /></div>
        <div className="details-action" id="booking"><button type="button" onClick={openBooking} className="book-car"><CalendarDays size={17} /> Book This Car <ArrowRight size={18} /></button><a href="#services" className="more-details">View More Details <ChevronDown size={17} /></a></div>
      </section>
      <section className="profile-section" id="about-us">
        <div className="section-heading"><span>ABOUT ADITHYA TRAVELS</span><h2>Reliable journeys, shaped around you.</h2></div>
        <div className="overview-grid">
          <div className="overview-copy">
            <p className="intro">Adithya Travels has been a trusted provider of car rental services since 2003, delivering timely, genuine and safe drives throughout Karnataka.</p>
            <p>Our experienced team is committed to exceeding client expectations with personalized service tailored to individual needs. We serve corporate and individual bookings, with dedicated 24/7 support for exceptional service delivery.</p>
          </div>
          <dl className="company-facts" id="contact">
            <div><dt>Proprietor</dt><dd>Mr. Gokul Palimar</dd></div>
            <div><dt>Location</dt><dd>#309, 1st Floor, 7th Cross, Old Airport Road, Domlur Layout, Bangalore - 560071</dd></div>
            <div><dt>Contact</dt><dd><a href="tel:+919880733379">98807 33379</a> / <a href="tel:+919845354704">98453 54704</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:info@adithyatravels.net">info@adithyatravels.net</a></dd></div>
          </dl>
        </div>
      </section>

      <section className="promise-section" id="services">
        <div className="section-heading light"><span>OUR STANDARD OF CARE</span><h2>Thoughtful service at every mile.</h2></div>
        <div className="promise-grid">
          <InfoCard title="Professional team" text="Our staff are trained in customer-friendly communication and are responsible and responsive." />
          <InfoCard title="Professional chauffeurs" text="Well-mannered, reliable and formally dressed drivers, equipped with mobile phones for flexibility." />
          <InfoCard title="Technology & safety" text="Every driver uses the Indecab mobile application for precise service. GPS tracking is installed in all vehicles, and every vehicle carries a fire extinguisher and first aid kit." />
          <InfoCard title="Quality commitment" text="Well-maintained air-conditioned cars include complimentary water, newspapers and sanitizers. Each driver uses an Android phone to confirm pick-up and drop locations." />
        </div>
        <p className="philosophy">“Customer Oriented Cost Effective Provision.”</p>
      </section>

      <section className="content-section">
        <div className="content-column"><div className="section-heading compact"><span>SERVICES OFFERED</span><h2>Travel solutions for every need.</h2></div><ul className="gold-list">{services.map((service) => <li key={service}>{service}</li>)}</ul></div>
        <div className="content-column"><div className="section-heading compact"><span>OUR GOALS</span><h2>Service you can count on.</h2></div><ul className="check-list">{goals.map((goal) => <li key={goal}>{goal}</li>)}</ul></div>
      </section>

      <section className="clients-section">
        <div className="section-heading"><span>CLIENTELE</span><h2>Proud to serve leading businesses.</h2></div>
        <div className="client-list">{clients.map((client) => <span key={client}>{client}</span>)}</div>
      </section>

      <section className="team-section">
        <div className="section-heading"><span>ORGANIZATIONAL STRUCTURE</span><h2>People behind every safe journey.</h2></div>
        <div className="team-flow">
          <TeamMember leader={leaders[0]} />
          <span className="flow-line" />
          <TeamMember leader={leaders[1]} />
          <span className="flow-line" />
          <div className="team-row">{leaders.slice(2).map((leader) => <TeamMember leader={leader} key={leader.name} />)}</div>
          <span className="flow-line" />
          <div className="team-tier">Working Staff</div><span className="flow-line" /><div className="team-tier">Drivers Team</div>
        </div>
      </section>

      <section className="vision-section"><div><span>VISION</span><p>To make our clients the happiest by fulfilling their travel needs.</p></div><div><span>MISSION</span><p>To prioritize customer satisfaction through excellent quality service.</p></div></section>
      {bookingOpen && <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-backdrop" type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking form" />
        <div className="booking-panel">
          <button className="close-modal" type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X /></button>
          {bookingStatus === 'success' ? <div className="booking-success"><div className="success-icon"><Send /></div><p className="eyebrow">REQUEST RECEIVED</p><h2>Thank you, {booking.name}.</h2><p>We have emailed your booking acknowledgement and will contact you within <strong>3 hours</strong> to confirm your journey.</p><button type="button" className="book-car" onClick={() => setBookingOpen(false)}>Done</button></div> : <><p className="eyebrow">BOOK YOUR JOURNEY</p><h2 id="booking-title">Reserve your {car.name}</h2><p className="booking-note">Share your journey details and our team will confirm availability within 3 hours.</p>
          <form action="https://formsubmit.co/info@adithyatravels.net" method="POST" className="booking-form">
            <input type="hidden" name="_subject" value={`New booking request: ${car.name}`} /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_next" value={bookingReturnUrl} /><input type="hidden" name="_autoresponse" value="Thank you for reaching out to Adithya Travels. We have received your booking request and will contact you within 3 hours to confirm your journey." /><input type="hidden" name="vehicle" value={car.name} />
            <label><UserRound /><span>Full name</span><input required name="name" value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="Your name" /></label>
            <label><Mail /><span>Email address</span><input required name="email" type="email" value={booking.email} onChange={(event) => setBooking({ ...booking, email: event.target.value })} placeholder="you@example.com" /></label>
            <label><Phone /><span>Phone number</span><input required name="phone" type="tel" value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} placeholder="+91 00000 00000" /></label>
            <label><MapPin /><span>Pickup address</span><input required name="pickup_address" value={booking.pickup} onChange={(event) => setBooking({ ...booking, pickup: event.target.value })} placeholder="Pickup location" /></label>
            <label><MapPin /><span>Drop location</span><input required name="drop_location" value={booking.drop} onChange={(event) => setBooking({ ...booking, drop: event.target.value })} placeholder="Drop location" /></label>
            <button className="book-car submit-booking" type="submit">Request booking <ArrowRight size={18} /></button>
          </form></>}
        </div>
      </div>}
      <footer><div><strong>ADITHYA TRAVELS</strong><span>Car Rental Services&nbsp; | &nbsp;Corporate & Individual Bookings</span></div><div><span>Bangalore</span><i /> <span>Since 2003</span></div></footer>
    </main>
  )
}
function InfoCard({ title, text }) { return <article className="info-card"><h3>{title}</h3><p>{text}</p></article> }
function TeamMember({ leader }) { return <div className="team-member"><strong>{leader.name}</strong><small>{leader.role}</small></div> }
export default App
