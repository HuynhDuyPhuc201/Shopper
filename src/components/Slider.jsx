// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import React from 'react';

export const Slider = ({ children, spaceBetween = 50, slidesPerView = 1, breakpoints, speed }) => {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            // navigation
            pagination={{ clickable: true }}
            breakpoints={breakpoints}
            speed={speed}
            style={{ width: '100%' }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
        >
            {React.Children.map(children, (child) => (
                <SwiperSlide>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
};
