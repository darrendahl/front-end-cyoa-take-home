import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders comment list", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        name: "Darren Dahl",
        message: "This is a comment",
        created: new Date(),
      },
    ])
  );
  render(<App />);

  expect(await screen.findByText("This is a comment")).toBeInTheDocument();
});
