import { useState } from "react";
import { Api } from "../api";

export default function CommentForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity()) {
      setName("");
      setMessage("");
      await Api.post("createComment", {
        name,
        message,
      });
    }
  };

  return (
    <form className="CommentForm" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <textarea
          id="message"
          required
          type="text"
          value={message}
          onChange={handleCommentChange}
        />
      </fieldset>

      <button className="primary-button" type="submit">
        Comment
      </button>
    </form>
  );
}
