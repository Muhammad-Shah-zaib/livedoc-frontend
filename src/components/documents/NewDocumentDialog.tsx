import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { postDocumentThunk } from "@/store/documents/documentThunk";
import type { PostDocumentsPayload } from "@/store/documents/types";
import { Plus } from "lucide-react";

export default function NewDocumentDialog() {
  const dispatch = useAppDispatch();

  const fieldErrors = useAppSelector((state) => state.documents.error);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostDocumentsPayload>({
    mode: "onTouched",
    defaultValues: { name: "" },
  });

  async function onSubmit(data: PostDocumentsPayload) {
    await dispatch(postDocumentThunk(data));
    reset();
    if (!fieldErrors) {
      setOpen(false);
    }
  }

  function handleCancel() {
    reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Document</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create New Document</DialogTitle>
          </DialogHeader>
          <div>
            <div className="grid grid-cols-5 mb-2">
              <Label htmlFor="doc-title">Title</Label>
              <Input
                id="doc-title"
                placeholder="Enter document title"
                autoFocus
                className="col-span-4"
                aria-invalid={!!errors.name}
                {...register("name", {
                  required: "Title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                })}
              />
            </div>
            <div className="grid grid-cols-5">
              <div className=""></div>
              {fieldErrors?.name && (
                <p className="text-xs col-span-4 text-red-500 mt-1">
                  {fieldErrors.name}
                </p>
              )}
              {!fieldErrors && errors.name && (
                <p className="text-xs col-span-4 text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
