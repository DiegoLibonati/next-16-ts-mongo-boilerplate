import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

import type { RenderResult } from "@testing-library/react";

import LogoutButton from "@/components/LogoutButton/LogoutButton";

import authService from "@/services/authService";

let mockPush: jest.Mock;
let mockRefresh: jest.Mock;

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { login: jest.fn(), logout: jest.fn() },
}));

const renderComponent = (): RenderResult => render(<LogoutButton />);

beforeEach(() => {
  mockPush = jest.fn();
  mockRefresh = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush, refresh: mockRefresh });
});

describe("LogoutButton", () => {
  describe("rendering", () => {
    it("should render Logout button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    });

    it("should render with action class", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("action");
    });

    it("should render with logout-button class", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("logout-button");
    });
  });

  describe("behavior", () => {
    it("should call authService.logout when clicked", async () => {
      (authService.logout as jest.Mock).mockResolvedValueOnce({
        code: "SUCCESS_LOGOUT",
        message: "ok",
      });
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Logout" }));
      await waitFor(() => {
        expect(authService.logout).toHaveBeenCalledTimes(1);
      });
    });

    it("should navigate to /login on successful logout", async () => {
      (authService.logout as jest.Mock).mockResolvedValueOnce({
        code: "SUCCESS_LOGOUT",
        message: "ok",
      });
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Logout" }));
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/login");
      });
    });

    it("should call router.refresh on successful logout", async () => {
      (authService.logout as jest.Mock).mockResolvedValueOnce({
        code: "SUCCESS_LOGOUT",
        message: "ok",
      });
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Logout" }));
      await waitFor(() => {
        expect(mockRefresh).toHaveBeenCalled();
      });
    });
  });
});
