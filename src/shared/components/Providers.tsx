import type { PropsWithChildren } from "react";
import { LiveblocksProvider } from "@liveblocks/react";
import { useAppSelector } from "@/store/store";
import type { IUser } from "@/store/auth/types";
import { API_ROUTES } from "@/environment/apiRoutes";
import axios from "axios";

export function Providers({ children }: PropsWithChildren) {
  const registeredUsers = useAppSelector(
    (state) => state.auth.registeredUsers!
  );
  const user = useAppSelector((state) => state.auth.user!);

  // 1. Authentication
  async function liveblocksAuth(roomId?: string) {
    if (!roomId || !user) {
      throw new Error("Missing roomId or user in liveblocksAuth");
    }

    const response = await axios.post(
      API_ROUTES.LIVEBLOCKS.AUTH,
      { roomId, user },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    return response.data; // Must be { token: string }
  }

  // 2. Resolve Users
  const resolveUsers = async ({ userIds }: { userIds: string[] }) => {
    return userIds
      .map((id) => registeredUsers.find((u) => u.id === Number(id)))
      .filter((u): u is NonNullable<IUser> => !!u)
      .map((u) => ({
        name: `${u.first_name} ${u.last_name}`,
        // avatar or color can be added here
      }));
  };

  // 3. Resolve Mention Suggestions
  const resolveMentionSuggestions = async ({ text }: { text: string }) => {
    const normalizedText = text.toLowerCase();

    const matches = registeredUsers.filter((u) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(normalizedText)
    );

    return matches.map((u) => String(u.id)); // Must return string IDs
  };

  return (
    <LiveblocksProvider
      authEndpoint={liveblocksAuth}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
    >
      {children}
    </LiveblocksProvider>
  );
}
