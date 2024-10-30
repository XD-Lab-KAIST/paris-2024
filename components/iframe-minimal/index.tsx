"use client";

import { useRef, useMemo, useState, useEffect, createContext, useContext } from "react";
import useRefs from "react-use-refs";
import * as S from "./styles";

const LINK = "https://uncharted-territory-xdlab.vercel.app/";

export default function MainComp() {
  return (
    <S.Wrapper>
      <S.IFrame src={LINK} frameBorder="0" />
    </S.Wrapper>
  );
}
