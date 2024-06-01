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
              setLinks(data.map((link, index) => ({
                key: index + 1, // Assign a key value starting from 1
                Data: link.date_now,
                SvgPath: "/test.svg",
                pathS: `nilurl.ru/${link.code_url}`,
                pathL: link.base_url,
                UTM: link.utm,
                Android: !!link.android,
                IOS: !!link.ios,
                clicks: link.clicks,
                svgColor: link.tag_svgcolor,
                backgrounds: link.tag_backgrounds,
                tagValue: link.tag,
                timer_flag: link.timer_flag,
                tag_flag: link.tag_flag,
              })));
            }
          })
          .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  // Find the highest key value
  const highestKey = links.length > 0 ? Math.max(...links.map(link => link.key)) : 0;

  return (
    <div className="LinkPageMainPart">
      <div className="TopContainer">
        <div className="FakeDivLP"></div>
        <div className="RightTopCont">
          <SortNew />
          <TagsColumn/>
          <CreateLinkNew highestKey={highestKey} /> {/* Pass highestKey as a prop */}
        </div>
      </div>
      <div className="MainContainer">
        <div className="LinksContainer">
          {links.map((link, index) => (
            <LinksMapNew
              key={link.key} // Use the assigned key
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
          ))}
          <LinksMapNew
              key={0}
              Data={"28.05.2024"}
              SvgPath={"link.SvgPath"}
              pathS={"link.pathS"}
              pathL={"Тестовая Ссылка Для Всех Данных"}
              UTM={true}
              Android={true}
              IOS={true}
              clicks={5}
              svgColor={"#63BD43"}
              backgrounds={"rgba(100, 235, 240, 1)"}
              tagValue={"тэг"}
              timer_flag={1}
              tag_flag={1}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkPageMainPart;
