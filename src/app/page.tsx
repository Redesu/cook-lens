"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState("")

  const handleGenerateRecipes = () => {
    if (!ingredients) return
    const generateButton = document.querySelector('.generate-recipes-button');
    if (generateButton) {
      generateButton.textContent = 'Generating...';
      generateButton.setAttribute('disabled', 'true');
      generateButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
    const query = encodeURIComponent(ingredients)
    router.push(`/results?ingredients=${query}`)
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold text-center mb-2">
          Turn Your Fridge Into Dinner
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Snap a photo, get instant recipe ideas
        </p>

        <div className="w-full max-w-md space-y-4">
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 cursor-pointer">
            Open Camera
          </button>

          <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg text-lg font-semibold cursor-pointer">
            Upload Photo
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Type ingredients (e.g., chicken, rice, tomatoes)"
            className="w-full border rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGenerateRecipes();
              }
            }}
          />
          <button
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 cursor-pointer generate-recipes-button"
            onClick={handleGenerateRecipes}
          >
            Generate Recipes
          </button>
        </div>

        <button className="mt-8 text-blue-600 underline cursor-pointer">
          See sample recipe →
        </button>
      </main>

      <footer className="p-6 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          📸 Photo → 🤖 AI Analysis → 🍽️ 3-5 Recipes
        </p>
      </footer>
    </div>
  )
}