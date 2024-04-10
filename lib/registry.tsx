"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";

import { ServerStyleSheet, StyleSheetManager, createGlobalStyle, ThemeProvider } from "styled-components";
import useResize from "@/utils/hooks/useResize";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  const [windowWidth, windowHeight] = useResize();

  if (typeof window !== "undefined") {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={{ windowWidth, windowHeight }}>{children}</ThemeProvider>
      </>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <GlobalStyle />
      <ThemeProvider theme={{ windowWidth, windowHeight }}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Times New Roman";
    overflow: hidden;


    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  
    -webkit-animation-delay: 0.1s;
    -webkit-animation-name: fontfix;
    -webkit-animation-duration: 0.1s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: linear;
  
    @-webkit-keyframes fontfix {
      from {
        opacity: 1;
      }
      to {
        opacity: 1;
      }
    }
  

    

    // &::-webkit-scrollbar {
    //   display: none !important;
    //   -webkit-appearance: none;
    //   width: 0 !important;
    //   height: 0;
    // }
  
    // &::-webkit-scrollbar-track {
    //   background: transparent;
    // }
  
    // &::-webkit-scrollbar-thumb {
    //   background: transparent;
    //   background-color: transparent;
    //   outline: none;
    // }
  

    // /* width */
  
    // -ms-overflow-style: none;
    // scrollbar-width: none !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    padding: 0;
  }

  @font-face{
    font-family: 'anton';
    src: url('/assets/fonts/Anton-Regular.ttf');
  }

  @font-face{
    font-family: 'bungee-shade';
    src: url('/assets/fonts/BungeeShade-Regular.ttf');
  }

  @font-face{
    font-family: 'coming-soon';
    src: url('/assets/fonts/ComingSoon-Regular.ttf');
  }


  @font-face{
    font-family: "BebasNeue";
    src: url('/fonts/BebasNeue-Regular.ttf');
  }
  


 
`;
