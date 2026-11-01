import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        }),
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();

    if (!response.ok || !data.choices || !data.choices.length) {
        console.log("OpenAI error:", data);
        throw new Error(data.error?.message || "OpenAI request failed");
    }

    return data.choices[0].message.content; //reply
};

export default getOpenAIAPIResponse;