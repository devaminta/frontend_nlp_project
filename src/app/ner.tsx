"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { predictNER, type TaggedWord, type NERTag } from "../components/mainpart"


export default function AmharicNER() {
  const [input, setInput] = useState("")
  const [taggedWords, setTaggedWords] = useState<TaggedWord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const prediction = await predictNER(input)
      setTaggedWords(prediction)
    } catch (error) {
    console.log(error)
      setError("Failed to get prediction. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getTagColor = (tag: NERTag) => {
    switch (tag) {
      case "B-LOCATION":
      case "I-LOCATION":
        return "bg-green-100 text-green-800"
      case "B-ORGANIZATION":
      case "I-ORGANIZATION":
        return "bg-yellow-100 text-yellow-800"
      case "B-PERSON":
      case "I-PERSON":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTagLabel = (tag: NERTag) => {
    switch (tag) {
      case "B-LOCATION":
      case "I-LOCATION":
        return "LOC"
      case "B-ORGANIZATION":
      case "I-ORGANIZATION":
        return "ORG"
      case "B-PERSON":
      case "I-PERSON":
        return "PER"
      default:
        return "O"
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Amharic Named Entity Recognition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter Amharic text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
        />
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? "Predicting..." : "Predict NER"}
        </Button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {taggedWords.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tagged Words:</h3>
            <div className="flex flex-wrap gap-2">
              {taggedWords.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                  <span>{item.word}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getTagColor(item.tag)}`}>
                    {getTagLabel(item.tag)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

