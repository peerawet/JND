/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import sitterlogo from "../picture/sitter-logo.svg";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import axios from "axios";

import { BsFillPersonFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlinePets } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

function Navbar() {
    const navigate = useNavigate();
    const { logout, state, checkToken } = useAuth();

    useEffect(() => {
        checkToken();
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
            `}
        >
            <div
                css={css`
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0px;
                    width: 1140px;
                `}
            >
                <div
                    onClick={() => {
                        navigate("/jnd/web/home");
                        window.location.reload();
                    }}
                    css={css`
                        &:hover {
                            cursor: pointer;
                        }
                    `}
                >
                    <img src={sitterlogo} alt="Sitter Logo" />
                </div>
                <div
                    css={css`
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {state.isAuthenticated ? (
                        <>
                            <button
                                css={css`
                                    width: 40px;
                                    height: 40px;
                                    cursor: pointer;
                                    border-radius: 100%;
                                    object-fit: cover;
                                `}
                                onClick={handleClick}
                            />

                            <div>{state.user?.role}</div>
                            <div>{state.user?.name}</div>
                            <div>{state.user?.email}</div>

                            {state.isAuthenticated && (
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            logout();
                                        }}
                                        css={petSitterMenuItemStyle}
                                    >
                                        <RiLogoutBoxRLine />
                                        Log out
                                    </MenuItem>
                                </Menu>
                            )}
                        </>
                    ) : (
                        <div
                            css={css`
                                &:hover {
                                    cursor: pointer;
                                }
                            `}
                            onClick={() => {
                                navigate("/jnd/web/login");
                            }}
                        >
                            <div>Login</div>
                        </div>
                    )}

                    <div>
                        <Button
                            id="fade-button"
                            aria-controls={open ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={() => {
                                navigate("/jnd/web/home");
                            }}
                            css={css`
                                background-color: #ff7037;
                                font-family: "Satoshi", sans-serif;
                                font-weight: 700;
                                font-size: 16px;
                                text-align: center;
                                color: white;
                                font-size: 12px;
                                padding: 10px; /* Adjust padding for responsiveness */
                                border-radius: 20px; /* Adjust border-radius for responsiveness */
                                transition: background-color 0.3s ease;
                                text-transform: none;

                                &:hover {
                                    color: black;
                                }
                                padding: 12px 24px 12px 24px;
                                border-radius: 99px;
                                border: none;
                                cursor: pointer;
                                margin-left: 20px;
                                gap: 8px;
                            `}
                        >
                            SEE PRODUCT
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const petOwnerMenuItemStyle = css`
    display: flex;
    gap: 10px;
    width: 186px;
    padding-left: 30px;
    font-size: 18px;

    &:hover {
        color: rgb(255, 112, 55);
    }
`;

const petSitterMenuItemStyle = css`
    display: flex;
    gap: 20px;
    width: 230px;
    padding-left: 30px;
    font-size: 18px;

    &:hover {
        color: rgb(255, 112, 55);
    }
`;

export default Navbar;
