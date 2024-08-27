import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';
import { ArticleType } from 'commons/types/redux/article';

type ArticleCardPropsType = {
  article: Partial<ArticleType>
  mode: 'view' | 'edit';
}

const ArticleCard: FC<ArticleCardPropsType> = ({
  article,
  mode,
}) => {
  const t = useTranslate();

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
    }}>
      <Box>
        <CardMedia
          sx={{ height: 200 }}
          image={article.cover_page ? article.cover_page : `${process.env.PUBLIC_URL}/logo.png`}
          title={article.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <ButtonGroup fullWidth >
          {mode === 'edit' &&
            <Button
              component={Link}
              to={`/edit-article/${article.id}/`}>
              {'ویرایش'}
            </Button>
          }
          <Button
            variant="contained"
            component={Link}
            to={`/article/${article.id}/`}>
            {'مشاهده'}
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
