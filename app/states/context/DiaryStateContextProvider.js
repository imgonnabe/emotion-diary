"use client";

import React, { useEffect, useReducer, useRef } from "react";
import { dataReducer } from "@/app/components/DataReducer";
import { dummyData } from "@/app/data";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function DiaryStateContextProvider(props) {
  const dataId = useRef(1);
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const [data, dispatch] = useReducer(dataReducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = diaryList.length > 0 ? parseInt(diaryList[0].id) + 1 : 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        {props.children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default DiaryStateContextProvider;
