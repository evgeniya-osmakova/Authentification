import React from 'react';
import { Link } from 'react-router-dom';
import notFound from './img/404_page_not_found_ 1.svg';
import strip from './img/rect.svg';

function NotFound() {
  return (
    <section className="notFound">
      <div className="notFound__header notFound-header">
        <img className="notFound-header__img" src={strip} alt="strip"/>
        <h2 className="notFound-header__title">Page not found</h2>
      </div>
      <img className="notFound__img" src={notFound} alt="404"/>
      <Link className="notFound__btn button button--blue" to="/">Go to Main page</Link>
    </section>
  );
}

export default NotFound;
