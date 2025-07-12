"use client";

import Image, { ImageProps } from "next/image";
import styled from "styled-components";

type Props = {
  borderRadius?: string;
  bgColor?: string;
  objectFit?: "contain" | "cover";
} & Omit<ImageProps, "style">;

const ImageWrapper = styled.div<{
  $radius?: string;
  $bgColor?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ $bgColor }) => $bgColor || "transparent"};
  border-radius: ${({ $radius }) => $radius || "0"};
  overflow: hidden;
`;

export default function OptimizedImage({
  borderRadius,
  bgColor,
  objectFit = "cover",
  ...props
}: Props) {
  return (
    <ImageWrapper $radius={borderRadius} $bgColor={bgColor}>
      <Image
        {...props}
        style={{
          objectFit,
          width: "100%",
          height: "100%",
        }}
      />
    </ImageWrapper>
  );
}
