import { err, ok, Result } from 'neverthrow';

export function resultFromTruthy<T, E = string>(value: T | undefined, msg: E): Result<T, E> {
    if (value) {
        return ok(value);
    }
    return err(msg);
}

export function resultFromTruthyResult<T, E = string>(value: Result<T, E> | undefined, msg: E): Result<T, E> {
    return resultFromTruthy(value, msg).andThen((r) => r);
}
