import { useRouter } from "next/navigation";
import MyButton from "./MyButton";
import React from "react";

function DiaryItem({ id, emotion, content, date }) {
  const router = useRouter();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    router.push(`/diary/${id}`)
  };

  const goEdit = () => {
    router.push(`/edit/${id}`)
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          `emotion_img_wrapper`,
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={`/assets/emotion${emotion}.png`} className="img" alt="" />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
}

export default React.memo(DiaryItem);
