import styled, { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
    0% { transform: rotate(360deg); }
    100%: { transform: rotate(0deg); }
`;

export const LoaderElement = styled.div`
    border-radius: 50%;
    color: #ffdd2d;
    font-size: 11px;
    text-indent: -99999em;
    margin: 55px auto;
    position: relative;
    width: 10em;
    height: 10em;
    box-shadow: inset 0 0 0 1em;
    transform: translateZ(0);

    &:before {
        position: absolute;
        content: '';
        width: 5.2em;
        height: 10.2em;
        background: #fff;
        border-radius: 10.2em 0 0 10.2em;
        top: -0.1em;
        left: -0.1em;
        transform-origin: 5.1em 5.1em;
        animation-name: ${breatheAnimation};
        animation-delay: 1.5s;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    &:after {
        position: absolute;
        content: '';
        width: 5.2em;
        height: 10.2em;
        background: #fff;
        border-radius: 0 10.2em 10.2em 0;
        top: -0.1em;
        left: 4.9em;
        transform-origin: 0.1em 5.1em;
        animation-name: ${breatheAnimation};
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
`;
