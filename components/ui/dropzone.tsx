"use client";

import { FileSpreadsheet, X } from "lucide-react";
import { useId, useRef, useState, type DragEvent } from "react";
import { BOM_ACCEPT } from "@/lib/bom";
import { cn } from "@/lib/utils";

type DropzoneProps = {
  title: string;
  hint: string;
  browseLabel: string;
  removeLabel: string;
  file: File | null;
  onFile: (file: File | null) => void;
  tone?: "paper" | "ink";
  name?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Dashed drop zone wrapping a real, labelled <input type="file">. */
export function Dropzone({
  title,
  hint,
  browseLabel,
  removeLabel,
  file,
  onFile,
  tone = "paper",
  name,
  invalid,
  describedBy,
  className,
}: DropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const ink = tone === "ink";

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
  };

  const clear = () => {
    onFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (file) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-[14px] border-[1.5px] px-5 py-4",
          ink ? "border-hairline-ink bg-ink-2 text-white" : "border-ink bg-field",
          invalid && "border-danger",
          className,
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          <FileSpreadsheet className="size-5 shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block truncate font-mono text-[15px]">{file.name}</span>
            <span className={cn("text-[13px]", ink ? "text-on-ink-muted" : "text-muted")}>
              {formatSize(file.size)}
            </span>
          </span>
        </span>
        <button
          type="button"
          onClick={clear}
          aria-label={`${removeLabel}: ${file.name}`}
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors",
            ink ? "hover:bg-ink-3" : "hover:bg-panel-2",
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <label
      htmlFor={id}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "relative flex cursor-pointer flex-wrap items-center justify-between gap-4 rounded-[14px] border-[1.5px] border-dashed p-5 transition-colors focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-(--ring,var(--color-accent))",
        ink
          ? "border-[#3A4358] text-white hover:border-on-ink-muted"
          : "border-[#B8BECB] hover:border-ink",
        dragging && (ink ? "border-signal bg-ink-2" : "border-accent bg-accent/5"),
        invalid && "border-danger",
        className,
      )}
    >
      <span className="flex flex-col gap-1">
        <span className="text-base font-semibold">{title}</span>
        <span className={cn("text-[13px]", ink ? "text-on-ink-muted" : "text-muted")}>{hint}</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold",
          ink ? "bg-white text-ink" : "bg-ink text-white",
        )}
      >
        {browseLabel}
      </span>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={BOM_ACCEPT}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}
