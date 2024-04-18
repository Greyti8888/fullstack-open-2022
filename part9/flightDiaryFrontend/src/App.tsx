import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  return (
    <>
      <h1>Journal</h1>
      <NewDiary />
      <Diaries />
    </>
  );
};

export default App;
