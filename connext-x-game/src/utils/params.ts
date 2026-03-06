export const currentHrefToURL = () => new URL(window.location.href);

export const getParamsAsPartial = <T>(url: URL) => {
  const params = {
    ...Object.fromEntries(url.searchParams.entries()),
  } as unknown as Partial<T>;
  return params;
};

export const getCurrentParamsAsPartial = <T>() =>
  getParamsAsPartial<T>(currentHrefToURL());
