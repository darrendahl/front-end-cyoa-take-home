import { useState, useEffect } from "react";
import { Api } from "../api";

export function useController() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommentList = async () => {
    const response = await Api.get("getComments");
    if (response) {
      setComments(response);
    }
  };

  const deleteComments = async () => {
    await Api.delete(`deleteComments`);
    setComments([]);
  };

  useEffect(() => {
    if (!window.EventSource) {
      return;
    }

    const sse = Api.stream("realtime", (e) => {
      const data = JSON.parse(e.data);
      if (!comments.find((c) => c.id === data.id)) {
        fetchCommentList();
      }
    });

    return () => {
      sse.close();
    };
  }, []);

  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      await fetchCommentList();
      setIsLoading(false);
    };

    initPage();
  }, []);

  return {
    state: {
      isLoading,
      comments,
    },
    methods: {
      deleteComments,
    },
  };
}
