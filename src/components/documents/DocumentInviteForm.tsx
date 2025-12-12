import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, FilePlus2, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { getUserByEmailThunk } from "@/store/auth/authThunk";
import { setErrorFindingUser, setFoundUser } from "@/store/auth/authSlice";
import { Badge } from "@/components/ui/badge";
import { grantAccessThunk } from "@/store/documents/documentThunk";

interface DocumentInviteFormProps {
  onClose: () => void;
  documentId: number | null;
}

const DocumentInviteForm: React.FC<DocumentInviteFormProps> = ({
  onClose,
  documentId,
}) => {
  const dispatch = useAppDispatch();
  const { errorFindingUser, findingUser, foundUser, user, loading } =
    useAppSelector((state) => state.auth);
  const { documents } = useAppSelector((state) => state.documents);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{
    email: string;
    documentId: string;
  }>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      documentId: documents[0]?.id?.toString() || "",
    },
  });

  const email = watch("email");

  const debouncedEmailLookup = useMemo(() => {
    return debounce((email: string) => {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (isValidEmail) {
        dispatch(getUserByEmailThunk({ email }));
      }
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    if (email) {
      debouncedEmailLookup(email);
    }

    return () => {
      debouncedEmailLookup.cancel(); // cleanup on unmount or re-run
    };
  }, [email, debouncedEmailLookup]);

  useEffect(() => {
    if (documentId !== null) {
      setValue("documentId", documentId.toString());
    } else if (documents.length > 0) {
      setValue("documentId", documents[0].id.toString());
    }
  }, [documents, setValue, documentId]);

  const onInvite = (data: { email: string; documentId: string }) => {
    if (foundUser && user && foundUser.id === user.id) {
      // Prevent self-invite
      reset({ email: "", documentId: documents[0]?.id?.toString() || "" });
      dispatch(setFoundUser(null));
      dispatch(setErrorFindingUser("You cannot invite yourself"));
      return;
    }
    if (foundUser) {
      dispatch(
        grantAccessThunk({
          user_id: foundUser.id,
          document_id: parseInt(data.documentId),
          can_edit: true,
        })
      );
    }
    reset({ email: "", documentId: documents[0]?.id?.toString() || "" });
    dispatch(setFoundUser(null));
  };

  return (
    <form
      className="flex flex-col gap-6 max-w-lg mx-auto mt-4"
      onSubmit={handleSubmit(onInvite)}
    >
      <div>
        <Label className="block mb-1 font-medium" htmlFor="invite-email">
          <Mail className="inline w-4 h-4 mr-1 text-slate-500" /> Email
        </Label>
        <div
          className="flex items-center gap-2 bg-white border border-slate-300 rounded px-2 py-1 focus-within:ring-1 focus-within:ring-gray-300 transition-colors cursor-text dark:bg-zinc-900"
          tabIndex={-1}
          onClick={() => {
            const input = document.getElementById("invite-email");
            if (input) input.focus();
          }}
        >
          {!findingUser && foundUser && (
            <Badge variant="default" className="shrink-0 select-none">
              {foundUser.first_name} {foundUser.last_name}
            </Badge>
          )}
          {findingUser && (
            <Badge variant="secondary" className="shrink-0 select-none">
              <span className="animate-pulse flex gap-2 items-center  text-xs font-mono font-semibold">
                <Loader2 className="w-2 h-2 animate-spin" />
                Searching
              </span>
            </Badge>
          )}
          <input
            id="invite-email"
            type="email"
            placeholder="Enter email address"
            className="flex-1 outline-none border-none bg-transparent focus:ring-0 focus:outline-none px-0 py-1 min-w-0"
            onKeyDown={(e) => {
              if (foundUser && e.key === "Backspace") {
                dispatch(setFoundUser(null));
              }
              if (errorFindingUser && e.key === "Backspace") {
                dispatch(setErrorFindingUser(null));
              }
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            aria-invalid={!!errors.email}
            autoComplete="off"
          />
        </div>
        {errorFindingUser && (
          <span className="text-xs text-red-500 mt-1 block">
            {errorFindingUser}
          </span>
        )}
        {!errorFindingUser && errors.email && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>
      <div>
        <Label className="block mb-1 font-medium" htmlFor="invite-document">
          <FilePlus2 className="inline w-4 h-4 mr-1 text-slate-500" /> Document
        </Label>
        {documentId !== null ? (
          <div className="px-3 py-2 border border-slate-300 rounded bg-slate-50 dark:bg-zinc-900 cursor-not-allowed">
            {documents.find((doc) => doc.id === documentId)?.name || "Document"}
            {/* Hidden input for react-hook-form validation */}
            <input
              type="hidden"
              value={documentId}
              {...register("documentId", {
                required: "Please select a document",
              })}
            />
          </div>
        ) : (
          <>
            <Select
              value={watch("documentId")}
              onValueChange={(val) =>
                setValue("documentId", val, { shouldValidate: true })
              }
            >
              <SelectTrigger id="invite-document" className="w-full">
                <SelectValue placeholder="Select a document" />
              </SelectTrigger>
              <SelectContent className="lg:max-h-[300px] md:max-h-[200px] max-h-[150px]">
                {documents.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id.toString()}>
                    {doc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Hidden input for react-hook-form validation */}
            <input
              type="hidden"
              {...register("documentId", {
                required: "Please select a document",
              })}
            />
          </>
        )}
        {errors.documentId && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.documentId.message}
          </span>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={loading || !foundUser}>
          Send Invite
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </form>
  );
};

export default DocumentInviteForm;
