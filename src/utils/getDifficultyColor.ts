import { Recipe } from "@/lib/mockData"

export default function getDifficultyColor(difficulty: Recipe["difficulty"]) {
    switch (difficulty) {
        case '⭐':
            return 'text-green-400';
        case '⭐⭐':
            return 'text-yellow-400';
        case '⭐⭐⭐':
            return 'text-red-400';
        default:
            return 'text-white';
    }
};