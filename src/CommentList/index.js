import { useController } from "./controller";
import Comment from "./Comment";

export default function CommentList() {
  const {
    state: { isLoading, comments },
    methods: { deleteComments },
  } = useController();

  if (isLoading) {
    return <section className="CommentList center">Loading...</section>;
  }

  return (
    <section className="CommentList">
      {comments.map(({ id, name, message, created }) => {
        return (
          <Comment key={id} name={name} message={message} created={created} />
        );
      })}
      {!!comments.length ? (
        <button className="top-right secondary-button" onClick={deleteComments}>
          Reset
        </button>
      ) : null}
    </section>
  );
}
