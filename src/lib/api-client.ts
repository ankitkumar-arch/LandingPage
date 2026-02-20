// lib/api-client.ts - Single client for all API calls
const apiClient = {
  // ✅ ALWAYS use relative URLs - works everywhere
  getAppStore: async (appId: string) => {
    const response = await fetch(`/api/appstore?appId=${appId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch app data');
    }
    
    return response.json();
  },
  
  createGame: async (gameData: any) => {
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create game');
    }
    
    return response.json();
  }
};

export default apiClient;