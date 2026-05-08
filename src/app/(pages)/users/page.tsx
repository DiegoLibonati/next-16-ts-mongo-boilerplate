import { redirect } from "next/navigation";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { IUser } from "@/types/models";

import { getSession } from "@/server/helpers/get_session.helper";
import { UserService } from "@/server/services/user.service";

import Link from "@/components/Link/Link";
import UserCard from "@/components/UserCard/UserCard";

import "@/app/(pages)/users/users.css";

export const metadata: Metadata = { title: "Users" };

async function UsersPage(): Promise<JSX.Element> {
  const session = await getSession();
  if (!session) redirect("/login");

  let users: IUser[] = [];
  let fetchError: string | null = null;

  try {
    users = await UserService.getAllUsers();
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Failed to load users";
  }

  return (
    <main className="users-page">
      <h1 className="title">Users</h1>

      {fetchError ? (
        <p className="error-message">{fetchError}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <li key={user._id}>
              <UserCard name={user.name} email={user.email} />
            </li>
          ))}
        </ul>
      )}

      <nav className="links">
        <Link href="/">← Home</Link>
      </nav>
    </main>
  );
}

export default UsersPage;
