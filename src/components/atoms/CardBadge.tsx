'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

const Badge = styled(Link)<{ count: number }>`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.cartIconColor};
  font-size: 1.1rem;

  svg {
    width: 24px;
    height: 24px;
  }

  &::after {
    content: "${(props) => props.count}";
    position: absolute;
    top: -8px;
    right: -10px;
    background: ${({ theme }) => theme.cartBadgeBg};
    color: ${({ theme }) => theme.cartBadgeText};
    font-size: 0.75rem;
    border-radius: 999px;
    padding: 2px 6px;
    font-weight: bold;
    display: ${(props) => (props.count > 0 ? 'inline-block' : 'none')};
  }
`;

const CartBadge = () => {
  const { cart } = useCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Badge href="/cart" count={totalCount}>
      <ShoppingCart />
    </Badge>
  );
};

export default CartBadge;
