import React from "react";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TelegramSVG from 'commons/components/atoms/socialMediaSVGs/TelegramSVG';
import SvgIcon from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import EitaaSVG from "commons/components/atoms/socialMediaSVGs/EitaaSVG";
import BaleSVG from "commons/components/atoms/socialMediaSVGs/BaleSVG";
import ShadSVG from "commons/components/atoms/socialMediaSVGs/ShadSVG";
import InstagramSVG from "commons/components/atoms/socialMediaSVGs/InstagramSVG";
import { toPersianNumber } from "commons/utils/translateNumber";

type ProgramContactInfoType = any;

type ProgramContactInfoPropsType = {
  programContactInfo: ProgramContactInfoType
}

const ProgramContactInfo: FC<ProgramContactInfoPropsType> = ({
  programContactInfo,
}) => {

  if (!programContactInfo) {
    return null;
  }

  const {
    bale_link,
    eitaa_link,
    instagram_link,
    phone_number,
    shad_link,
    telegram_link,
  } = programContactInfo;

  if (!bale_link && !eitaa_link && !instagram_link && !phone_number && !shad_link && !telegram_link) {
    return null;
  }

  const socialMedias = [
    {
      icon: EitaaSVG,
      href: programContactInfo.eitaa_link,
    },
    {
      icon: BaleSVG,
      href: programContactInfo.bale_link,
    },
    {
      icon: TelegramSVG,
      href: programContactInfo.telegram_link,
    },
    {
      icon: ShadSVG,
      href: programContactInfo.shad_link,
    },
    {
      icon: InstagramSVG,
      href: programContactInfo.instagram_link,
    },
  ]

  return (
    <Stack alignItems={'center'} spacing={3}>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-evenly'} alignContent={'space-between'}>
        {socialMedias.filter(socialMedia => socialMedia.href).map((socialMedia, index) =>
          <IconButton key={index} href={socialMedia.href} sx={{
            padding: 0,
            transition: 'transform 0.1s ease-in-out',
            ":hover": {
              transform: 'translateY(-0.1rem) scale(1.05)',
            }
          }}>
            <SvgIcon sx={{ fontSize: 30 }}>
              {socialMedia.icon}
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      {programContactInfo.phone_number &&
        <Stack>
          <Typography fontSize={15} textAlign={'center'}>
            {'شماره پشتیبانی:'}
          </Typography>
          <Typography fontSize={20}>
            {toPersianNumber(programContactInfo.phone_number)}
          </Typography>
        </Stack>
      }
    </Stack>
  )
}

export default ProgramContactInfo;