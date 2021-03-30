const action_type_prefix = `counter`;

export const INCREASE_COUNT = `${action_type_prefix} - increase count`;

export function increaseCount(){
  return {
    type: INCREASE_COUNT
  }
}