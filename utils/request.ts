import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '@/config/config'
import qs from 'qs';

axios.defaults.withCredentials = true

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
      headers: {}
    };    
    
    if (method.toLowerCase() === 'post') {
      requestInfo.data = qs.stringify(params);
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