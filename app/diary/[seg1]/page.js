"use client";

import MyButton from "@/app/components/MyButton";
import MyHeader from "@/app/components/MyHeader";
import { DiaryStateContext } from "@/app/states/context/DiaryStateContextProvider";
import { getStringDate } from "@/app/util/Date";
import { emotionList } from "@/app/util/Emotion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function Diary() {
  const params = useParams();
  const id = params.seg1;
  const diaryList = useContext(DiaryStateContext);
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`
  })

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        router.push("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {// if(!data)문이 없으면 null인 data에 접근하려 했기 때문에 에러 발생
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => router.back()} />
          }
          rightChild={
            <MyButton
              text={"> 수정하기"}
              onClick={() => router.push(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
