import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ResultsClient from "./client";

export default function ResultsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            }
        >
            <ResultsClient />
        </Suspense>
    );
}