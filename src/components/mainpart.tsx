export type NERTag = "B-LOCATION" | "I-LOCATION" | "O" | "B-ORGANIZATION" | "I-ORGANIZATION" | "B-PERSON" | "I-PERSON"

export interface TaggedWord {
  word: string
  tag: NERTag
}

export async function predictNER(sentence: string): Promise<TaggedWord[]> {
  console.log("here is he sentence", sentence)
  try {
    const response = await fetch("https://nlp-ner.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: sentence }),
    })

    console.log("response here", response)

    if (!response.ok) {
      throw new Error("API request failed")
    }

    const data = await response.json()
    console.log("response data here", data)

    return data.word_tag_pairs
  } catch (error) {
    console.error("Error predicting NER:", error)
    return []
  }
}

