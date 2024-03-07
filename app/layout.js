import "./globals.css";
import AppContextProvider from "./states/context/AppContextProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "감정 일기장",
  description: "감정 일기장",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <meta property="og:image" content="/thumnail.png"></meta>
      <meta property="og:site_name" content="감정 일기장"></meta>
      <meta property="og:description" content="나만의 작은 감정 일기장"></meta>
      <body className={inter.className}>
        <AppContextProvider>
          <div className="root">
            <div className="App">{children}</div>
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
