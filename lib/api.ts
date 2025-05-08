export async function fetchConfig(slug: string = 'home') {
  try {
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_SITE_URL;

    const res = await fetch(`${baseUrl}/api/config/${slug}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching config:', error);
    return null;
  }
}

export async function fetchAllConfigs() {
  try {
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_SITE_URL;

    const res = await fetch(`${baseUrl}/api/config`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status1: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching all configs:', error);
    return {};
  }
}