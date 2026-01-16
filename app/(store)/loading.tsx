"use client";

import { LoadingDots } from "@/components/ui/LoadingDots";

export default function Loading() {
    return (
        <div className="w-full min-h-screen bg-neutral-50 flex items-center justify-center">
            <LoadingDots />
        </div>
    );
}
