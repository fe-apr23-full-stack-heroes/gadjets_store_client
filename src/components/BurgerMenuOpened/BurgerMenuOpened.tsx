import { FC } from 'react';
import like from '../../assets/icons/Heart.svg';
import cart from '../../assets/icons/Cart.svg';
import orders from '../../assets/icons/Orders.svg';
import styles from './BurgerMenuOpened.module.scss';
import { Link } from 'react-router-dom';
import { NavigationLink } from '../NavigationLink';
import classNames from 'classnames/bind';
import { HeaderCounter } from '../HeaderCounter/HeaderCounter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../types/product';

const cn = classNames.bind(styles);

interface BurgerMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const BurgerMenuOpened: FC<BurgerMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const products = useSelector(
    (state: RootState) => state.cart.cartItems as Product[],
  );

  const countCartItems: number = products.reduce((totalQuantity, product) => {
    return totalQuantity + (product.quantity || 0);
  }, 0);

  const likedProducts = useSelector(
    (state: RootState) => state.favorites.favoriteItems as Product[],
  );

  return (
    <div className={cn('burger', { burger_opened: isMenuOpen })}>
      <div className={cn('burger__links')}>
        <nav className={cn('burger__nav')}>
          <NavigationLink to="/" linkText="Home" onClick={handleMenuClose} />
          <NavigationLink
            to="/phones"
            linkText="Phones"
            onClick={handleMenuClose}
          />
          <NavigationLink
            to="/tablets"
            linkText="Tablets"
            onClick={handleMenuClose}
          />
          <NavigationLink
            to="/accessories"
            linkText="Accessories"
            onClick={handleMenuClose}
          />
        </nav>
      </div>

      <div className={cn('burger__service')}>
        <Link
          to="/orders"
          className={cn('service__button', 'service__orders', {
            'service__button-active': isMenuOpen,
          })}
          onClick={handleMenuClose}>
          <img
            src={orders}
            alt="orders button"
            className={cn('service_btn_img')}
          />
        </Link>

        <Link
          to="/favourites"
          className={cn('service__button', 'service__like', {
            'service__button-active': isMenuOpen,
          })}
          onClick={handleMenuClose}>
          <div className={cn('imageContainer')}>
            <img src={like} alt="like button" className={cn('like')} />
            <HeaderCounter productsCount={likedProducts.length} />
          </div>
        </Link>

        <Link
          to="/cart"
          className={cn('service__button', 'service__cart', {
            'service__button-active': isMenuOpen,
          })}
          onClick={handleMenuClose}>
          <div className={cn('imageContainer')}>
            <img src={cart} alt="cart button" className={cn('cart')} />
            <HeaderCounter productsCount={countCartItems} />
          </div>
        </Link>
      </div>
    </div>
  );
};
