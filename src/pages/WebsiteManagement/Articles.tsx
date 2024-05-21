import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useState, Fragment, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import { addMentorToWorkshopAction } from 'redux/slices/programs';
import AddNewThingButton from 'components/atoms/AddNewThingButton';
import { useGetArticlesQuery } from 'redux/features/ArticleSlice';
import ArticleCard from 'components/organisms/cards/ArticleCard';
import { toast } from 'react-toastify';
import NoDataFound from 'components/molecules/NoDataFound';

type ArticlesTabPropsType = {
}

const ArticlesTab: FC<ArticlesTabPropsType> = ({
}) => {
  const { websiteName } = useParams();
  const [openCreateArticleDialog, setOpenCreateArticleDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetArticlesQuery({ websiteName, pageNumber: 1 });

  const articles = data?.articles || [];
  const count = data?.count || 0;

  return (
    <Fragment>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">

        <Grid item container justifyContent='space-between' xs={12} spacing={2} style={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant='h2'>
              {'مقاله‌ها'}
            </Typography>
          </Grid>
          <Grid item>
            <AddNewThingButton label={'افزودن مقاله جدید'} onClick={() => {
              toast.warn('هنوز آماده نشده! ایشالا به‌زودی می‌زنیمش :)')
              setOpenCreateArticleDialog(true);
            }} />
          </Grid>
        </Grid>

        <Grid container spacing={2}
          alignItems='stretch'
          margin='10px 5px'
          justifyContent="center"
          sx={(theme) => ({
            height: '100%',
            justifyContent: 'start',
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'center',
              marginRight: "0px",
            },
          })}>
          {(!isLoading && articles.length == 0) &&
            <Stack width={'100%'}>
              <NoDataFound variant={1} />
            </Stack>
          }
          {articles?.map((article) => (
            <Grid container item xs={12} sm={6} md={4} key={article.id} alignItems='center' justifyContent='center'>
              <ArticleCard article={article} mode='edit' />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(count / ITEMS_PER_PAGE_NUMBER)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default ArticlesTab;
