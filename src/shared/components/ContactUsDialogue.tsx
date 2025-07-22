import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Mail, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactUsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="text-lg px-12 py-4 h-auto border-2 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
        >
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <DialogTitle className="text-xl">Contact Us</DialogTitle>
          </div>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            We’d love to hear from you. For feedback, support, or general
            queries, just send us an email.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 text-center">
          <a
            href="mailto:livedoc.emailclient@gmail.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline text-lg font-semibold"
          >
            <Mail className="h-5 w-5" />
            livedoc.emailclient@gmail.com
          </a>
        </div>

        <DialogFooter className="mt-8 flex justify-center">
          <DialogClose asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Smile className="h-5 w-5 bg-yellow-400 rounded-full text-yellow-900" />
              Got it
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
