
export const getData = async (endpoint: string) => {
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-store'  // Disable caching
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error Response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorData}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error details:", error);
        throw error; // Rethrow to handle in the component
    }
};