import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import * as ROUTES from '../../../routes';
import { signOutUser } from '../../../API'

const HeaderStyle = styled("div")`
    color: white;
    .header-content {
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        background-color: #51607b;
        width: 100%;
    }
    .links {
        display: flex;
    }
    .link {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;

        a {
            color: white;
        }
    }
`;

export default ({signedIn}) => (
    <HeaderStyle>
        <div className="header-content">
            <div>
                <b>Contact Manager</b>
            </div>
            <div className="links">
                {
                    signedIn ? (
                        <div className="link">
                            <Link to="/signIn" onClick={signOutUser}>Sign Out</Link>
                        </div>
                    ) : (
                        <>
                            <div className="link">
                                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                            </div>
                            <div className="link">
                                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </HeaderStyle>
)