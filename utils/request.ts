import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '@/config/config'

axios.defaults.withCredentials = true
axios.defaults.timeout = 5000

interface RequestParams {
  api_url?: string;
  params?: Record<string, any>;
  method?: 'post' | 'get';
  path?: string;
}

interface ApiResponse {
  code?: number;
  [key: string]: any;
}

async function request(content: RequestParams): Promise<ApiResponse> {
  try {
    const { params = {}, method = 'post', path = '' } = content || {}
    params.browser_language = navigator.language;
    params.browser_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    let requestInfo: AxiosRequestConfig = {
      method,
      url: config.API_URL + path,
      headers: {},
      timeout: 5000
    };    
    
    if (method.toLowerCase() === 'post') {
      const formData = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      requestInfo.data = formData;
    } else {
      requestInfo.params = params;
    }

    const res: AxiosResponse<ApiResponse> = await axios(requestInfo)
    const { data = {} } = res || {}
    const { code = 200 } = data || {}

    if (code !== 200) {
      throw data || {}
    }
    return data || {}
  } catch (err) {
    console.error('request Err:', err)
    throw err
  }
}

export default request