import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

import type { RenderResult } from "@testing-library/react";

import LoginForm from "@/components/LoginForm/LoginForm";

import { authService } from "@/services/authService";

let mockPush: jest.Mock;
let mockRefresh: jest.Mock;

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/services/authService", () => ({
  authService: { login: jest.fn(), logout: jest.fn() },
}));

const renderComponent = (): RenderResult => render(<LoginForm />);

beforeEach(() => {
  mockPush = jest.fn();
  mockRefresh = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush, refresh: mockRefresh });
});

describe("LoginForm", () => {
  describe("rendering", () => {
    it("should render email input with default value", () => {
      renderComponent();
      expect(screen.getByLabelText("Email")).toHaveValue("alice@example.com");
    });

    it("should render password input with default value", () => {
      renderComponent();
      expect(screen.getByLabelText("Password")).toHaveValue("demo1234");
    });

    it("should render submit button with Login label", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    it("should not show error message initially", () => {
      renderComponent();
      expect(screen.queryByText(/error|invalid|failed/i)).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should update email input when user types", async () => {
      const user = userEvent.setup();
      renderComponent();
      const emailInput = screen.getByLabelText("Email");
      await user.clear(emailInput);
      await user.type(emailInput, "new@example.com");
      expect(emailInput).toHaveValue("new@example.com");
    });

    it("should update password input when user types", async () => {
      const user = userEvent.setup();
      renderComponent();
      const passwordInput = screen.getByLabelText("Password");
      await user.clear(passwordInput);
      await user.type(passwordInput, "newpassword");
      expect(passwordInput).toHaveValue("newpassword");
    });

    it("should call authService.login with email and password on submit", async () => {
      (authService.login as jest.Mock).mockResolvedValueOnce({
        code: "SUCCESS_LOGIN",
        message: "ok",
      });
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Login" }));
      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith("alice@example.com", "demo1234");
      });
    });

    it("should navigate to home and refresh on successful login", async () => {
      (authService.login as jest.Mock).mockResolvedValueOnce({
        code: "SUCCESS_LOGIN",
        message: "ok",
      });
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Login" }));
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/");
        expect(mockRefresh).toHaveBeenCalled();
      });
    });

    it("should show error message when login fails", async () => {
      (authService.login as jest.Mock).mockRejectedValueOnce(new Error("Invalid credentials"));
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Login" }));
      expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    });

    it("should show generic error message when error has no message", async () => {
      (authService.login as jest.Mock).mockRejectedValueOnce("unknown error");
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Login" }));
      expect(await screen.findByText("Login failed")).toBeInTheDocument();
    });

    it("should show loading state during submission", async () => {
      (authService.login as jest.Mock).mockReturnValueOnce(
        new Promise<never>(() => {
          // Empty fn
        })
      );
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Login" }));
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "Logging in…" })).toBeDisabled();
      });
    });

    it("should not navigate when login fails", async () => {
      (authService.login as jest.Mock).mockRejectedValueOnce(new Error("Bad credentials"));
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Login" }));
      await screen.findByText("Bad credentials");
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
