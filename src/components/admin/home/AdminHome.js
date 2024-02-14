import React, { useEffect } from "react";
import './AdminHome.css';
import { on, select } from "../../../assets/js/main";
import { logoutAction } from "../../../store/reducers/AuthSlice";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminHome = (props) =>{
    useEffect(()=>{
        if (select('.toggle-sidebar-btn')) {
            on('click', '.toggle-sidebar-btn', function(e) {
              select('body').classList.toggle('toggle-sidebar')
            })
        }
        if (select('.search-bar-toggle')) {
            on('click', '.search-bar-toggle', function(e) {
              select('.search-bar').classList.toggle('search-bar-show')
            })
        }


    }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <React.Fragment>

            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                <a href="#" className="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">FKTECH</span>
                </a>
                <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <div className="search-bar">
                <form className="search-form d-flex align-items-center" onSubmit={(e) => {e.preventDefault()}} action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
                </div>

                <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item d-block d-lg-none">
                    <a className="nav-link nav-icon search-bar-toggle " href="#">
                        <i className="bi bi-search"></i>
                    </a>
                    </li>

                    <li className="nav-item dropdown">

                    <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-bell"></i>
                        <span className="badge bg-primary badge-number">4</span>
                    </a>

                    </li>

                    <li className="nav-item dropdown">

                        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                            <i className="bi bi-chat-left-text"></i>
                            <span className="badge bg-success badge-number">3</span>
                        </a>

                    </li>


                    <li className="nav-item pe-3">

                            <a className="dropdown-item d-flex align-items-center" href="#" onClick={(e)=>{
                                dispatch(logoutAction(navigate))
                                }}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Sign Out</span>
                            </a>

                    </li>

                </ul>
                </nav>

            </header>


            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-heading">Pages</li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#">
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                    </a>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to='/admin/category'>
                        <i className="bi bi-file-earmark-person"></i>
                        <span>Portfolio</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#">
                    <i className="bi bi-envelope"></i>
                    <span>Contact</span>
                    </a>
                </li>

                </ul>

            </aside>
            <div id="main" className="main">
                <Outlet/>
            </div>
        </React.Fragment>
    );
}

export default AdminHome;