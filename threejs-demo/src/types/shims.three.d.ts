/*
 * Description:
 * Created: 2022-05-24 09:47:51
 * Author: van
 * Email : shiww@mogulinker.com
 * -----
 * Last Modified: 2022-07-14 14:41:13
 * Modified By: van
 * -----
 * Copyright (c) 2022 www.mogulinker.com
 */

import '@types/three'

declare module 'three' {
  /**
   * 支持
   * model.u('filed',111)
   * model.u('filed.subFiled',222)
   */
  export interface Mesh {
    u: (key: string, value?: any) => any
    colorIsDefault?: boolean
    value?: any
    updateInfo?: any
  }

  export interface Camera {
    aspect: number
    updateProjectionMatrix: () => void
  }

  export interface AxesHelper {
    material: {
      depthTest: boolean
    }
  }

  export interface GridHelper {
    material: {
      depthTest: boolean
    }
  }
}
