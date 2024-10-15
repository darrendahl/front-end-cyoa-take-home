const BASE_URL = "http://localhost:3001";

export const Api = {
  call(url, method, body = {}) {
    const data = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    if (Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    return fetch(`${BASE_URL}/${url}`, data)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`API Code ${response.status}: ${response.statusText}`);
      })
      .catch((e) => {
        alert(e);
      });
  },

  get(url) {
    return this.call(url, "get");
  },

  post(url, body = {}) {
    return this.call(url, "post", body);
  },

  delete(url) {
    return this.call(url, "delete");
  },

  stream(url, onmessage, onopen) {
    const source = new EventSource(`${BASE_URL}/${url}`);
    source.onmessage = onmessage;
    return source;
  },
};
