import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={true} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        You agree to our friendly{" "}
        <Link href="/privacy-policy" className="text-blue-400">
          Privacy Policy.
        </Link>
      </label>
    </div>
  );
}
