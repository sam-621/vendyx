export const restFetcher = async <T>(
  formData: FormData,
  config?: { method: 'POST' | 'GET' | 'DELETE' }
): Promise<T | undefined> => {
  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: config?.method ?? 'POST',
      body: formData
    });

    const data = await response.json();

    return data as T;
  } catch (error) {
    console.log(error);
  }
};
