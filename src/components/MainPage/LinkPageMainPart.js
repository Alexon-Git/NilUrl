import React, { useEffect, useState } from "react";
import "../../styles/MainPage/LinkPageMainPart.css";
import Filter from "../LinksPage/Filter";
import LinksMapNew from "../LinksPage/LinksMapNew";
import SortButton from "../LinksPage/SortButton";
import CreateLinkNew from "../Global/CreateLinkNew";
import SortNew from "../LinksPage/SortNew";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import TagsColumn from "../LinksPage/TagsColumn";
import { LinksNotFound } from "..";

const ITEMS_PER_PAGE = 25;

const LinkPageMainPart = () => {
  const [links, setLinks] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [availableLinks, setAvailableLinks] = useState(null);

  useEffect(() => {
    const fetchAvailableLinks = async () => {
      try {
        const response = await fetch('https://nilurl.ru:8000/get_available_links.php', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setAvailableLinks(data.available_links);
        } else {
          console.error('Error fetching available links:', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchAvailableLinks();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    fetch("https://nilurl.ru:8000/get_links.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data && data.length > 0) {
          const linksWithSvg = await Promise.all(
            data.map(async (link, index) => {
              const svgPath = await fetchFavicon(link.base_url);
              return {
                key: index + 1,
                Data: link.date_now,
                SvgPath: svgPath,
                pathS: `nilurl.ru/${link.code_url}`,
                pathL: link.base_url,
                UTM: link.utm,
                commentary: link.commentary,
                Android: !!link.android,
                IOS: !!link.ios,
                clicks: link.clicks,
                svgColor: link.tag_svgcolor,
                backgrounds: link.tag_backgrounds,
                tagValue: link.tag || "Без тэга",
                timer_flag: link.timer_flag,
                tag_flag: link.tag_flag,
              };
            })
          );
          setLinks(linksWithSvg);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => clearTimeout(timer);
  }, []);
  
  const fetchFavicon = async (url) => {
    try {
      const proxyUrl = "https://nilurl.ru:81/?";
      const targetUrl = new URL(url);
      const baseUrl = targetUrl.origin;
      const response = await axios.get(proxyUrl + targetUrl.href);
      const html = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      let favicon = "/NilLogo.svg";

      const iconLink =
        doc.querySelector('link[rel="icon"]') ||
        doc.querySelector('link[rel="shortcut icon"]') ||
        doc.querySelector('link[rel*="icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon-precomposed"]');
      if (iconLink) {
        favicon = iconLink.href;
      } else {
        const response = await axios.get(proxyUrl + baseUrl + "/favicon.ico");
        if (response.status === 200) {
          favicon = baseUrl + "/favicon.ico";
        }
      }

      if (favicon && !favicon.startsWith("http")) {
        favicon = baseUrl + favicon;
      }

      return favicon;
    } catch (error) {
      console.error("Error fetching favicon:", error);
      return "/NilLogo.svg";
    }
  };

  const convertDateFormat = (dateString) => {
    const parts = dateString.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const sortLinks = (option) => {
    let sortedLinks = [...links];
    switch (option) {
      case 0:
        sortedLinks.sort(
          (a, b) =>
            new Date(convertDateFormat(a.Data)) -
            new Date(convertDateFormat(b.Data))
        );
        break;
      case 1:
        sortedLinks.sort(
          (a, b) =>
            new Date(convertDateFormat(b.Data)) -
            new Date(convertDateFormat(a.Data))
        );
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
    setReloadKey((prevKey) => prevKey + 1);
  };

  const highestKey =
    links.length > 0 ? Math.max(...links.map((link) => link.key)) : 0;
  const updateSelectedTags = (tag) => {
    setSelectedTags((prevTags) => {
      if (
        prevTags.some(
          (t) =>
            t.name === tag.name &&
            t.svgColor === tag.svgColor &&
            t.backgrounds === tag.backgrounds
        )
      ) {
        return prevTags.filter(
          (t) =>
            !(
              t.name === tag.name &&
              t.svgColor === tag.svgColor &&
              t.backgrounds === tag.backgrounds
            )
        );
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLinks = links.filter((link) => {
    const matchesSearchQuery =
      link.pathL.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.pathS.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.commentary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(
        (tag) =>
          link.tagValue === tag.name &&
          link.svgColor === tag.svgColor &&
          link.backgrounds === tag.backgrounds
      );

    return matchesSearchQuery && matchesTags;
  });

  const totalPages = Math.ceil(filteredLinks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const linksToDisplay = filteredLinks.slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="lp-background">
      <div className="LinkPageMainPart wrapper">
        <div className="TopContainer">
          <div className="buttons-container">
            <div className="page-links__title">Ссылки</div>
            <div className="RightTopCont">
              <div className="search-container">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="search-icon"
                >
                  <path
                    d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              <SortNew sortLinks={sortLinks} />
              <TagsColumn
                updateSelectedTags={updateSelectedTags}
                links={links}
                selectedTags={selectedTags}
              />
              <CreateLinkNew availableLinks ={availableLinks} highestKey={highestKey} />
              
            </div>
          </div>
        </div>
        <div className="LinksContainer">
          {linksToDisplay.length > 0 ? (
            linksToDisplay.map((link, index) => (
              <LinksMapNew
                key={link.key}
                Data={link.Data}
                SvgPath={link.SvgPath}
                pathS={link.pathS}
                pathL={link.pathL}
                UTM={link.UTM}
                Android={link.Android}
                commentary={link.commentary}
                IOS={link.IOS}
                clicks={link.clicks}
                svgColor={link.svgColor}
                backgrounds={link.backgrounds}
                tagValue={link.tagValue}
                timer_flag={link.timer_flag}
                tag_flag={link.tag_flag}
              />
            ))
          ) : loading ? (
            <div className="links-not-found-loading">
              <p> Загрузка...</p>
              <div className="loading-ring"></div>
            </div>
          ) : (
            <div className="links-not-found">
              <p> Ссылок не найдено</p>
              <img src={LinksNotFound} alt="" />
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <span>
              Страница {currentPage} из {totalPages}
            </span>
            <div className="pagination-btns">
              <button
                className="pagination-button"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Предыдущая
              </button>
              <button
                className="pagination-button"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Следующая
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkPageMainPart;