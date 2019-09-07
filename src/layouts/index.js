import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';

const LayoutStyle = styled("span")`
    
`;

export default ({signedIn, children}) => (
    <LayoutStyle>
        <Header signedIn={signedIn} />
        <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            {children}
        </div>
    </LayoutStyle>
)