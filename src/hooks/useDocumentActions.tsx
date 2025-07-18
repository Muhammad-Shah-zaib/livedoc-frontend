import { useState, useCallback } from "react";
import { useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { setCurrentDocument } from "@/store/documents/documentSlice";
import {
  deleteDocumentThunk,
  grantAccessThunk,
  approveAccessThunk,
  revokeAccessThunk,
} from "@/store/documents/documentThunk";
import { useLiveToggle } from "@/hooks/useLiveToggle";
import type { Document } from "@/store/documents/types";

export function useDocumentActions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toggleLive, loading } = useLiveToggle();

  // Share dialog state (stores doc id or null)
  const [shareDialogOpen, setShareDialogOpen] = useState<null | number>(null);
  // Access dialog state (stores doc id or null)
  const [accessDialogOpen, setAccessDialogOpen] = useState<null | number>(null);

  // Open document detail (navigate and set current)
  const handleOpenDocumentDetail = useCallback(
    (doc: Document) => {
      navigate(`/documents/${doc.share_token}`);
      dispatch(setCurrentDocument(doc));
    },
    [navigate, dispatch]
  );

  // Delete document
  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteDocumentThunk({ id }));
    },
    [dispatch]
  );

  // Invite user to document
  const handleInvite = useCallback(
    (user_id: number, document_id: number, can_edit = true) => {
      dispatch(grantAccessThunk({ user_id, document_id, can_edit }));
    },
    [dispatch]
  );

  // Approve access request
  const handleApproveAccess = useCallback(
    (access_id: number) => {
      dispatch(approveAccessThunk({ access_id }));
    },
    [dispatch]
  );

  // Revoke access
  const handleRevokeAccess = useCallback(
    (access_id: number) => {
      dispatch(revokeAccessThunk({ access_id }));
    },
    [dispatch]
  );

  return {
    handleOpenDocumentDetail,
    handleDelete,
    toggleLive,
    loading,
    shareDialogOpen,
    setShareDialogOpen,
    accessDialogOpen,
    setAccessDialogOpen,
    handleInvite,
    handleApproveAccess,
    handleRevokeAccess,
  };
}

export default useDocumentActions;
