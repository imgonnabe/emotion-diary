"use client";

import { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { useRouter } from "next/navigation";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../states/context/DiaryStateContextProvider";
import { dataReducer } from "./DataReducer";
import { dummyData } from "../data";
import { getStringDate } from "../util/Date";
import { emotionList } from "../util/Emotion";

function DiaryEditor({isEdit, originData}) {
  const router = useRouter();
  const [content, setContent] = useState('')
  const contentRef = useRef()
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if(content.length < 1){
        contentRef.current.focus()
        return
    }
    if(confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
        if(!isEdit){
            onCreate(date, content, emotion)
        } else {
            onEdit(originData.id, date, content, emotion)
        }
    }
    router.push('/', {relace:true})// 일기 작성하는 페이지를 뒤로 가기로 못 오게
  }

  const handleRemove = () => {
    if(confirm('정말 삭제하시겠습니까?')){
      onRemove(originData.id)
      router.push('/', {relace:true})
    }
  }

  useEffect(() => {
    if(isEdit){
        setDate(getStringDate(new Date(parseInt(originData.date))))
        setEmotion(originData.emotion)
        setContent(originData.content)
    }
  }, [isEdit, originData])

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => router.back()} />
        }
        rightChild={
          isEdit&& <MyButton text={"삭제하기"} type={'negative'} onClick={handleRemove} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea placeholder="오늘은 어땠나요?" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={'취소하기'} onClick={() => router.back()} />
            <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
