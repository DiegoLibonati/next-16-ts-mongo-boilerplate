import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

import { getSession } from "@/server/helpers/get_session.helper";

import LoginPage from "@/app/(pages)/login/page";

import { mockSession } from "@tests/__mocks__/session.mock";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: (): { push: jest.Mock; refresh: jest.Mock } => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  redirect: jest.fn(),
}));

const renderPage = async (): Promise<void> => {
  const ui = await LoginPage();
  render(ui);
};

beforeEach(() => {
  (redirect as unknown as jest.Mock).mockImplementation((url: string): never => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  });
});

describe("page", () => {
  describe("when the user is not logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(null);
    });

    it("should render the login heading", async () => {
      await renderPage();
      expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    });

    it("should render the login submit button", async () => {
      await renderPage();
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    it("should render the email input", async () => {
      await renderPage();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("should render the password input", async () => {
      await renderPage();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("should render the demo credentials hint", async () => {
      await renderPage();
      expect(screen.getByText("Demo credentials are pre-filled.")).toBeInTheDocument();
    });
  });

  describe("when the user is already logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(mockSession);
    });

    it("should redirect to the home page", async () => {
      await expect(LoginPage()).rejects.toThrow("NEXT_REDIRECT:/");
    });

    it("should not render the login heading", async () => {
      try {
        await renderPage();
      } catch {
        // redirect throws — expected
      }
      expect(screen.queryByRole("heading", { name: "Login" })).not.toBeInTheDocument();
    });
  });
});
