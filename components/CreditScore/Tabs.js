import { useState } from 'react'

const Tabs = ({ title, tab1, tab2, tab1Data, tab2Data }) => {
  const [activeTab, setActiveTab] = useState(tab1)
  return (
    <section className="product-offer totalAccount-section">
      <div className="container account-summary-head">
        <h2>{title}</h2>
      </div>
      <div className="product-wrapper">
        <div className="container head">
          <div className="switch-tab tab">
            <button className={activeTab === tab1 ? 'tablinks active' : 'tablinks'} onClick={() => setActiveTab(tab1)}>
              <span></span>
              <h2>{tab1}</h2>
            </button>
            <button className={activeTab === tab2 ? 'tablinks active' : 'tablinks'} onClick={() => setActiveTab(tab2)}>
              <span></span>
              <h2>{tab2}</h2>
            </button>
            <span className="line"></span>
          </div>
        </div>
        {activeTab === tab1 ? tab1Data : tab2Data}
      </div>
    </section>
  )
}

export default Tabs
