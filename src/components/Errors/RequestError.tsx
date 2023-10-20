import React from "react";
import { PostgrestError } from "@supabase/supabase-js";

interface Props {
  requestError?: PostgrestError | null;
  error?: unknown;
  fallbackMessage?: string;
}

export const RequestError: React.FC<Props> = ({
  requestError,
  error,
  fallbackMessage,
}) => {
  return (
    <p className="text-gray-500 py-4">
      {requestError?.message ??
        (error as Error)?.message ??
        fallbackMessage ??
        "Something has failed while mkaing this request."}
    </p>
  );
};
