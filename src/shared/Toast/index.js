import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const ToastStyles = styled("span")`
    .Toastify {
        .Toastify__toast-container {
            .Toastify__toast {
                &.Toastify__toast--success {
                }
                &.Toastify__toast--warning {
                
                }
                &.Toastify__toast--error {
                    
                }
                &.Toastify__toast--info {
                    
                }
            }
        }
    }
`;

const ToastContainerStyled = () => (
    <ToastStyles>
        <ToastContainer
            position="bottom-center"
        />
    </ToastStyles>
);

export {
    toast
}
/*
toast.success('text')
toast.warn('text')
toast.error('text')
toast.info('text')
*/
export default ToastContainerStyled;