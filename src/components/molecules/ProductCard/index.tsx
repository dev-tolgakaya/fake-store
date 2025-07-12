"use client";

import styled from "styled-components";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Button from "../../atoms/Button";
import OptimizedImage from "../../atoms/OptimizedImage";
import { useTranslation } from "next-i18next";

type Props = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
};

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.productCard.border};
  border-radius: 8px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.productCard.background};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.productCard.background};
  border-radius: 8px;
  overflow: hidden;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: -4px;
  left: -8px;
  background-color: ${({ theme }) => theme.productCard.ratingBg};
  padding: 2px 6px;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.productCard.ratingText};
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  z-index: 2;
  opacity: 0.8;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  height: 2.6em;
  line-height: 1.3em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.productCard.title};
`;

const Price = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.productCard.price};
  font-weight: bold;
  margin-top: auto;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export default function ProductCard({
  id,
  title,
  image,
  price,
  rating,
}: Props) {
  const { addToCart } = useCart();
  const { t } = useTranslation("common");

  return (
    <Card>
      <Link href={`/products/${id}`}>
        <ImageWrapper>
          <RatingBadge>⭐ {rating}</RatingBadge>
          <OptimizedImage
            src={image}
            alt={title}
            width={180}
            height={180}
            objectFit="contain"
            borderRadius="0"
            bgColor="inherit" // theme ile uyumlu olacak
          />
        </ImageWrapper>

        <Content>
          <Title>{title}</Title>
          <Price>{price} TL</Price>
        </Content>
      </Link>

      <Button
        variant="primary"
        onClick={() => addToCart({ id, title, price, quantity: 1, image })}
      >
        {t("product.addToCart")}
      </Button>
    </Card>
  );
}
