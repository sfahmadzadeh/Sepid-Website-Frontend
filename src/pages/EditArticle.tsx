import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'components/template/Layout';
import EditPaper from '../components/template/Paper/EditPaper';
import { useGetArticleQuery } from 'redux/features/article/ArticleSlice';

const EditArticle = ({ }) => {
	const { articleId } = useParams();
	const { data: article } = useGetArticleQuery({ articleId });

	return (
		<Layout appbarMode='ARTICLE'>
			<Stack spacing={2} maxWidth='md' sx={{ width: '100%', paddingBottom: 2 }}>
				<Typography
					align="center"
					component="h1"
					variant="h3"
					gutterBottom>
					{article?.name}
				</Typography>
				{article &&
					<EditPaper paperId={articleId} />
				}
			</Stack>
		</Layout>
	);
};

export default EditArticle;
