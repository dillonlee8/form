import { SET_TRAYFORM_VALUES } from "./actionTypes";
import { TrayFormValues } from './types'


export function setTrayFormValues(values: TrayFormValues) {
  return {
    type: SET_TRAYFORM_VALUES,
    payload: {
      values
    }
  }
}