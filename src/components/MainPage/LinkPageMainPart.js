import React, { useEffect, useState } from 'react';
import "../../styles/MainPage/LinkPageMainPart.css";
import Filter from "../LinksPage/Filter";
import LinksMapNew from "../LinksPage/LinksMapNew";
import SortButton from "../LinksPage/SortButton";
import CreateLinkNew from "../Global/CreateLinkNew";
import SortNew from "../LinksPage/SortNew";
import Cookies from 'js-cookie';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import TagsColumn from "../LinksPage/TagsColumn";

const LinkPageMainPart = () => {
  const [links, setLinks] = useState([]);
  const [userStatus, setUserStatus] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000);

    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user_id;
      fetch(`http://nilurl.ru:8000/get_links.php?user_id=${userId}`)
        .then(response => response.json())
        .then(async data => {
          if (data && data.length > 0) {
            const linksWithSvg = await Promise.all(data.map(async (link, index) => {
              const svgPath = await fetchFavicon(link.base_url);
              return {
                key: index + 1,
                Data: link.date_now,
                SvgPath: svgPath,
                pathS: `nilurl.ru/${link.code_url}`,
                pathL: link.base_url,
                UTM: link.utm,
                Android: !!link.android,
                IOS: !!link.ios,
                clicks: link.clicks,
                svgColor: link.tag_svgcolor,
                backgrounds: link.tag_backgrounds,
                tagValue: link.tag || "Без тэга", 
                timer_flag: link.timer_flag,
                tag_flag: link.tag_flag,
              };
            }));
            setLinks(linksWithSvg);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    return () => clearTimeout(timer);
  }, []);

  const fetchFavicon = async (url) => {
    try {
      const proxyUrl = 'http://nilurl.ru:97/?';
      const targetUrl = new URL(url);
      const baseUrl = targetUrl.origin;
      const response = await axios.get(proxyUrl + targetUrl.href);
      const html = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      let favicon = '/NilLogo.svg'; 

      const iconLink = doc.querySelector('link[rel="icon"]') ||
        doc.querySelector('link[rel="shortcut icon"]') ||
        doc.querySelector('link[rel*="icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon-precomposed"]');
      if (iconLink) {
        favicon = iconLink.href;
      } else {
        const response = await axios.get(proxyUrl + baseUrl + '/favicon.ico');
        if (response.status === 200) {
          favicon = baseUrl + '/favicon.ico';
        } else {
          
        }
      }

      if (favicon && !favicon.startsWith('http')) {
        favicon = baseUrl + favicon;
      } else {
        
      }

      return favicon;
    } catch (error) {
      console.error('Error fetching favicon:', error);
      return '/NilLogo.svg'; 
    }
  };

  useEffect(() => {
  }, [reloadKey]);

  const convertDateFormat = (dateString) => {
    const parts = dateString.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const sortLinks = (option) => {
    let sortedLinks = [...links];
    switch (option) {
      case 0:
        sortedLinks.sort((a, b) => new Date(convertDateFormat(a.Data)) - new Date(convertDateFormat(b.Data)));
        break;
      case 1:
        sortedLinks.sort((a, b) => new Date(convertDateFormat(b.Data)) - new Date(convertDateFormat(a.Data)));
        break;
      case 2:
        sortedLinks.sort((a, b) => a.pathS.localeCompare(b.pathS));
        break;
      case 3:
        sortedLinks.sort((a, b) => b.pathS.localeCompare(a.pathS));
        break;
      default:
        break;
    }
    setLinks(sortedLinks);
    setReloadKey(prevKey => prevKey + 1);
  };

  const highestKey = links.length > 0 ? Math.max(...links.map(link => link.key)) : 0;

  const updateSelectedTags = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.some(t => t.name === tag.name && t.svgColor === tag.svgColor && t.backgrounds === tag.backgrounds)) {
        return prevTags.filter(t => !(t.name === tag.name && t.svgColor === tag.svgColor && t.backgrounds === tag.backgrounds));
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const filteredLinks = links.filter(link => {
    return selectedTags.length === 0 || selectedTags.some(tag => 
      link.tagValue === tag.name && 
      link.svgColor === tag.svgColor && 
      link.backgrounds === tag.backgrounds
    );
  });

  return (
    <div className='lp-background'>
      <div className="LinkPageMainPart">
        <div className="TopContainer">
          <div className="FakeDivLP"></div>
          <div className="RightTopCont">
            <SortNew sortLinks={sortLinks} />
            <TagsColumn updateSelectedTags={updateSelectedTags} links={links} selectedTags={selectedTags} /> 
            <CreateLinkNew userStatus={userStatus} highestKey={highestKey} /> 
          </div>
        </div>
        <div className="MainContainer">
          <div className="LinksContainer">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link, index) => (
                <LinksMapNew
                  key={link.key}
                  Data={link.Data}
                  SvgPath={link.SvgPath}
                  pathS={link.pathS}
                  pathL={link.pathL}
                  UTM={link.UTM}
                  Android={link.Android}
                  IOS={link.IOS}
                  clicks={link.clicks}
                  svgColor={link.svgColor}
                  backgrounds={link.backgrounds}
                  tagValue={link.tagValue}
                  timer_flag={link.timer_flag}
                  tag_flag={link.tag_flag}
                />
              ))
            ) : (
              loading ? (
                <div>Загрузка...</div>
              ) : (
                <div>Ссылки не найдены. Пожалуйста, перезагрузите страницу.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPageMainPart;