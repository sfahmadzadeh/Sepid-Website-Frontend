import { WidgetType } from 'types/widgets/widget';
import {
    Article,
    Problem,
    Submission,
} from '../models'

export type ArticleType = {
    id: number;
    name?: string;
    description?: string;
    cover_page?: string;
}

export type ArticlesInitialStateType = {
    isFetching: boolean;
    widgets: WidgetType[];
    articles: Article[];
    teams: any; // TODO: fix this! because of teams: {} in another file. but I think it must be Array instead of object
    problems: Problem[];
    submissions: Submission[];
    articlesCount: number;
    article: Article,
}