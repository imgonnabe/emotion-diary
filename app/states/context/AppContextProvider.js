import DiaryStateContextProvider from "./DiaryStateContextProvider";

//컴포넌트 정의 및 내보내기
export function AppContextProvider(props) {
    return (
      <>
        <DiaryStateContextProvider>
          {props.children}
        </DiaryStateContextProvider>
      </>
    );
  }
  
  export default AppContextProvider;