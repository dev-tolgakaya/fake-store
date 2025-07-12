"use client";

import { useRouter } from "next/router";
import styled from "styled-components";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import OptimizedImage from "@/components/atoms/OptimizedImage";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArrowLeft } from "lucide-react";

const Container = styled.div`
  max-width: 900px;
  margin: 6rem auto 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.background.primary};
  border: 2px solid ${({ theme }) => theme.productCard.border};
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  @media (max-width: 640px) {
    margin: 4rem 1rem 2rem 1rem;
    padding: 1.25rem;
  }
`;

const CartTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const CartItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.productCard.border};
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 8px;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

const Info = styled.div`
  flex: 1;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Title = styled.h4`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.productCard.title};
`;

const Quantity = styled.p`
  font-size: 0.95rem;
  margin: 0.25rem 0;
  color: ${({ theme }) => theme.productCard.title};
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.productCard.price};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 640px) {
    width: 100%;
    align-items: center;
  }
`;

const Total = styled.h3`
  text-align: right;
  font-size: 1.25rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.text};
`;

const EmptyText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.secondaryText};
`;

export default function CartPage() {
  const { t } = useTranslation("common");
  const { cart, removeFromCart, clearCart, isHydrated } = useCart();
  const router = useRouter();

  if (!isHydrated) return null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Head>
        <title>{t("cart.title")} | FakeStore</title>
        <meta name="description" content={t("cart.description")} />
      </Head>
      <Container>
        <Button variant="tertiary" onClick={() => router.push("/products")}>
          <ArrowLeft size={18} style={{ marginRight: 8 }} />
          {t("cart.backToProducts")}
        </Button>

        <CartTitle>{t("cart.title")}</CartTitle>

        {cart.length === 0 ? (
          <EmptyText>{t("cart.empty")}</EmptyText>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <Link href={`/products/${item.id}`}>
                  <ImageWrapper>
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      objectFit="contain"
                      borderRadius="8px"
                      bgColor="#f9f9f9"
                    />
                  </ImageWrapper>
                </Link>
                <Info>
                  <Title>{item.title}</Title>
                  <Quantity>
                    {t("cart.quantity")}: {item.quantity}
                  </Quantity>
                  <Price>{item.price} TL</Price>
                </Info>
                <Actions>
                  <Button onClick={() => removeFromCart(item.id)}>
                    {t("cart.remove")}
                  </Button>
                </Actions>
              </CartItem>
            ))}
            <Total>
              {t("cart.total")}: {totalPrice.toFixed(2)} TL
            </Total>
            <Button variant="secondary" onClick={clearCart}>
              {t("cart.clear")}
            </Button>
          </>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
