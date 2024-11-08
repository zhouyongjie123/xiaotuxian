import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

type HotParams = PageParams & { subType?: string }
export const getHotRecommendAPI = (url: string, date?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
  })
}
