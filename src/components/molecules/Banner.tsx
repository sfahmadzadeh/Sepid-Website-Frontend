// https://swiperjs.com/react

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import 'swiper/css/autoplay';
import { BannerType } from 'types/redux/WebSiteAppearance';
import useWidth from 'utils/UseWidth';
import { Skeleton } from '@mui/material';

type BannerPropsType = {
  banners: BannerType[] | undefined;
}

const Banner: FC<BannerPropsType> = ({ banners }) => {
  const width = useWidth();

  if (!banners) {
    return <Skeleton variant="rounded" width={'100%'} sx={{ height: { xs: 300, sm: 300 } }} />
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <Swiper
      style={{ cursor: 'pointer' }}
      loop={banners.length > 1}
      speed={800}
      spaceBetween={10}
      slidesPerView={1}
      modules={[Virtual, Autoplay]}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      virtual>
      {banners.map((banner, index) => (
        <SwiperSlide key={index} virtualIndex={index} onClick={() => window.location.href = banner.redirect_to}>
          <img src={(width === 'xs' || width === 'sm') ? banner.mobile_image : banner.desktop_image} style={{ width: '100%', borderRadius: 10 }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
