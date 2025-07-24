import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store/store";

interface DeleteDialogProps {
  onConfirm: () => void;
  children: React.ReactNode;
}

export const DelteDocumentAccessDialogue: React.FC<DeleteDialogProps> = ({
  onConfirm,
  children,
}) => {
  const { loading } = useAppSelector((state) => state.documents);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            document access record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            onClick={onConfirm}
            variant={"destructive"}
          >
            Yes, delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
