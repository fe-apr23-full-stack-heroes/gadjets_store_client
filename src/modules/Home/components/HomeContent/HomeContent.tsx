import { FC, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeContent.module.scss';
import { Categories } from '../../../../components/Categories/Categories';
import { CardCarousel } from '../../../../components/CardCarousel/CardCarousel';
import { getProducts } from '../../../../api/products';
import { AddModal } from '../../../../components/CategoriesCards/AddModal/AddModal';
import { Product } from '../../../../types/product';
import { Loader } from '../../../../components/Loader/Loader';

export const HomeContent: FC = () => {
  const cn = classNames.bind(styles);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [newProducts, setNewProducts] = useState<Product[]>();
  const locationToProduct = {
    discounted: 'products/discount',
    new: 'products/new',
  };

  const handleModalClose = () => {
    setIsLoggedIn(true);
    window.location.href = '/login';
  };

  const fetchData = useCallback(async () => {
    try {
      const [discountedProductsData, newProductsData] = await Promise.all([
        getProducts(locationToProduct.discounted),
        getProducts(locationToProduct.new),
      ]);

      setDiscountedProducts(discountedProductsData);
      setNewProducts(newProductsData);
    } catch (error) {
      console.log('Error while fetching');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={cn('home')}>
      <div className={cn('homeSliderContainer')}>
        {!newProducts ? (
          <Loader />
        ) : (
          <CardCarousel
            products={newProducts}
            title="New models"
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        )}
      </div>

      <Categories />

      <div className={cn('homeSliderContainer')}>
        {!discountedProducts ? (
          <Loader />
        ) : (
          <CardCarousel
            products={discountedProducts}
            title="Hot prices"
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        )}

        {isLoggedIn && (
          <AddModal
            isLoggedIn={isLoggedIn}
            handleModalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};
