"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { dataReducer } from "./components/DataReducer";
import DiaryStateContextProvider, { DiaryStateContext } from "./states/context/DiaryStateContextProvider";
import DiaryList from "./components/DiaryList";

export default function Home() {
  const diaryList = useContext(DiaryStateContext)
  const [data, setData] = useState([])

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if(diaryList.length >= 1){
      const fisrtDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime()
  
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime()
  
      setData(diaryList.filter((it) => fisrtDay <= it.date && it.date <= lastDay))
    }
  }, [diaryList, curDate])

  useEffect(() => {
    console.log(data)
  }, [data])

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
  }
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
  }

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data}/>
    </div>
  );
}
