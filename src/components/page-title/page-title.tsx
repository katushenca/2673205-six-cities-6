import {matchPath, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import React from 'react';
import {PageTitles} from '../../const.ts';

type PageTitleProps = {
  children: JSX.Element;
}
const pageTitle = 'Шесть городов. ';

function PageTitle({children}: PageTitleProps) : JSX.Element {
  const location = useLocation().pathname;
  const [title, setTitle] = useState('');
  React.useEffect(() => {
    const foundTitle = PageTitles.find((page) => matchPath(page.location, location));
    setTitle(pageTitle + (foundTitle ? foundTitle.title : 'Неизвестная страница'));
  }, [location]);
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default PageTitle;
