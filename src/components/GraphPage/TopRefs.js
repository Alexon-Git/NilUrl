import React, { useEffect, useState } from "react";
import axios from 'axios';

const TopRefs = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('https://nilurl.ru:8000/top_links.php', { withCredentials: true });
                setLinks(response.data);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchLinks();
    }, []);

    return (
        <div className="AddressCountryDev">
            <div className="AddHeader" style={{ marginBottom: "30px" }}>
                <div className="FontSizeTextGPDevRefs">
                    <span>Топовые URL-Адреса</span>
                </div>
            </div>
            <div style={{
                height: "290px",
                overflowY: "auto"
                    }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {links.map((link, index) => (
                   <div key={index} style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", padding: "0 15px" }}>
                        <div style={{ display: "flex" }}>
                            <svg style={{ marginRight: "10px" }} width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_421_18)">
                            <path d="M18.7783 3.22801C14.4827 -1.076 7.51733 -1.076 3.22171 3.22801C-1.0739 7.53203 -1.0739 14.511 3.22171 18.815L9.96299 25.5695C10.5361 26.1437 11.4645 26.1437 12.0377 25.5695L18.7783 18.815C23.0746 14.511 23.0746 7.53203 18.7783 3.22801ZM11.0847 20.7206C5.67215 20.7665 1.27475 16.3611 1.32052 10.9373C1.36492 5.67161 5.66054 1.36759 10.916 1.3231C16.3285 1.27724 20.7259 5.68256 20.6802 11.1064C20.6351 16.3721 16.3401 20.6754 11.0847 20.7206Z" fill="#2F2F2F"/>
                            <path d="M15.7704 15.8013C14.8044 16.7691 13.6185 17.3824 12.3731 17.6405C13.128 16.7568 14.1185 15.1435 12.1128 14.396C9.53396 13.4357 13.0897 12.73 13.3056 12.6698C13.8207 12.5267 13.777 12.5411 13.8589 12.5151C14.4533 12.3241 16.1618 11.6348 12.3137 10.7197C7.86503 9.66214 13.0173 8.37806 13.0173 8.37806C13.0173 8.37806 6.35733 9.28431 9.77511 10.4678C12.8943 11.5479 11.3183 11.6841 11.0184 11.6998C10.9706 11.7026 10.9228 11.706 10.8757 11.7108C10.1194 11.782 5.25679 12.3056 7.1368 13.8169C8.47303 14.8916 7.29666 15.5644 6.33069 15.8998C6.29653 15.8676 6.26306 15.8341 6.22959 15.8006C3.5947 13.1605 3.5947 8.88047 6.22959 6.24111C8.86448 3.60107 13.1362 3.60107 15.7704 6.24111C18.406 8.88184 18.406 13.1619 15.7704 15.8013Z" fill="#2F2F2F"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_421_18">
                                <rect width="22" height="26" fill="white"/>
                            </clipPath>
                        </defs>
                            </svg>
                            <span style={{ fontWeight: "400", fontSize: "16px" }}>
                                {link.url}
                            </span>
                        </div>
                        <div style={{ fontWeight: "14px", fontSize: "14px", color: "#7B7979" }}>
                            {link.clicks}
                        </div>
                    </div>
                ))}</div>
            </div>
        </div>
    );
};


export default TopRefs;
