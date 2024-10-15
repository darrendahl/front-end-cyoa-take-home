import { formatDateTime } from "../utils";

export default function Comment({ message, name, created }) {
  return (
    <article>
      <p>{message}</p>
      <footer>
        {" "}
        <span>
          {name} on {formatDateTime(new Date(created))}
        </span>{" "}
      </footer>
    </article>
  );
}
