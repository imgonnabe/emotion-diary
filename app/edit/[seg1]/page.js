"use client"
import DiaryEditor from "@/app/components/DiaryEditor"
import { DiaryStateContext } from "@/app/states/context/DiaryStateContextProvider"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

function Edit(){
    const id = useParams().seg1
    const diaryList = useContext(DiaryStateContext)
    const [originData, setOriginData] = useState()

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0]
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`
      })

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
            if(targetDiary){
                setOriginData(targetDiary)
            } else {
                router.push('/', {relace:true})
            }
        }

    }, [id, diaryList])
    
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    )
}

export default Edit