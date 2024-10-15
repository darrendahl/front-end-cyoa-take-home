import "./App.css";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Comments Feed</h1>
      </header>
      <CommentForm />
      <CommentList />
    </div>
  );
}

export default App;
