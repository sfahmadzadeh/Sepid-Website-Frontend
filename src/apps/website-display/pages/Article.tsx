import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'commons/components/template/Layout';
import isInIframe from 'commons/utils/IsInIframe';
import Paper from 'commons/components/template/Paper';
import { useGetArticleQuery } from 'apps/website-display/redux/features/article/ArticleSlice';

type ArticlePropsType = {}

const Article: FC<ArticlePropsType> = ({ }) => {
  const { articleId } = useParams();
  const { data: article } = useGetArticleQuery({ articleId });

  return (
    <Layout appbarMode={isInIframe() ? 'None' : 'DASHBOARD'}>
      <Stack spacing={2} maxWidth='sm' sx={{ width: '100%', paddingBottom: 2 }}>
        <Typography
          align="center"
          component="h1"
          variant="h3"
          gutterBottom>
          {article?.name}
        </Typography>
        <Paper mode='general' paperId={articleId} />
      </Stack>
    </Layout >
  );
};

export default Article;
