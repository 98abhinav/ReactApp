import React, { Fragment } from 'react';
import HomeFlash from './HomeFlash';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Fragment>
      <HomeFlash />
      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">New</span> Use code FIRST to get 15% off up to Rs 100 + Rs 50 Cashback on bus ticket bookings.
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
}
