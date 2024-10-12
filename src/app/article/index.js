import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../containers/comments';
import useSelector from '../../hooks/use-selector';
import SectionLayout from '../../components/section-layout';
import listToTree from '../../utils/list-to-tree';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      waitingComments: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectSession = state => ({
    exists: state.session.exists,
    currentUserId: state.session.user?._id,
    currentUserName: state.session.user?.username,
  });
  const { exists, currentUserId, currentUserName } = useSelector(selectSession, shallowequal);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onAddComment: useCallback(
      (text, parentId) => {
        const commentData = {
          text,
          parent: {
            _id: parentId || params.id,
            _type: parentId ? 'comment' : 'article',
          },
        };
        dispatch(commentsActions.create(commentData));
      },
      [dispatch, params.id],
    ),
  };

  const commentsTree = listToTree(select.comments);
  const commentsToRender = commentsTree.length > 0 ? commentsTree[0].children : [];

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.waitingComments}>
        <SectionLayout commentsCount={select.comments.length}>
          <Comments
            comments={commentsToRender}
            onAddComment={callbacks.onAddComment}
            isAuthenticated={exists}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
          />
        </SectionLayout>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
