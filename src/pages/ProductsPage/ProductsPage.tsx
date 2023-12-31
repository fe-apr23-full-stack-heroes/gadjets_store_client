import styles from './ProductsPage.module.scss';
import { FC, useEffect } from 'react';
import { fetchProducts } from '../../actions/productsActions';
import { RootState } from '../../store';
import { Cards } from '../../components/CategoriesCards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useQueryParamUpdater } from '../../hooks/useQueryParamUpdater';
import { SortBy } from '../../components/CategoriesCards/components/SortBy';
import { ShowByPage } from '../../components/CategoriesCards/components/showByPage';
import { SortOrder } from '../../components/CategoriesCards/components/sortOrder';

interface Props {
  endpoint: string;
  title: string;
}

export const ProductsPage: FC<Props> = ({ endpoint, title }) => {
  const cn = classNames.bind(styles);
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const paramUpdater = useQueryParamUpdater();
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const itemsPerPage = +(searchParams.get('limit') || 12);
  const page = +(searchParams.get('page') || 1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get('page')) {
      paramUpdater('page', '1', { replace: true });
    }

    if (search) {
      dispatch(fetchProducts(`${endpoint}${search}`));
    }
  }, [search]);

  const handlePageChange = (pageNumber: number) => {
    paramUpdater('page', pageNumber.toString());
  };

  return (
    <div className={cn('page__container')}>
      <h1 className={cn('titleH1', 'title', 'ProductsPageTitle')}>{title}</h1>

      <h2 className={cn('CardsAmmount')}>Amount: {products.count}</h2>

      <div className={cn('CardsSelects')}>
        <SortBy className={cn('CardsSelectsItem')} />
        <ShowByPage className={cn('CardsSelectsItem')} />
        <SortOrder className={cn('CardsSelectsItem')} />
      </div>

      <Cards products={products.rows} isLoading={isLoading} />

      <Pagination
        phonesCount={products.count}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
