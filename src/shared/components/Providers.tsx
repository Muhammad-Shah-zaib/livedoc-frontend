import type { PropsWithChildren } from "react";
import { LiveblocksProvider } from "@liveblocks/react";
import { useAppSelector } from "@/store/store";
import { API_ROUTES } from "@/environment/apiRoutes";
import axios from "axios";

export function Providers({ children }: PropsWithChildren) {
  const user = useAppSelector((state) => state.auth.user!);
  const currentDocumentUsers = useAppSelector(
    (state) => state.documents.currentDocumentUsers
  );

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

    return response.data; // Must be { token: string }
  }

  // 2. Resolve Users
  const resolveUsers = async ({ userIds }: { userIds: string[] }) => {
    try {
      const response = await axios.post(
        API_ROUTES.AUTH.GET_USERS_BY_EMAIL_LIST,
        {
          emails: userIds, // Backend expects 'emails'
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      const rawUsers = response.data.users; // This should match backend response
      const users = rawUsers.map((user: any) => {
        if (user.info) {
          return {
            name: user.info.name,
            color: user.info.color,
          };
        }
      });
      return users;
    } catch (error) {
      console.error("Failed to resolve users:", error);
      return [];
    }
  };

  // 3. Resolve Mention Suggestions
  const resolveMentionSuggestions = async ({
    text,
  }: {
    text: string;
    roomId: string;
  }) => {
    const normalizedText = text.toLowerCase();
    const matches = currentDocumentUsers.filter(
      (u) =>
        u.email.toLowerCase().includes(normalizedText) ||
        u.name.toLowerCase().includes(normalizedText)
    );
    return matches.map((u) => u.email);
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
