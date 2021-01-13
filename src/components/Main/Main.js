import React from 'react';
import { useSelector } from 'react-redux';

function Main() {
  const { user } = useSelector((state) => state.userData);

  return (
    <section className="bio">
      <img className="avatar" src={user.avatar} alt="avatar"/>
      <div className="info">
        <div className="name info__row">
          {`${user.name} ${user.surname}`}
        </div>
        <div className="client-id info__row">
          {`Client id: ${user.client_id}`}
        </div>
        <div className="birth-date info__row">
          {`Email ${user.email}`}
        </div>
        <div className="email info__row">
          {`Birth date ${user.birth_date}`}
        </div>
        <div className="city info__row">
          {`City ${user.city}`}
        </div>
        <div className="leadManager info__row">
          {`Lead manager ${user.lead_manager.name}`}
        </div>
      </div>
    </section>
  );
}

export default Main;
