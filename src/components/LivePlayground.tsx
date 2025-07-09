import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Card } from "@/components/ui/card";
import * as React from "react";

// Import your UI library
import { Nudge } from "react-nudge-ui";

const scope = {
  React,
  Nudge, // ← your component goes here
};

type LivePlaygroundProps = {
  code: string;
};

export default function LivePlayground({ code }: LivePlaygroundProps) {
  return (
    <LiveProvider code={code} noInline scope={scope}>
      <Card className="p-4 space-y-4">
        <LivePreview className="p-4 border rounded bg-muted" />
        <LiveEditor className="bg-black text-white rounded text-sm p-2 font-mono" />
        <LiveError className="text-red-500" />
      </Card>
    </LiveProvider>
  );
}
