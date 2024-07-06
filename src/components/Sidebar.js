
import React from "react";
import "../Sidebar.css";
import { Link} from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}> 
            <button className="close-btn" onClick={toggleSidebar}>×</button>
            
            <ul >
                <li>
                    < Link href="#section1" to='/sign'>회원가입
                </Link>
                </li>
                <li>
                    <Link href="#section2" to='/popular'>Popular
                </Link>
                </li>
                <li>
                    <Link href="#section3"to='/now playing'>NowPlaying
                    </Link>
                    </li>
                <li>
                    <Link href="#section4" to='/top rated'>TopRated
                    </Link></li>
                <li>
                    <Link href="#section5" to='/upcoming'>Upcoming
                    </Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
