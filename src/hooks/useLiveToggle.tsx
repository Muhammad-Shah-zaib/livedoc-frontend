import { useAppDispatch, useAppSelector } from "@/store/store";
import { patchDocumentThunk } from "@/store/documents/documentThunk";
import { toast } from "sonner";

export function useLiveToggle() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.documents);

  const toggleLive = async (id: number, is_live: boolean) => {
    const toastId = toast.loading("Updating live status...");
    try {
      await dispatch(
        patchDocumentThunk({
          id,
          is_live,
        })
      );
      toast.success(
        `document #${id} is set to ${is_live ? "LIVE" : "OFFLINE"}`,
        { id: toastId }
      );
    } catch (error) {
      toast.error("Failed to update live status.", { id: toastId });
    }
  };

  return { toggleLive, loading };
}
