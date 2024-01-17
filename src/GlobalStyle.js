import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    .list-styled-item .active{
        color: red;
    }
    .list-group-item .list-group-account .active{
        font-weight: 900 !important;
    }
    .swiper-pagination-bullet-active{
        background: red !important;
    }
    body {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
    }
`;
