import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  checkLiveDocumentAccessThunk,
  getDocumentByShareTokenThunk,
  requestAccessThunk,
} from "@/store/documents/documentThunk";
import { useNavigate } from "react-router-dom";

interface ConnectLiveDocumentForm {
  shareToken: string;
}

interface ConnectLiveDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConnectLiveDocumentDialog({
  open,
  onOpenChange,
}: ConnectLiveDocumentDialogProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    canNavigateToDetailFromConnect,
    currentDocument,
    canConnectToDocument,
  } = useAppSelector((state) => state.documents);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConnectLiveDocumentForm>({
    mode: "onSubmit",
    defaultValues: { shareToken: "" },
  });

  async function handleRequestAccess({ shareToken }: ConnectLiveDocumentForm) {
    if (shareToken)
      await dispatch(requestAccessThunk({ share_token: shareToken }));
  }

  async function handleConnect({ shareToken }: ConnectLiveDocumentForm) {
    if (shareToken) {
      await dispatch(getDocumentByShareTokenThunk({ share_token: shareToken }));
      await dispatch(checkLiveDocumentAccessThunk({ share_token: shareToken }));
    }
  }

  useEffect(() => {
    if (canNavigateToDetailFromConnect && canConnectToDocument)
      navigate(`/documents/${currentDocument?.share_token}`);
  }, [
    canConnectToDocument,
    canNavigateToDetailFromConnect,
    currentDocument,
    navigate,
  ]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="space-y-4" onSubmit={handleSubmit(handleConnect)}>
          <DialogHeader>
            <DialogTitle>Connect to Live Document</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-5 mb-2">
            <Label htmlFor="share-token">Share Token</Label>
            <Input
              id="share-token"
              placeholder="Enter share token"
              className="col-span-4"
              aria-invalid={!!errors.shareToken}
              {...register("shareToken", {
                required: "Share token is required",
                pattern: {
                  value:
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                  message: "Share token is invalid",
                },
              })}
            />
          </div>
          <div className="grid grid-cols-5">
            <div className=""></div>
            {errors.shareToken && (
              <p className="text-xs col-span-4 text-red-500 mt-1">
                {errors.shareToken.message}
              </p>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSubmit(handleRequestAccess)}
            >
              Request Access
            </Button>
            <Button type="submit">Connect</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
