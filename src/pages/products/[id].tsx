import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/atoms/Button";
import OptimizedImage from "@/components/atoms/OptimizedImage";
import api from "@/lib/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
  description: string;
};

type Props = {
  product: Product;
};
const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
`;

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0.75rem;
  background: ${({ theme }) => theme.productCard.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.productCard.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (min-width: 768px) {
    max-width: 280px;
  }
`;

const Info = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.productCard.background};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.productCard.border};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Title = styled.h1`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.productCard.title};
`;

const Rating = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.productCard.ratingText};
`;

const Price = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.productCard.price};
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryText};
  line-height: 1.55;
`;

const AddToCartButton = styled(Button)`
  margin-top: auto;
  padding: 0.75rem 1.2rem;
  font-size: 0.95rem;
  border-radius: 8px;
  width: 100%;
`;

export default function ProductDetailPage({ product }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <PageContainer>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      <BackButton variant="tertiary" onClick={() => router.push("/products")}>
        <ArrowLeft size={16} />
        {t("product.back")}
      </BackButton>

      <Wrapper>
        <ImageWrapper>
          <OptimizedImage
            src={product.image}
            alt={product.title}
            width={280}
            height={280}
            objectFit="contain"
            borderRadius="6px"
            bgColor="#fff"
          />
        </ImageWrapper>

        <Info>
          <Title>{product.title}</Title>
          <Rating>
            ⭐ {t("product.rating")}: {product.rating.rate}
          </Rating>
          <Price>{product.price} TL</Price>
          <Description>{product.description}</Description>
          <AddToCartButton
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
              })
            }
          >
            {t("product.addToCart")}
          </AddToCartButton>
        </Info>
      </Wrapper>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const locale = context.locale || "tr";

  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return {
      props: {
        product: data,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
