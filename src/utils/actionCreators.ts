import { AnyAction, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const INIT = 'INIT';
export const LOADING = 'LOADING';
export const SERVER_PENDING = 'SERVER_PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export type asyncStatusTypes = 'INIT' | 'LOADING' | 'SERVER_PENDING' | 'SUCCESS' | 'ERROR';

interface IReducerLikeState {
  asyncStatus: asyncStatusTypes;
}

export interface IPayload<U, V> {
  readonly req: U;
  readonly res: V;
}

export interface IAction<T extends string, U, V> extends AnyAction {
  readonly type: T;
  readonly payload: IPayload<U, V>;
}

// action creator
export function createAction<T extends string, U, V>(type: T, req: U, res: V): IAction<T, U, V> {
  return {
    type,
    payload: {
      req,
      res
    }
  };
}

export type Api<U, V> = (args: U) => Promise<V>;

export type ThunkResult<R, S, A extends Action> = ThunkAction<R, S, undefined, A>;
// A, B, C -> Action Types
// U -> request
// V -> success response
export function createAsyncAction<A extends string, B extends string, C extends string, S, U, V>(
  actions: [A, B, C],
  api: Api<U, V>
) {
  return (
    apiArgs: U
  ): ThunkResult<
    Promise<IAction<B, U, V>>,
    S,
    IAction<A, U, {}> | IAction<B, U, V> | IAction<C, U, any>
  > => async (dispatch) => {
    const [requestType, successType, errorType] = actions;
    dispatch(createAction<A, U, {}>(requestType, apiArgs, {}));
    try {
      const response = await Promise.resolve(api(apiArgs));
      const action = createAction<B, U, V>(successType, apiArgs, response);
      dispatch(action);
      return action;
    } catch (err) {
      const action = createAction<C, U, any>(errorType, apiArgs, err);
      dispatch(action);
      return Promise.reject(action);
    }
  };
}

export type EnumerateValues<T> = T[keyof T];

export type GetActionTypes<T> = EnumerateValues<
  {
    [P in keyof T]: T[P] extends (args: any) => ThunkAction<any, any, undefined, infer Q>
      ? Q
      : T[P] extends (args: any) => any
      ? ReturnType<T[P]>
      : never;
  }
>;

export type GetActionCreatorRawType<K, T extends keyof K> = Pick<K, T>[T];

export type GetActionCreatorAsyncDispatchType<K> = K extends (
  args: infer U
) => ThunkAction<infer Q, any, any, any>
  ? (args: U) => Q
  : K extends () => ThunkAction<infer Q, any, any, any>
  ? () => Q
  : never;

export type GetActionCreatorSyncDispatchType<K> = K extends (args: infer S) => infer R
  ? (args: S) => R
  : K extends () => infer R
  ? () => R
  : never;

export type GetConnectDispatchPropsType<T> = {
  [P in keyof T]: T[P] extends (args: infer U) => ThunkAction<infer Q, any, any, any>
    ? (args: U) => Q
    : T[P] extends () => ThunkAction<infer Q, any, any, any>
    ? () => Q
    : T[P] extends () => infer R
    ? () => R
    : T[P] extends (args: infer S) => infer R
    ? (args: S) => R
    : never;
};

export type ReducerMappedState<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer R ? R : never;
};

export function isInit<T extends IReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === INIT) return true;
  return false;
}

export function isLoading<T extends IReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === LOADING) return true;
  return false;
}

export function isSuccess<T extends IReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === SUCCESS) return true;
  return false;
}

export function isError<T extends IReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === ERROR) return true;
  return false;
}

// for hooks
// type ActionCreator<U, A extends AnyAction, V> = (
//   apiArgs: U,
// ) => (dispatch: Dispatch<A>) => Promise<V>;

// export function mapThunk<U, V extends Action>(
//   action: (args: U) => ThunkResult<Promise<V>, {}, V>,
// ) {
//   const dispatch = useDispatch();
//   return (args: U) => action(args);
// }
// export function mapThunkDispatch<
//   T extends string,
//   U,
//   R,
//   A extends ThunkAction<
//     Promise<IAction<T, U, R>>,
//     {},
//     undefined,
//     IAction<T, U, R>
//   >
// >(action: (args: U) => Promise<IAction<T, U, R>>) {
//   const dispatch = useDispatch<
//     ThunkAction<Promise<IAction<T, U, R>>, {}, undefined, IAction<T, U, R>>
//   >();
//   return (args: U): Promise<R> => dispatch(action(args));
// }
