import { URL_PARAMS_STATE_ENUM, type UrlParamEnumKeys } from "@/App.config";

export const currentHrefToURL = () => new URL(window.location.href);

export const getParamsAsPartial = <T>(url: URL) => {
  const params = {
    ...Object.fromEntries(url.searchParams.entries()),
  } as unknown as Partial<T>;
  return params;
};

export const getMappedParamsAsState = (url: URL) => {
  return Array.from(url.searchParams.entries()).reduce<object>(
    (acc, [key, value]) => {
      return {
        [URL_PARAMS_STATE_ENUM[key as UrlParamEnumKeys]]: value,
        ...acc,
      };
    },
    {},
  );
};

export const getCurrentParamsAsPartial = () =>
  getMappedParamsAsState(currentHrefToURL());
