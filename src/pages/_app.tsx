import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/organisms/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageLoading from "@/components/atoms/PageLoading";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@/styles/theme";
import GlobalStyle from "@/styles/GlobalStyle";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <CartProvider>
        {loading && <PageLoading />}
        <Header
          toggleTheme={() => setIsDarkMode((prev) => !prev)}
          isDarkMode={isDarkMode}
        />
        <Component
          {...pageProps}
          toggleTheme={() => setIsDarkMode((prev) => !prev)}
        />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#fff",
              color: "#333",
              padding: "12px 16px",
              fontSize: "0.9rem",
            },
          }}
          containerStyle={{
            top: 60,
          }}
        />
      </CartProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
