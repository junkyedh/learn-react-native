const hostUrl = 'http://blackntt.net:88/api/v1';

export type MainApiRequestParams<R, S> = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: R;
    onSuccess?: (data: S) => void;
    onError?: (error: Error) => void;
};

export const MainApiRequest = <R, S>({
    url,
    method = 'GET',
    headers = {},
    body,
    onSuccess,
    onError,
}: MainApiRequestParams<R, S>) => {
    const apiUrl = hostUrl + url;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
    };

    fetch(apiUrl, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
        })
        .then((data) => {
            onSuccess && onSuccess(data);
        })
        .catch((error) => {
            onError && onError(error);
        });
}


export const MainApiRequestPromise = <R, S>({
    url,
    method = 'GET',
    headers = {},
    body,
}: MainApiRequestParams<R, S>): Promise<S> => {
    const apiUrl = hostUrl + url;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    return fetch(apiUrl, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
        });
}

export const MainApiRequestPromiseCheckStatus = <R>({
    url,
    method = 'GET',
    headers = {},
    body,
}: MainApiRequestParams<R, any>): Promise<boolean> => {
    const apiUrl = hostUrl + url;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    return fetch(apiUrl, options)
        .then((response) => {
            console.log('response', response.ok);
            return response.ok;
        });
}