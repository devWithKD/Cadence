import ThemeContextProvider from "../store/theme-context";
import Header from "./Header";

export default function StatusBoard() {
  return (
    <ThemeContextProvider>
      <div className="w-screen h-screen bg-gradient-to-tr from-slate-50 to-slate-300 dark:from-slate-900 dark:to-slate-700 font-poppins transition-colors duration-300">
        <Header/>
        <main>
          <div></div>
        </main>
      </div>
    </ThemeContextProvider>
  );
}
