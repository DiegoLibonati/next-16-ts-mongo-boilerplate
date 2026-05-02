import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

import { getSession } from "@/server/helpers/get_session.helper";
import { UserService } from "@/server/services/user.service";

import UsersPage from "@/app/(pages)/users/page";

import { mockUser, mockUsers } from "@tests/__mocks__/user.mock";
import { mockSession } from "@tests/__mocks__/session.mock";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/server/services/user.service", () => ({
  UserService: {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  redirect: jest.fn(),
}));

const renderPage = async (): Promise<void> => {
  const ui = await UsersPage();
  render(ui);
};

beforeEach(() => {
  (redirect as unknown as jest.Mock).mockImplementation((url: string): never => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  });
});

describe("page", () => {
  describe("when the user is logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(mockSession);
    });

    describe("when users exist", () => {
      beforeEach(() => {
        jest.mocked(UserService.getAllUsers).mockResolvedValue(mockUsers);
      });

      it("should render the users heading", async () => {
        await renderPage();
        expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
      });

      it("should render the first user name", async () => {
        await renderPage();
        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      });

      it("should render the first user email", async () => {
        await renderPage();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      });

      it("should render a list item for each user", async () => {
        await renderPage();
        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(mockUsers.length);
      });

      it("should render the home navigation link", async () => {
        await renderPage();
        expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute("href", "/");
      });
    });

    describe("when no users exist", () => {
      beforeEach(() => {
        jest.mocked(UserService.getAllUsers).mockResolvedValue([]);
      });

      it("should render the empty state message", async () => {
        await renderPage();
        expect(screen.getByText("No users found.")).toBeInTheDocument();
      });

      it("should not render any list items", async () => {
        await renderPage();
        expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
      });
    });

    describe("when the service throws an error", () => {
      beforeEach(() => {
        jest.mocked(UserService.getAllUsers).mockRejectedValue(new Error("Database error"));
      });

      it("should render the error message", async () => {
        await renderPage();
        expect(screen.getByText("Database error")).toBeInTheDocument();
      });

      it("should not render any list items when an error occurs", async () => {
        await renderPage();
        expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the user is not logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(null);
    });

    it("should redirect to the login page", async () => {
      await expect(UsersPage()).rejects.toThrow("NEXT_REDIRECT:/login");
    });
  });
});
