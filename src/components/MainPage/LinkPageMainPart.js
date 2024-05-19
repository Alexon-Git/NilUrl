import React, { useEffect, useState } from 'react';
import "../../styles/MainPage/LinkPageMainPart.css";
import Filter from "../LinksPage/Filter";
import LinksMapNew from "../LinksPage/LinksMapNew";
import SortButton from "../LinksPage/SortButton";
import CreateLinkNew from "../Global/CreateLinkNew";
import SortNew from "../LinksPage/SortNew";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import TagsColumn from "../LinksPage/TagsColumn";

const LinkPageMainPart = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user_id;

      fetch(`get_links.php?user_id=${userId}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.length > 0) {
              setLinks(data.map(link => ({
                Data: new Date().toLocaleDateString(), // Замените на фактическое значение даты
                SvgPath: "/test.svg", // Замените на фактический путь к SVG
                pathS: `nilurl.ru/${link.code_url}`,
                pathL: link.base_url,
                UTM: link.utm,
                Android: !!link.android,
                IOS: !!link.ios,
                clicks: link.clicks
              })));
            }
          })
          .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  return (
    <div className="LinkPageMainPart">
      <div className="TopContainer">
        <div className="FakeDivLP"></div>
        <div className="RightTopCont">
          <SortNew />
          <TagsColumn/>
          <CreateLinkNew />
        </div>
      </div>
      <div className="MainContainer">

        <div className="LinksContainer">
          {links.map((link, index) => (
            <LinksMapNew
              key={index}
              Data={link.Data}
              SvgPath={link.SvgPath}
              pathS={link.pathS}
              pathL={link.pathL}
              UTM={false}
              Android={link.Android}
              IOS={link.IOS}
              clicks={link.clicks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkPageMainPart;
