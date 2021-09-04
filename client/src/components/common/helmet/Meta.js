import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const locales = {
  en: 'en_US',
  ko: 'ko_KR'
};

const Meta = ({ data }) => {
  const { categoryLg, categoryMd } = useParams();
  
  // category
  if(data === undefined){
    const description = `크리스피의 블로그 - ${categoryMd}`
    const canonical = `https://crispyblog.kr/${categoryLg}/${categoryMd}`;
    return(
      <Helmet titleTemplate="%s">
        <title>Crispy's Blog - {categoryMd}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
    )
  }   
  
  const lang = locales['en'];
  const title = data.title;
  const description = data.desc && data.desc;
  const image = data.thumbnail !== undefined && `${data.thumbnail}`;
  const canonical = `https://crispyblog.kr/${data.category_lg}/${data.category_md}/${data.id}`;
  const type = data.type === undefined ? 'website' : data.type;
  const width = data.thumbnail && (data.width || 1200);
  const height = data.thumbnail && (data.height || 630);

  // article
  return (
    <Helmet titleTemplate="%s">
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {image && <link rel="image_src" href={image} />}
      {image && <meta itemprop="image" content={image} />}

      <meta property="og:site_name" content="Crispy's Blog" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content={locales[lang]} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {width && <meta property="og:image:width" content={width} />}
      {height && <meta property="og:image:height" content={height} />}
      
      <meta property="fb:pages" content="Crispy's Blog" />
    </Helmet>
  );
};

export default Meta;