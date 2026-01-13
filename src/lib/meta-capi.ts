// // 1. Install required packages
// // npm install crypto uuid

// // 2. Environment Variables (.env.local)
// // FACEBOOK_PIXEL_ID=your_pixel_id
// // FACEBOOK_ACCESS_TOKEN=your_access_token
// // NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id

// // 3. lib/meta-capi.ts - Meta CAPI Service
// import crypto from 'crypto';
// import { v4 as uuidv4 } from 'uuid';

// interface UserData {
//   email?: string;
//   phone?: string;
//   firstName?: string;
//   lastName?: string;
//   city?: string;
//   state?: string;
//   zipCode?: string;
//   country?: string;
//   clientIpAddress?: string;
//   clientUserAgent?: string;
//   fbc?: string; // Facebook click ID
//   fbp?: string; // Facebook browser ID
// }

// interface CustomData {
//   currency?: string;
//   value?: number;
//   content_ids?: string[];
//   content_type?: string;
//   content_name?: string;
//   num_items?: number;
// }

// interface ConversionEvent {
//   event_name: string;
//   event_time: number;
//   action_source: 'website' | 'email' | 'app';
//   user_data: UserData;
//   custom_data?: CustomData;
//   event_source_url?: string;
//   event_id?: string; // For deduplication
// }

// class MetaCAPI {
//   private pixelId: string;
//   private accessToken: string;
//   private apiVersion = 'v18.0';

//   constructor() {
//     this.pixelId = process.env.FACEBOOK_PIXEL_ID || '';
//     this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN || '';
    
//     if (!this.pixelId || !this.accessToken) {
//       console.error('Meta CAPI: Missing required environment variables');
//     }
//   }

//   // Hash user data for privacy
//   private hashData(data: string): string {
//     return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
//   }

//   // Process user data
//   private processUserData(userData: UserData): UserData {
//     const processed: UserData = { ...userData };

//     // Hash PII data
//     if (processed.email) {
//       processed.email = this.hashData(processed.email);
//     }
//     if (processed.phone) {
//       // Remove non-digits and hash
//       const cleanPhone = processed.phone.replace(/\D/g, '');
//       processed.phone = this.hashData(cleanPhone);
//     }
//     if (processed.firstName) {
//       processed.firstName = this.hashData(processed.firstName);
//     }
//     if (processed.lastName) {
//       processed.lastName = this.hashData(processed.lastName);
//     }

//     return processed;
//   }

//   // Send event to Meta CAPI
//   async sendEvent(event: ConversionEvent): Promise<boolean> {
//     try {
//       const processedEvent = {
//         ...event,
//         user_data: this.processUserData(event.user_data),
//         event_id: event.event_id || uuidv4(), // Generate if not provided
//       };

//       const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`;
      
//       const payload = {
//         data: [processedEvent],
//         access_token: this.accessToken,
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const error = await response.text();
//         console.error('Meta CAPI Error:', error);
//         return false;
//       }

//       const result = await response.json();
//       console.log('Meta CAPI Success:', result);
//       return true;

//     } catch (error) {
//       console.error('Meta CAPI Exception:', error);
//       return false;
//     }
//   }

//   // Helper methods for common events
//   async trackPageView(userData: UserData, pageUrl: string): Promise<boolean> {
//     return this.sendEvent({
//       event_name: 'PageView',
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       event_source_url: pageUrl,
//       user_data: userData,
//     });
//   }

//   async trackViewContent(userData: UserData, customData: CustomData, pageUrl: string): Promise<boolean> {
//     return this.sendEvent({
//       event_name: 'ViewContent',
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       event_source_url: pageUrl,
//       user_data: userData,
//       custom_data: customData,
//     });
//   }

//   async trackLead(userData: UserData, customData?: CustomData, pageUrl?: string): Promise<boolean> {
//     return this.sendEvent({
//       event_name: 'Lead',
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       event_source_url: pageUrl,
//       user_data: userData,
//       custom_data: customData,
//     });
//   }

//   async trackPurchase(userData: UserData, customData: CustomData, pageUrl?: string): Promise<boolean> {
//     return this.sendEvent({
//       event_name: 'Purchase',
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       event_source_url: pageUrl,
//       user_data: userData,
//       custom_data: customData,
//     });
//   }

//   async trackCustomEvent(eventName: string, userData: UserData, customData?: CustomData, pageUrl?: string): Promise<boolean> {
//     return this.sendEvent({
//       event_name: eventName,
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       event_source_url: pageUrl,
//       user_data: userData,
//       custom_data: customData,
//     });
//   }
// }

// export default MetaCAPI;



// 1. Enhanced MetaCAPI class with test mode and logging
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

class MetaCAPI {
  private pixelId: string;
  private accessToken: string;
  private apiVersion = 'v18.0';
  private testMode: boolean;

  constructor() {
    this.pixelId = process.env.FB_PIXEL_ID_BOB || '';
    this.accessToken = process.env.FB_ACCESS_TOKEN_BOB || '';
    this.testMode = process.env.NODE_ENV === 'development';
    
    if (!this.pixelId || !this.accessToken) {
      console.error('Meta CAPI: Missing required environment variables');
    }
  }

  // Test endpoint to verify your setup
  async testConnection(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}?fields=name&access_token=${this.accessToken}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const error = await response.text();
        return { success: false, error };
      }

      const data = await response.json();
      return { success: true, data };

    } catch (error) {
      return { success: false, error: error.toString() };
    }
  }

  // Enhanced sendEvent with detailed logging
  async sendEvent(event: ConversionEvent, options: { testMode?: boolean } = {}): Promise<{
    success: boolean;
    response?: any;
    error?: string;
    debugInfo?: any;
  }> {
    try {
      const processedEvent = {
        ...event,
        user_data: this.processUserData(event.user_data),
        event_id: event.event_id || uuidv4(),
      };

      const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`;
      
      const payload = {
        data: [processedEvent],
        access_token: this.accessToken,
        // Add test_event_code for testing
        ...(this.testMode && { test_event_code: 'TEST12345' })
      };

      // Log the payload in development
      if (this.testMode) {
        console.log('🚀 CAPI Payload:', JSON.stringify(payload, null, 2));
        console.log('🔗 URL:', url);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('❌ Meta CAPI Error:', responseData);
        return { success: false, error: responseData, response: responseData };
      }

      if (this.testMode) {
        console.log('✅ Meta CAPI Success:', responseData);
      }

      return { 
        success: true, 
        response: responseData,
        debugInfo: this.testMode ? { payload, processedEvent } : undefined
      };

    } catch (error) {
      console.error('❌ Meta CAPI Exception:', error);
      return { success: false, error: error.toString() };
    }
  }

  // Rest of your existing methods...
  private hashData(data: string): string {
    return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
  }

  private processUserData(userData: UserData): UserData {
    const processed: UserData = { ...userData };
    if (processed.email) processed.email = this.hashData(processed.email);
    if (processed.phone) {
      const cleanPhone = processed.phone.replace(/\D/g, '');
      processed.phone = this.hashData(cleanPhone);
    }
    if (processed.firstName) processed.firstName = this.hashData(processed.firstName);
    if (processed.lastName) processed.lastName = this.hashData(processed.lastName);
    return processed;
  }
}

// 2. Test API endpoint for local verification
// app/api/test-capi/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import MetaCAPI from '@/lib/meta-capi';

// const metaCAPI = new MetaCAPI();

// export async function GET() {
//   try {
//     // Test 1: Connection test
//     console.log('🧪 Testing CAPI connection...');
//     const connectionTest = await metaCAPI.testConnection();
    
//     if (!connectionTest.success) {
//       return NextResponse.json({
//         success: false,
//         error: 'Connection failed',
//         details: connectionTest.error
//       }, { status: 400 });
//     }

//     // Test 2: Send a test event
//     console.log('🧪 Sending test event...');
//     const testEvent = await metaCAPI.sendEvent({
//       event_name: 'TestEvent',
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       event_source_url: 'http://localhost:3000/test',
//       user_data: {
//         email: 'test@example.com',
//         clientIpAddress: '127.0.0.1',
//         clientUserAgent: 'Test User Agent',
//       },
//       custom_data: {
//         currency: 'USD',
//         value: 1.00,
//         content_name: 'Test Event'
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       connection: connectionTest.data,
//       testEvent: testEvent,
//       message: 'CAPI is working correctly!'
//     });

//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       error: error.toString()
//     }, { status: 500 });
//   }
// }

// 3. Browser console testing utility
// utils/capi-test.ts (for browser console testing)
// export class CAPITester {
//   static async testTracking() {
//     console.log('🧪 Starting CAPI test...');
    
//     try {
//       // Test connection
//       const connectionResponse = await fetch('/api/test-capi');
//       const connectionResult = await connectionResponse.json();
      
//       console.log('📡 Connection Test:', connectionResult);
      
//       // Test event tracking
//       const trackingResponse = await fetch('/api/track', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           eventName: 'TestFromBrowser',
//           userData: {
//             email: 'test@localhost.com',
//             firstName: 'Test',
//             lastName: 'User'
//           },
//           customData: {
//             value: 5.00,
//             currency: 'USD',
//             content_name: 'Browser Test'
//           }
//         })
//       });
      
//       const trackingResult = await trackingResponse.json();
//       console.log('📊 Tracking Test:', trackingResult);
      
//       return { connection: connectionResult, tracking: trackingResult };
      
//     } catch (error) {
//       console.error('❌ Test failed:', error);
//       return { error };
//     }
//   }
  
//   // Test with real user interaction
//   static async testButtonClick() {
//     console.log('🖱️ Testing button click tracking...');
    
//     const result = await fetch('/api/track', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         eventName: 'StartPlaying',
//         userData: {
//           // Add real user data if available
//         },
//         customData: {
//           content_name: 'Start Playing Button',
//           content_type: 'cta_click',
//           value: 1
//         }
//       })
//     });
    
//     const data = await result.json();
//     console.log('🎯 Button tracking result:', data);
//     return data;
//   }
// }

// // Make it available globally for console testing
// if (typeof window !== 'undefined') {
//   (window as any).CAPITester = CAPITester;
// }